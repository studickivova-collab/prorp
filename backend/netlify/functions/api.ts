import serverless from 'serverless-http';
import { app } from '../../src/app.js';

// Wraps the existing Express app for Netlify Functions (classic AWS-Lambda
// style handler). Paired with the /api/* redirect in netlify.toml, which
// forwards to /.netlify/functions/api/api/:splat so the path Express sees
// (e.g. /api/waterbodies) matches the routes exactly as defined in app.ts —
// no route changes needed between local dev and the deployed function.
export const handler = serverless(app);
