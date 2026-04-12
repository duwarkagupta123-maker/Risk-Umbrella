/**
 * Risk Umbrella API – Express entry point.
 * Deploy to Render, Cyclic, Railway, etc. Set MONGODB_URI and JWT_SECRET in the host dashboard.
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const policiesRoutes = require('./routes/policies');
const riskRoutes = require('./routes/risk');
const simulateRoutes = require('./routes/simulate');
const { authenticateToken } = require('./middleware/auth');
const { getMe } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// Behind reverse proxies (Render, etc.)
app.set('trust proxy', 1);

app.use(express.json({ limit: '1mb' }));

/**
 * CORS: allow Netlify frontend, localhost:5173 (Vite), and comma-separated FRONTEND_URL values.
 */
const defaultOrigins = [
  'http://localhost:5173',
  'https://risk-umbrella.netlify.app',
];

function parseOrigins() {
  const raw = process.env.FRONTEND_URL || '';
  const fromEnv = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set([...defaultOrigins, ...fromEnv])];
}

const allowedOrigins = parseOrigins();

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser clients (curl, Postman) often omit Origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'risk-umbrella-api' });
});

app.use('/api/auth', authRoutes);
app.get('/api/user/me', authenticateToken, getMe);
app.use('/api/policies', policiesRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/simulate', simulateRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  try {
    await connectDB();
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Risk Umbrella API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
