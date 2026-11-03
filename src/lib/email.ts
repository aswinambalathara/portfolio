import nodemailer from 'nodemailer'

import type { ContactInput } from './contact-schema'

export const isEmailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.CONTACT_TO_EMAIL)

// FR-62: notify the owner of a new contact message. Callers must catch failures.
export async function sendContactNotification(message: ContactInput) {
  if (!isEmailConfigured()) throw new Error('SMTP is not configured')

  const port = Number(process.env.SMTP_PORT || 587)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: message.email,
    subject: `Portfolio contact (${message.reason}): ${message.name}`,
    text: `From: ${message.name} <${message.email}>\nReason: ${message.reason}\n\n${message.message}`,
  })
}
