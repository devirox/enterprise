import nodemailer from "nodemailer";

// Use SMTP transport whenever SMTP_HOST is provided (dev or prod).
// This allows using Gmail (or any SMTP) when credentials are set in `.env`.
const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
  : null;

export async function sendOtpEmail(opts: {
  to: string;
  subject: string;
  code: string;
  actionUrl: string;
  expiresMinutes: number;
}) {
  const { to, subject, code, actionUrl, expiresMinutes } = opts;
  const html = `
    <div style="font-family:ui-sans-serif">
      <h2>${subject}</h2>
      <p>Your code:</p>
      <div style="font-size:28px;font-weight:700;letter-spacing:3px">${code}</div>
      <p>Expires in ${expiresMinutes} minutes.</p>
      <p>Or click:</p>
      <p><a href="${actionUrl}">${actionUrl}</a></p>
      <p>If you didn’t request this, ignore this email.</p>
    </div>
  `;

  // If SMTP isn't configured, warn and skip sending to avoid throwing.
  if (!transport) {
    console.warn("SMTP not configured. Skipping sendMail for:", to);
    return Promise.resolve();
  }

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    throw err;
  }
}
