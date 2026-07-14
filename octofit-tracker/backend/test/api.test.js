const http = require('http');

function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8000,
      path: pathname,
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const routes = [
    '/api/users/',
    '/api/teams/',
    '/api/activities/',
    '/api/leaderboard/',
    '/api/workouts/'
  ];

  for (const route of routes) {
    const response = await request(route);
    if (response.statusCode !== 200) {
      throw new Error(`Route ${route} returned ${response.statusCode}`);
    }
  }

  console.log('All API routes responded with 200');
})();
