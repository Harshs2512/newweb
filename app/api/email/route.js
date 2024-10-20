import { EmailTemplate } from '@/components/admin/email-template'
import { Resend } from 'resend';
import nodemailer from 'nodemailer';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    console.log(process.env.SMTP_MAIL, process.env.SMTP_PASS)

    const { to, subject, text } = await request.json()
    console.log(to, subject, text)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        }
    });

    // Define email options
    const mailOptions = {
        from: `"Redvision Technology" ${process.env.SMTP_MAIL}`,
        to,
        subject,
        text,
        // html: "<b>Hello world?</b>" // Uncomment if you want to send HTML email
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return Response.json({ error: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return Response.json({ error: 'Error sending email' }, { status: 500 });
    }
    // try {
    //     const { data, error } = await resend.emails.send({
    //         from: 'Acme <onboarding@resend.dev>',
    //         to: [email],
    //         subject: 'Hello world',
    //         react: EmailTemplate({ firstName: fullName }),
    //     });

    //     if (error) {
    //         return Response.json({ error }, { status: 500 });
    //     }

    //     return Response.json(data);
    // } catch (error) {
    //     return Response.json({ error }, { status: 500 });
    // }
}
