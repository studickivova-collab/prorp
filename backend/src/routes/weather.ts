import { Router } from 'express';
import { getWeather } from '../services/openMeteo.js';
import { LATVIA_BBOX } from '../lib/config.js';

const router = Router();

router.get('/', async (req, res) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    res.status(400).json({ error: 'bad_request', message: 'Нужны числовые параметры lat и lon' });
    return;
  }

  // Generous padding around Latvia so nearby border points still work.
  const pad = 2;
  const inRange =
    lat >= LATVIA_BBOX.south - pad &&
    lat <= LATVIA_BBOX.north + pad &&
    lon >= LATVIA_BBOX.west - pad &&
    lon <= LATVIA_BBOX.east + pad;

  if (!inRange) {
    res.status(400).json({ error: 'out_of_range', message: 'Координаты вне ожидаемой области' });
    return;
  }

  try {
    const weather = await getWeather(lat, lon);
    res.json(weather);
  } catch (err) {
    console.error('[weather] Open-Meteo request failed:', err);
    res.status(502).json({
      error: 'weather_unavailable',
      message: 'Не удалось получить данные о погоде. Попробуйте позже.',
    });
  }
});

export default router;
