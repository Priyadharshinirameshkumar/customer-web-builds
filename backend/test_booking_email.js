require("dotenv/config");
const http = require("http");

const request = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : "";
    const options = {
      hostname: "localhost",
      port: 5000,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          data: body ? JSON.parse(body) : null,
        });
      });
    });

    req.on("error", reject);
    if (postData) req.write(postData);
    req.end();
  });
};

async function run() {
  const slotsRes = await request("GET", "/api/slots");
  const slot = slotsRes.data?.data?.[0];

  if (!slot) {
    throw new Error("No available slots");
  }

  const planRes = await request("POST", "/api/website-plan", {
    fullName: "Email Test User",
    businessName: "Email Test Co",
    email: process.env.SMTP_USER,
    phone: "1234567890",
    websiteSize: "Small Business Website",
    businessType: "E-commerce",
    features: "Shop",
    hosting: "Vercel",
    maintenance: "Yes",
    seoRequirement: "Yes",
    additionalRequirements: "SMTP test",
  });

  const planId = planRes.data.data.id;

  const bookingRes = await request("POST", "/api/bookings", {
    websitePlanId: planId,
    slotId: slot.id,
    fullName: "Email Test User",
    companyName: "Email Test Co",
    email: process.env.SMTP_USER,
    phone: "1234567890",
    budget: "25000-50000",
    meetingMethod: "Google Meet",
    additionalNotes: "SMTP booking test",
  });

  console.log("Booking status:", bookingRes.statusCode);
  console.log("Booking response:", bookingRes.data);
  console.log("Email should be sent to:", process.env.SMTP_USER);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
