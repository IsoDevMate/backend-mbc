import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactNotification = async (data: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  await resend.emails.send({
    from: 'MabCas Labs <info@mabcaslabs.com>',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `New Contact Form Submission from ${data.fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
};
