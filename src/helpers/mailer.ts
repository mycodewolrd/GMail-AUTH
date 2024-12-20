// Nodemailer is a module for Node.js applications that allows easy email sending.

import nodemailer from 'nodemailer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        //TODO: configure mail for uses


        
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for port 465, false for other ports
          auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
          },
        });

        const mailOptions = {
          from: "email@gmail.com",
          to: email,
          subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
          html: "<b>Hello world?</b>",
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailOptions

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error (error.massage)
    }
}