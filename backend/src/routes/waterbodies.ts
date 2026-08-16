import { Router } from 'express';
import { getLatviaWaterBodySummaries, getWaterBodyById } from '../services/overpass.js';

const router = Router();

// Lightweight list for the initial map render (no geometry).
router.get('/', async (_req, res) => {
  try {
    const items = await getLatviaWaterBodySummaries();
    res.json({ count: items.length, items });
  } catch (err) {
    console.error('[waterbodies] Overpass request failed:', err);
    res.status(502).json({
      error: 'overpass_unavailable',
      message: 'Не удалось получить данные о водоёмах. Попробуйте позже.',
    });
  }
});

// Full geometry for one water body, fetched on demand (e.g. on marker click).
router.get('/:osmType/:osmId', async (req, res) => {
  try {
    const { osmType, osmId } = req.params;
    if (osmType !== 'way' && osmType !== 'relation') {
      res.status(400).json({ error: 'bad_request', message: 'Неверный тип объекта OSM' });
      return;
    }
    const body = await getWaterBodyById(osmType, osmId);
    if (!body) {
      res.status(404).json({ error: 'not_found', message: 'Водоём не найден' });
      return;
    }
    res.json(body);
  } catch (err) {
    console.error('[waterbodies] Overpass request failed:', err);
    res.status(502).json({
      error: 'overpass_unavailable',
      message: 'Не удалось получить данные о водоёмах. Попробуйте позже.',
    });
  }
});

export default router;
