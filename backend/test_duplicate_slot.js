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

async function createPlan(label) {
  const res = await request("POST", "/api/website-plan", {
    fullName: `${label} User`,
    businessName: `${label} Business`,
    email: `${label.toLowerCase()}@example.com`,
    phone: "1234567890",
    websiteSize: "Small Business Website",
    businessType: "E-commerce",
    features: "Shop",
    hosting: "Vercel",
    maintenance: "Yes",
    seoRequirement: "Yes",
    additionalRequirements: "None",
  });

  return res.data.data.id;
}

async function createBookingForPlan(planId, slotId, label) {
  return request("POST", "/api/bookings", {
    websitePlanId: planId,
    slotId,
    fullName: `${label} User`,
    companyName: `${label} Business`,
    email: `${label.toLowerCase()}@example.com`,
    phone: "1234567890",
    budget: "25000-50000",
    meetingMethod: "Google Meet",
    additionalNotes: `${label} booking`,
  });
}

async function run() {
  const slotsRes = await request("GET", "/api/slots");
  const slot = slotsRes.data.data[0];

  if (!slot) {
    throw new Error("No available slots found");
  }

  console.log(`Using slot #${slot.id} (${slot.date} ${slot.startTime})`);

  const planA = await createPlan("UserA");
  const planB = await createPlan("UserB");

  const bookingA = await createBookingForPlan(planA, slot.id, "UserA");
  console.log("Booking A:", bookingA.statusCode, bookingA.data.message);

  const bookingB = await createBookingForPlan(planB, slot.id, "UserB");
  console.log("Booking B:", bookingB.statusCode, bookingB.data.message);

  if (bookingA.statusCode === 201 && bookingB.statusCode === 400) {
    console.log("PASS: duplicate slot booking blocked");
  } else {
    console.log("FAIL: expected first success and second rejection");
  }
}

run().catch(console.error);
