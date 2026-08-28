const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.authentications.apiKey.apiKey =
  process.env.BREVO_API_KEY;

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending email through Brevo API...");
    console.log("EMAIL TO:", to);

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: process.env.EMAIL_FROM_NAME || "Meri Jewelry",
      email: process.env.EMAIL_FROM,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully");
    console.log("Brevo response:", result);

    return result;
  } catch (error) {
    console.error("❌ BREVO EMAIL ERROR");

    console.error(
      "Message:",
      error?.response?.body || error.message
    );

    throw error;
  }
};

module.exports = {
  sendEmail,
};