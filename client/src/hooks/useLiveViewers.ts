import { useState, useEffect } from 'react';
import { socket } from '../ws/socket';

export function useLiveViewers() {
  const [viewers, setViewers] = useState<Record<string, number>>({});

  useEffect(() => {
    const handler = (payload: { supplementId: string; liveViewers: number }) => {
      setViewers((prev) => ({
        ...prev,
        [payload.supplementId]: payload.liveViewers,
      }));
    };

    socket.on('viewersUpdate', handler);

    return () => {
      socket.off('viewersUpdate', handler);
    };
  }, []);

  return viewers;
}
