import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { ALLOWED_ORIGIN } from './lib/config.js';
import waterBodiesRouter from './routes/waterbodies.js';
import weatherRouter from './routes/weather.js';

/**
 * Express app, split out from index.ts so it can be reused both by the
 * local dev server (index.ts, via app.listen) and by the Netlify Function
 * wrapper (netlify/functions/api.ts, via serverless-http) — the function
 * wrapper needs the configured app without anything calling listen().
 */
export const app = express();

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(compression());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/waterbodies', waterBodiesRouter);
app.use('/api/weather', weatherRouter);
