#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

;(async function main() {
  const prisma = new PrismaClient()
  try {
    const legacyUsers = await prisma.user.findMany({ where: { hashedPassword: null, passwordHash: { not: null } } })
    console.log(`Found ${legacyUsers.length} legacy users (have passwordHash but no hashedPassword).`)
    if (legacyUsers.length === 0) return process.exit(0)

    const TTL_MIN = Number(process.env.TOKEN_TTL_MINUTES ?? 15)
    const transporter = process.env.SMTP_HOST
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: Number(process.env.SMTP_PORT ?? 587) === 465,
          auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
        })
      : null

    for (const user of legacyUsers) {
      const code = generateCode(6)
      const salt = crypto.randomBytes(16).toString('hex')
      const codeHash = crypto.createHash('sha256').update(`${salt}:${code}`).digest('hex')
      const expiresAt = new Date(Date.now() + TTL_MIN * 60 * 1000)

      const token = await prisma.verificationToken.create({
        data: {
          userId: user.id,
          type: 'reset_password',
          sentTo: user.email,
          codeHash,
          salt,
          expiresAt,
        },
      })

      console.log(`Created reset token for ${user.email} (token id: ${token.id})`) 

      if (transporter) {
        const appOrigin = process.env.APP_ORIGIN || 'http://localhost:3000'
        const actionUrl = `${appOrigin}/reset?email=${encodeURIComponent(user.email)}&type=reset_password`
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `no-reply@${process.env.SMTP_HOST || 'localhost'}`,
            to: user.email,
            subject: 'Password reset required',
            html: `<p>For security we require that you reset your password. Use this code:</p><div style="font-size:20px;font-weight:700">${code}</div><p>Or click the link to continue: <a href="${actionUrl}">${actionUrl}</a></p>`,
          })
          console.log(`Emailed reset code to ${user.email}`)
        } catch (err) {
          console.error(`Failed to send email to ${user.email}:`, err.message || err)
        }
      } else {
        console.log(`[DEV] Reset code for ${user.email}: ${code}`)
      }
    }
    console.log('Done.')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
})()

function generateCode(length = 6, charset = '0123456789') {
  const bytes = crypto.randomBytes(length)
  let out = ''
  for (let i = 0; i < length; i++) out += charset[bytes[i] % charset.length]
  return out
}
