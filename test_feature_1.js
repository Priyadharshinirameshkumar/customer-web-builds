import http from 'http';

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
    console.log('--- 1. Creating Website Plan ---');
    const planRes = await request('POST', '/api/website-plan', {
      fullName: 'Verification User',
      businessName: 'Verification Business',
      email: 'verify@example.com',
      phone: '1234567890',
      websiteSize: 'Small Business Website',
      businessType: 'E-commerce',
      features: 'Shop, Checkout',
      hosting: 'Vercel',
      maintenance: 'Yes',
      seoRequirement: 'Yes',
      additionalRequirements: 'None'
    });
    console.log('Plan response status:', planRes.statusCode);
    console.log('Plan data:', planRes.data);

    if (!planRes.data || !planRes.data.success) {
      throw new Error('Failed to create website plan');
    }

    const websitePlanId = planRes.data.data.id;
    console.log('Created Website Plan ID:', websitePlanId);

    console.log('\n--- 2. Creating Booking ---');
    // Use a weekday date (seeder skips weekends)
    const bookingRes = await request('POST', '/api/bookings', {
      websitePlanId: websitePlanId,
      fullName: 'Verification User',
      companyName: 'Verification Business',
      email: 'verify@example.com',
      phone: '1234567890',
      budget: '₹25,000 - ₹50,000',
      preferredDate: '2026-07-22',
      preferredTime: '10:00',
      meetingMethod: 'Google Meet',
      additionalNotes: 'Verification booking notes'
    });
    console.log('Booking response status:', bookingRes.statusCode);
    console.log('Booking data:', bookingRes.data);

    if (!bookingRes.data || !bookingRes.data.success) {
      throw new Error('Failed to create booking');
    }

    const bookingId = bookingRes.data.data.id;
    console.log('Created Booking ID:', bookingId);
    console.log('Booking status:', bookingRes.data.data.status);

    console.log('\n--- 3. GET Booking Status ---');
    const getStatusRes = await request('GET', `/api/bookings/${bookingId}/status`);
    console.log('GET Status response status:', getStatusRes.statusCode);
    console.log('GET Status data:', getStatusRes.data);

    console.log('\n--- 4. PATCH Booking Status (CONFIRMED) ---');
    const patchStatusRes = await request('PATCH', `/api/bookings/${bookingId}/status`, {
      status: 'CONFIRMED'
    });
    console.log('PATCH Status response status:', patchStatusRes.statusCode);
    console.log('PATCH Status data:', patchStatusRes.data);

    console.log('\n--- 5. GET Booking Status again ---');
    const getStatusRes2 = await request('GET', `/api/bookings/${bookingId}/status`);
    console.log('GET Status (again) response status:', getStatusRes2.statusCode);
    console.log('GET Status (again) data:', getStatusRes2.data);

    console.log('\n--- 6. PATCH Booking Status (INVALID_STATUS) ---');
    const patchStatusRes2 = await request('PATCH', `/api/bookings/${bookingId}/status`, {
      status: 'INVALID_STATUS'
    });
    console.log('PATCH Invalid Status response status:', patchStatusRes2.statusCode);
    console.log('PATCH Invalid Status data:', patchStatusRes2.data);

    console.log('\n✅ Feature 1 verification finished');
  } catch (error) {
    console.error('Test run failed:', error);
  }
}

run();
