import nodemailer from 'nodemailer';

// Function to send email
export const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
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

        // Send email using the transporter object
        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
