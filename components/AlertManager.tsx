// File: components/AlertManager.tsx
"use client";

import { useEffect, useRef } from "react";

export interface AlertRule {
  id: string;
  symbol: string;
  threshold: number;
  direction: "above" | "below";
  enabled: boolean;
}

const loadRules = (): AlertRule[] =>
  JSON.parse(localStorage.getItem("alert-rules") || "[]");
const saveRules = (rules: AlertRule[]) =>
  localStorage.setItem("alert-rules", JSON.stringify(rules));
const removeRule = (id: string) => {
  const rules = loadRules().filter((r) => r.id !== id);
  saveRules(rules);
};

/**
 * Reproduce un pitido de 440 Hz durante 200 ms con volumen reducido.
 */
function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.1; // volumen bajo (0 a 1)
    osc.type = "sine";
    osc.frequency.value = 440;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 200);
  } catch {
    // Silenciar si AudioContext no disponible
  }
}

export default function AlertManager({
  onAlertFired,
}: {
  onAlertFired?: (id: string) => void;
}) {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const checkAlerts = async () => {
      const rules = loadRules();
      for (const rule of rules) {
        if (!rule.enabled) continue;
        const symClean = rule.symbol.replace(/[^A-Za-z0-9]/g, "");
        if (!/USDT$/i.test(symClean)) continue;

        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symClean.toUpperCase()}`;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const { price: priceStr } = await res.json();
          const price = parseFloat(priceStr);
          const hitAbove = rule.direction === "above" && price > rule.threshold;
          const hitBelow = rule.direction === "below" && price < rule.threshold;

          if ((hitAbove || hitBelow) && Notification.permission === "granted") {
            const msg = `🚨 ${rule.symbol}: ${price.toFixed(2)} ${
              rule.direction === "above" ? ">" : "<"
            } ${rule.threshold}`;

            // Notificación
            new Notification(msg);
            // Pitido corto
            playBeep();
            // Popup bloqueante
            window.alert(msg);
            // Eliminar regla y notificar
            removeRule(rule.id);
            onAlertFired?.(rule.id);
          }
        } catch {
          // ignorar errores
        }
      }
    };

    intervalRef.current = window.setInterval(checkAlerts, 60_000);
    checkAlerts();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onAlertFired]);

  return null;
}
