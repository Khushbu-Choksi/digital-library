const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Create server and router
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable default middlewares (CORS, static, etc.)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Helper function to read database
function readDatabase() {
  const dbPath = path.join(__dirname, 'db.json');
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Helper function to authenticate token
function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;
  
  const db = readDatabase();
  return db.users.find(u => u.token === token);
}

// Custom authentication routes
server.post('/api/login-librarian', (req, res) => {
  const db = readDatabase();
  const librarian = db.users.find(user => user.role === 'librarian');
  res.json(librarian || { error: 'Librarian not found' });
});

server.post('/api/login-user', (req, res) => {
  const db = readDatabase();
  const user = db.users.find(user => user.role === 'user');
  res.json(user || { error: 'User not found' });
});

server.get('/api/me', (req, res) => {
  const user = authenticateToken(req);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Middleware to check authorization for book creation
server.use((req, res, next) => {
  // Only check authorization for POST requests to books endpoint
  if (req.method === 'POST' && req.url.includes('/books')) {
    const user = authenticateToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (user.role !== 'librarian') {
      return res.status(403).json({ error: 'Forbidden: Only librarians can add books' });
    }
  }
  next();
});

// Mount the router with /api prefix
server.use('/api', router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on http://localhost:${PORT}`);
  console.log('📚 Digital Library Mock Backend');
  console.log('');
  console.log('Available endpoints:');
  console.log('  POST /api/login-librarian - Login as librarian');
  console.log('  POST /api/login-user - Login as regular user');
  console.log('  GET  /api/me - Get current user info (requires Authorization header)');
  console.log('  GET  /api/users - Get all users');
  console.log('  GET  /api/books - Get all books');
  console.log('  POST /api/books - Add a book (librarian only)');
  console.log('  PUT  /api/books/:id - Update a book');
  console.log('  DELETE /api/books/:id - Delete a book');
  console.log('');
  console.log('Authorization:');
  console.log('  Use "Authorization: Bearer mock-jwt-token-librarian" for librarian');
  console.log('  Use "Authorization: Bearer mock-jwt-token-user" for regular user');
  console.log('');
  console.log('🧪 Test with: ./test-mock-backend.sh');
});
