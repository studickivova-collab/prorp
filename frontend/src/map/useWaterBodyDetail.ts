import { useEffect, useState } from 'react';
import { fetchWaterBodyDetail } from '../lib/api';
import type { WaterBody } from '../types/waterBody';

interface State {
  detail: WaterBody | null;
  loading: boolean;
  error: string | null;
}

export function useWaterBodyDetail(id: string | null) {
  const [state, setState] = useState<State>({ detail: null, loading: false, error: null });

  useEffect(() => {
    if (!id) {
      setState({ detail: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ detail: null, loading: true, error: null });

    fetchWaterBodyDetail(id)
      .then((detail) => {
        if (!cancelled) setState({ detail, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ detail: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
