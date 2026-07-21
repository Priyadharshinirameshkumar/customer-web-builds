const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const http = require('http');

const request = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: body ? JSON.parse(body) : null
        });
      });
    });

    req.on('error', (e) => reject(e));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

async function run() {
  try {
    console.log('Finding an available slot in DB...');
    const availableSlot = await prisma.slot.findFirst({
      where: { isBooked: false }
    });

    if (!availableSlot) {
      console.log('No available slots found!');
      return;
    }

    const slotDateStr = availableSlot.date.toISOString().split('T')[0];
    const slotTime = availableSlot.startTime;
    console.log(`Found available slot: ID ${availableSlot.id}, Date: ${slotDateStr}, Time: ${slotTime}`);

    console.log('\n--- 1. Creating Website Plan A ---');
    const planARes = await request('POST', '/api/website-plan', {
      fullName: 'User A',
      businessName: 'Business A',
      email: 'usera@example.com',
      phone: '1234567890',
      websiteSize: 'Small Business Website',
      businessType: 'E-commerce',
      features: 'Shop',
      hosting: 'Vercel',
      maintenance: 'Yes',
      seoRequirement: 'Yes',
      additionalRequirements: 'None'
    });
    const planAId = planARes.data.data.id;

    console.log('\n--- 2. Booking Slot for User A (Should Succeed) ---');
    const bookingARes = await request('POST', '/api/bookings', {
      websitePlanId: planAId,
      fullName: 'User A',
      companyName: 'Business A',
      email: 'usera@example.com',
      phone: '1234567890',
      budget: '₹25,000 - ₹50,000',
      preferredDate: slotDateStr,
      preferredTime: slotTime,
      meetingMethod: 'Google Meet',
      additionalNotes: 'Booking A'
    });
    console.log('Booking A response status:', bookingARes.statusCode);
    console.log('Booking A response data:', bookingARes.data);

    // Verify slot is now booked in DB
    const checkedSlot = await prisma.slot.findUnique({
      where: { id: availableSlot.id }
    });
    console.log(`\nVerified slot status in DB: isBooked = ${checkedSlot.isBooked}`);

    console.log('\n--- 3. Creating Website Plan B ---');
    const planBRes = await request('POST', '/api/website-plan', {
      fullName: 'User B',
      businessName: 'Business B',
      email: 'userb@example.com',
      phone: '0987654321',
      websiteSize: 'Small Business Website',
      businessType: 'E-commerce',
      features: 'Shop',
      hosting: 'Vercel',
      maintenance: 'Yes',
      seoRequirement: 'Yes',
      additionalRequirements: 'None'
    });
    const planBId = planBRes.data.data.id;

    console.log('\n--- 4. Booking Same Slot for User B (Should Fail) ---');
    const bookingBRes = await request('POST', '/api/bookings', {
      websitePlanId: planBId,
      fullName: 'User B',
      companyName: 'Business B',
      email: 'userb@example.com',
      phone: '0987654321',
      budget: '₹25,000 - ₹50,000',
      preferredDate: slotDateStr,
      preferredTime: slotTime,
      meetingMethod: 'Google Meet',
      additionalNotes: 'Booking B'
    });
    console.log('Booking B response status:', bookingBRes.statusCode);
    console.log('Booking B response data:', bookingBRes.data);

  } catch (error) {
    console.error('Test run failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
