import nodemailer from 'nodemailer';
import { logger } from './logger.ts';

const smtpUser = process.env.SMTP_USER as string;
const smtpPassword = process.env.SMTP_PASSWORD as string;
const smtpHost = process.env.SMTP_HOST as string;

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    auth: {
        user: smtpUser,
        pass: smtpPassword,
    },
    secure: false,
    requireTLS: true,
});

type MailOptions = {
    to: string;
    subject: string;
    content?: string;
};

export const sendMail = async (options: MailOptions): Promise<void> => {
    try {
        const mailOptions = {
            from: smtpUser,
            to: options.to,
            subject: options.subject,
            html: options.content,
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent: ' + info.response);
    } catch (error) {
        logger.error('Error sending email:', error);
    }
};
