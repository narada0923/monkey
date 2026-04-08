"use client";

import { useEffect, useEffectEvent } from "react";

type UsePollingOptions = {
  enabled: boolean;
  intervalMs?: number;
  onTick: () => void;
};

export function usePolling({
  enabled,
  intervalMs = 5000,
  onTick,
}: UsePollingOptions) {
  const onTickEvent = useEffectEvent(onTick);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = window.setInterval(() => {
      onTickEvent();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [enabled, intervalMs]);
}
