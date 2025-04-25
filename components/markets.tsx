// File: components/markets.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TickerTape from "@/components/TickerTape";

export interface MarketsProps {
  onSelectSymbol: (symbol: string) => void;
}

type TabType = "spx" | "nasdaq" | "crypto" | "forex";

export default function Markets({ onSelectSymbol }: MarketsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("spx");
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";

    let widgetSrc = "";
    let config: any = {};

    switch (activeTab) {
      case "spx":
        widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        config = {
          exchanges: [],
          dataSource: "SPX500",
          grouping: "sector",
          blockSize: "market_cap_basic",
          blockColor: "change",
          locale: "en",
          symbolUrl: "",
          colorTheme: "dark",
          hasTopBar: true,
          isDataSetEnabled: true,
          isZoomEnabled: true,
          hasSymbolTooltip: true,
          isMonoSize: false,
          width: "100%",
          height: "100%",
        };
        break;
      case "nasdaq":
        widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        config = { ...config, dataSource: "NASDAQ100" };
        break;
      case "crypto":
        widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
        config = {
          dataSource: "Crypto",
          blockSize: "market_cap_calc",
          blockColor: "24h_close_change|5",
          locale: "en",
          symbolUrl: "",
          colorTheme: "dark",
          hasTopBar: true,
          isDataSetEnabled: true,
          isZoomEnabled: true,
          hasSymbolTooltip: true,
          isMonoSize: false,
          width: "100%",
          height: "100%",
        };
        break;
      case "forex":
        widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
        config = {
          width: "100%",
          height: "600",
          currencies: [
            "EUR","USD","JPY","GBP","CHF","AUD",
            "CAD","NZD","CNY","TRY","SEK","NOK"
          ],
          isTransparent: false,
          colorTheme: "dark",
          locale: "en",
          backgroundColor: "#1D222D",
        };
        break;
    }

    script.src = widgetSrc;
    script.innerHTML = JSON.stringify(config);
    widgetRef.current.appendChild(script);
  }, [activeTab]);

  return (
    <div className="h-full bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 p-4">
      {/* Si quieres disparar onSelectSymbol, hazlo dentro de aquí cuando alguien pulse algo */}

      <TickerTape />

      <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-2">
        Mapa de Calor de los Mercados
      </h2>
      <p className="text-teal-300/70 mb-6">
        Visualiza el rendimiento del mercado por sectores y categorías.
      </p>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
      >
        <TabsList className="bg-teal-900/30 border border-teal-800/30 mb-4">
          <TabsTrigger value="spx">S&P 500</TabsTrigger>
          <TabsTrigger value="nasdaq">NASDAQ</TabsTrigger>
          <TabsTrigger value="crypto">Cripto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30 p-4">
            <div ref={widgetRef} className="w-full h-[600px]">
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-teal-700/30 rounded-full mb-4" />
                  <div className="h-4 w-48 bg-teal-700/30 rounded mb-2" />
                  <div className="h-3 w-36 bg-teal-700/20 rounded" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-teal-300/70 text-sm">
        <p>Estos mapas de calor te ayudan a identificar sectores activos.</p>
      </div>
    </div>
  );
}
