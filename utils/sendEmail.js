import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.APP_PASSWORD,
    },  
      logger: true,
      debug: true,
  });

  await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to,
    subject,
    text,
  });
};
