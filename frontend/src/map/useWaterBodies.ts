import { useCallback, useEffect, useState } from 'react';
import { fetchWaterBodySummaries } from '../lib/api';
import type { WaterBodySummary } from '../types/waterBody';

interface State {
  items: WaterBodySummary[];
  loading: boolean;
  error: string | null;
}

export function useWaterBodies() {
  const [state, setState] = useState<State>({ items: [], loading: true, error: null });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetchWaterBodySummaries()
      .then((res) => {
        if (cancelled) return;
        setState({ items: res.items, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState({ items: [], loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  return { ...state, retry };
}
