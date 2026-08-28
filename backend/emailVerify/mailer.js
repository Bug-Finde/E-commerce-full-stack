const dns = require("node:dns");
const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  family: 4,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending email...");
    console.log("SMTP HOST:", process.env.SMTP_HOST);
    console.log("SMTP PORT:", process.env.SMTP_PORT);
    console.log("SMTP USER:", process.env.SMTP_USER);
    console.log("EMAIL TO:", to);

    const info = await smtpTransporter.sendMail({
      from: `"Meri Jewelry" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);

    throw error;
  }
};

module.exports = {
  sendEmail,
};