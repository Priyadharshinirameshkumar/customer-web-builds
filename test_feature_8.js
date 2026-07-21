import http from 'http';

const request = (method, path, data, token) => {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: headers
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
    console.log('--- 1. Testing Unprotected Access to Admin Endpoint ---');
    const unauthRes = await request('GET', '/api/admin/dashboard/summary');
    console.log('Unauthenticated Status Code:', unauthRes.statusCode, '(Expected: 401)');
    if (unauthRes.statusCode !== 401) {
      throw new Error(`Expected status 401 for unauthenticated request, got ${unauthRes.statusCode}`);
    }

    console.log('\n--- 2. Testing Admin Login with Invalid Password ---');
    const invalidLoginRes = await request('POST', '/api/auth/login', {
      email: 'admin@customerwebbuilds.com',
      password: 'WrongPassword123'
    });
    console.log('Invalid Login Status Code:', invalidLoginRes.statusCode, '(Expected: 401)');
    if (invalidLoginRes.statusCode !== 401) {
      throw new Error(`Expected status 401 for invalid credentials, got ${invalidLoginRes.statusCode}`);
    }

    console.log('\n--- 3. Testing Admin Login with Valid Credentials ---');
    const validLoginRes = await request('POST', '/api/auth/login', {
      email: 'admin@customerwebbuilds.com',
      password: 'AdminPass123!'
    });
    console.log('Valid Login Status Code:', validLoginRes.statusCode, '(Expected: 200)');
    if (validLoginRes.statusCode !== 200 || !validLoginRes.data?.data?.token) {
      throw new Error('Valid login failed or returned no token');
    }
    const token = validLoginRes.data.data.token;
    console.log('Received JWT Token:', token.substring(0, 25) + '...');

    console.log('\n--- 4. Testing Protected /api/auth/me Endpoint ---');
    const meRes = await request('GET', '/api/auth/me', null, token);
    console.log('/api/auth/me Status Code:', meRes.statusCode, '(Expected: 200)');
    console.log('Admin Email:', meRes.data?.data?.email);
    if (meRes.statusCode !== 200 || meRes.data?.data?.email !== 'admin@customerwebbuilds.com') {
      throw new Error('/api/auth/me verification failed');
    }

    console.log('\n--- 5. Testing Protected /api/admin/dashboard/summary Endpoint ---');
    const protectedRes = await request('GET', '/api/admin/dashboard/summary', null, token);
    console.log('Protected Route Status Code:', protectedRes.statusCode, '(Expected: 200)');
    if (protectedRes.statusCode !== 200) {
      throw new Error('Failed to access protected admin endpoint with valid token');
    }

    console.log('\n✅ Feature 8 Authentication & Admin Login Verification PASSED!');
  } catch (error) {
    console.error('Test run failed:', error);
    process.exit(1);
  }
}

run();
