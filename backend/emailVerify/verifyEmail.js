const { sendEmail } = require("./mailer");

 const verifyEmail = async (email, token) => {
  try {
 const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    await sendEmail({
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