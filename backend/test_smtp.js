require("dotenv/config");

const nodemailer = require("nodemailer");

const vars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const status = Object.fromEntries(
  vars.map((key) => [key, process.env[key] ? "set" : "MISSING"])
);

console.log("SMTP env check:", status);

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error("FAIL: One or more SMTP variables are missing.");
    process.exit(1);
  }

  const port = Number(SMTP_PORT || 587);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("OK: SMTP connection verified.");

    const to = process.argv[2] || SMTP_USER;
    console.log(`Sending test email to: ${to}`);

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: "Customer Web Builds - SMTP Test",
      html: "<p>If you received this, SMTP is working.</p>",
    });

    console.log("OK: Test email sent.");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (error) {
    console.error("FAIL:", error);
    process.exit(1);
  }
}

main();
