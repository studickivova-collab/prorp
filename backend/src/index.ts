import { app } from './app.js';
import { PORT } from './lib/config.js';

// Local/standalone entrypoint (npm run dev / npm start). Not used on
// Netlify — there, netlify/functions/api.ts imports `app` directly and
// wraps it with serverless-http instead of calling listen().
app.listen(PORT, () => {
  console.log(`SV Cope API listening on http://localhost:${PORT}`);
});
