const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: (process.env.SMTP_SECURE || "false") === "true",
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

 const verifyEmail = async (email, token) => {
  try {
 const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>

        <p>Please click the link below to verify your email:</p>

        <a href="${verificationLink}">
          Verify Email
        </a>

        <br /><br />

        <p>Or copy and paste this URL into your browser:</p>

        <p>${verificationLink}</p>
      `,
    });

    console.log("✅ Verification email sent.");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};


module.exports={verifyEmail}