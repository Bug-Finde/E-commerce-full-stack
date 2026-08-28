const { sendEmail } = require("./mailer");

const verifyEmail = async (email, token) => {
  try {
    const verificationLink =
      `${process.env.FRONTEND_URL}/verify-email/${token}`;

    console.log("Verification Link:", verificationLink);
    console.log("Sending verification email to:", email);

    await sendEmail({
      to: email,
      subject: "Verify Your Email - Meri Jewelry",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome to Meri Jewelry</h2>

          <p>Please click the button below to verify your email:</p>

          <a
            href="${verificationLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#000;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify Email
          </a>

          <p style="margin-top:20px;">
            Or copy and paste this URL:
          </p>

          <p>${verificationLink}</p>
        </div>
      `,
    });

    console.log("✅ Verification email sent.");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};

module.exports = {
  verifyEmail,
};