
const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
  timeoutInSeconds: 30,
  maxRetries: 2,
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("=================================");
    console.log("📧 BREVO API EMAIL");
    console.log("To:", to);
    console.log("From:", process.env.EMAIL_FROM);
    console.log("=================================");

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error("EMAIL_FROM is not configured");
    }

    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: process.env.EMAIL_FROM_NAME || "Meri Jewelry",
          email: process.env.EMAIL_FROM,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,
        htmlContent: html,
      });

    console.log("✅ Brevo email sent");
    console.log("Message ID:", result?.messageId);

    return result;
  } catch (error) {
    console.error("❌ BREVO API ERROR");

    console.error("Message:", error?.message);

    if (error?.statusCode) {
      console.error("Status Code:", error.statusCode);
    }

    if (error?.body) {
      console.error("Response Body:", error.body);
    }

    throw error;
  }
};

module.exports = {
  sendEmail,
};
