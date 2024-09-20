import 'dotenv/config';
import express from 'express';
import next from 'next';
import cors from 'cors';
import supabase from './supabaseClient.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';
import { logger, logRequest } from './logger.js';
import { fileURLToPath } from 'url';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import principlesRoutes from './routes/principlesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import farmEnterpriseRoutes from './routes/farmEnterpriseRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Make supabase client available to all routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', authenticateUser, chatRoutes);
app.use('/api/principles', authenticateUser, principlesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/farm-enterprises', farmEnterpriseRoutes);
app.use('/api/profiles', profileRoutes);

// Add a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Add a new route for searching farms
import { searchPermacultureFarms } from './braveSearchApi.js';

app.get('/search-farms', async (req, res) => {
  const { query, store } = req.query;
  
  try {
    const farms = await searchPermacultureFarms(query);
    const farmData = farms.map(result => ({
      name: result.title,
      description: result.description,
      website: result.url,
      location: result.extra_snippets?.find(snippet => snippet.key === 'Location')?.value || 'Unknown',
      facebook: result.extra_snippets?.find(snippet => snippet.key === 'Facebook')?.value || null,
      instagram: result.extra_snippets?.find(snippet => snippet.key === 'Instagram')?.value || null,
      x: result.extra_snippets?.find(snippet => snippet.key === 'Twitter')?.value || null,
      contactEmails: result.extra_snippets?.find(snippet => snippet.key === 'Email')?.value?.split(',') || []
    }));

    if (store === 'true') {
      await insertFarmData(farmData);
    }

    res.json(farmData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function insertFarmData(farmData) {
  try {
    const { data, error } = await supabase
      .from('farms')
      .upsert(farmData, { onConflict: 'name' });

    if (error) throw error;
    console.log('Farm data inserted successfully:', data);
  } catch (error) {
    console.error('Error inserting farm data:', error);
    throw error;
  }
}

// Handle all other routes with Next.js
app.all('*', (req, res) => {
  return handle(req, res);
});

// Error handling middleware
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add CORS options handling
app.options('*', cors());

export default app;


