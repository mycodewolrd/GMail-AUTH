// Nodemailer is a module for Node.js applications that allows easy email sending.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {

  // Step to verify User and send verified User's token data in DB
  try {
    // To generate hashed Token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      //To save in db
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken },
        { verifyTokenExpiry: Date.now() + 3600000 }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgotPasswordToken: hashedToken },
        { forgotPasswordTokenExpiry: Date.now() + 3600000 }
      );
    }

    // To send mail to User with mailtrap:
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7271b17abba3a1", //❌❌
        pass: "45d02c3cceb025", //❌❌
      },
    });

    // To define email configuration & content
    const mailOptions = {
      from: "email@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.massage);
  }
};
