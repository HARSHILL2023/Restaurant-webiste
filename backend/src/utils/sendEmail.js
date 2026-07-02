import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'reservations@theeverhouse.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return data;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
