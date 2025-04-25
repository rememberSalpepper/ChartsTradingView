"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import TickerTape from "@/components/TickerTape"

export default function Markets() {
  const [activeTab, setActiveTab] = useState("spx")
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!widgetRef.current) return
    widgetRef.current.innerHTML = ""

    const script = document.createElement("script")
    script.async = true
    script.type = "text/javascript"

    let widgetSrc = ""
    let config = {}

    if (activeTab === "spx") {
      widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
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
        height: "100%"
      }
    } else if (activeTab === "nasdaq") {
      widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
      config = {
        exchanges: [],
        dataSource: "NASDAQ100",
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
        height: "100%"
      }
    } else if (activeTab === "crypto") {
      widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js"
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
        height: "100%"
      }
    } else if (activeTab === "forex") {
      widgetSrc = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js"
      config = {
        width: "100%",
        height: "600",
        currencies: [
          "EUR", "USD", "JPY", "GBP", "CHF", "AUD",
          "CAD", "NZD", "CNY", "TRY", "SEK", "NOK"
        ],
        isTransparent: false,
        colorTheme: "dark",
        locale: "en",
        backgroundColor: "#1D222D"
      }
    }

    script.src = widgetSrc
    script.innerHTML = JSON.stringify(config)
    widgetRef.current.appendChild(script)
  }, [activeTab])

  return (
    <div className="h-full bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 p-4">
      <TickerTape />

      <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-2">
        Mapa de Calor de los Mercados
      </h2>
      <p className="text-teal-300/70 mb-6">
        Visualiza el rendimiento del mercado por sectores y categorías. Cambia entre índices, criptomonedas, forex, etc.
      </p>

      <Tabs defaultValue="spx" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-teal-900/30 border border-teal-800/30 mb-4">
          <TabsTrigger value="spx" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
            S&P 500
          </TabsTrigger>
          <TabsTrigger value="nasdaq" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
            NASDAQ
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
            Cripto
          </TabsTrigger>
          <TabsTrigger value="forex" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
            Forex
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-2">
          <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30 p-4">
            <div ref={widgetRef} className="w-full h-[600px]">
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-teal-700/30 rounded-full mb-4"></div>
                  <div className="h-4 w-48 bg-teal-700/30 rounded mb-2"></div>
                  <div className="h-3 w-36 bg-teal-700/20 rounded"></div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-teal-300/70 text-sm">
        <p>
          Estos mapas de calor te permiten identificar rápidamente los sectores más activos del mercado y sus tendencias.
        </p>
        <p className="mt-2">
          Puedes hacer zoom, mover el gráfico y ver detalles al pasar el cursor sobre cada bloque.
        </p>
      </div>
    </div>
  )
}
