import nodemailer from 'nodemailer'

const RAW_SMTP_URL = process.env.SMTP_URL;
// If SMTP_URL is provided and looks like a DSN (starts with a scheme), pass it
// directly to nodemailer. If not, build an options object from individual env
// vars. Avoid passing a bare hostname string like "smtp.gmail.com" directly
// because nodemailer expects either a DSN or an options object.
const useDsn = typeof RAW_SMTP_URL === "string" && /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(RAW_SMTP_URL);
const transporter = nodemailer.createTransport(
  useDsn
    ? RAW_SMTP_URL!
    : {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      }
)

export async function sendVerificationEmail(email: string, token: string) {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const url = `${base}/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    to: email,
    subject: 'Verify your email',
    html: `<p>Please verify your email by clicking the link below:</p><p><a href="${url}">Verify email</a></p>`
  })

  return info
}

export async function sendAdminNotification(user: { id: string; email: string; name?: string | null }) {
  const adminList = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim()).filter(Boolean)
  if (adminList.length === 0) return
  const subject = `New user registration: ${user.email}`
  const html = `<p>A new user has registered:</p><p>Name: ${user.name || '-'}<br/>Email: ${user.email}</p>`
  for (const to of adminList) {
    try {
      await transporter.sendMail({ from: process.env.EMAIL_FROM || 'no-reply@example.com', to, subject, html })
    } catch (err) {
      console.error('Failed to send admin notification to', to, err)
    }
  }
}

export async function sendMail(opts: { to: string; subject: string; html?: string; text?: string }) {
  return transporter.sendMail({ from: process.env.EMAIL_FROM || 'no-reply@example.com', to: opts.to, subject: opts.subject, html: opts.html, text: opts.text })
}
