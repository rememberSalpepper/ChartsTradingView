// File: components/ChartDashboard.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import GridLayout, { WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

const CHARTS_KEY = "charts";
const LAYOUT_KEY = "charts-layout";

interface ChartItem {
  id: string;
  symbol: string;
  interval: string;
  theme: "light" | "dark";
  indicators: string[];
}

const indicatorMap: Record<string, string> = {
  SMA: "MASimple@tv-basicstudies",
  EMA: "MAExp@tv-basicstudies",
  Ichimoku: "IchimokuCloud@tv-basicstudies",
  MACD: "MACD@tv-basicstudies",
  RSI: "RSI@tv-basicstudies",
  Stoch: "StochasticRSI@tv-basicstudies",
  Bollinger: "BB@tv-basicstudies",
  Volumen: "Volume@tv-basicstudies",
  VWAP: "VWAP@tv-basicstudies",
};

// Componente que inyecta el script de TradingView
const TradingViewWidget = ({
  symbol,
  interval,
  theme,
  indicators,
}: {
  symbol: string;
  interval: string;
  theme: "light" | "dark";
  indicators: string[];
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";

    const studies = indicators.map((i) => indicatorMap[i]).filter(Boolean);
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      hide_side_toolbar: false,
      theme,
      timezone: "Etc/UTC",
      style: "1",
      locale: "es",
      allow_symbol_change: true,
      studies,
      support_host: "https://www.tradingview.com",
    });

    if (container.current) {
      container.current.innerHTML = "";
      container.current.appendChild(script);
    }
  }, [symbol, interval, theme, indicators]);

  return <div ref={container} className="h-full w-full" />;
};

export default function ChartDashboard() {
  // 1) Charts
  const [charts, setCharts] = useState<ChartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(CHARTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 2) Layout
  const [layout, setLayout] = useState<Layout[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(LAYOUT_KEY);
    return saved
      ? JSON.parse(saved)
      : charts.map((c, idx) => {
          // layout inicial si no hay nada guardado
          const perRow = Math.min(charts.length || 1, 3);
          const w = Math.floor(12 / perRow);
          const row = Math.floor(idx / perRow);
          const col = idx % perRow;
          return { i: c.id, x: col * w, y: row * 8, w, h: idx < perRow ? 12 : 8 };
        });
  });

  // Otros estados de configuración del diálogo
  const [newSymbol, setNewSymbol] = useState("");
  const [newInterval, setNewInterval] = useState("D");
  const [newTheme, setNewTheme] = useState<"light" | "dark">("dark");
  const [indicatorTabs, setIndicatorTabs] = useState<Record<string, string[]>>({
    tendencia: [],
    momentum: [],
    volatilidad: [],
    volumen: [],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Guarda charts
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CHARTS_KEY, JSON.stringify(charts));

    // Al cambiar charts, asegúrate de reflejar en layout:
    setLayout((prev) => {
      return charts.map((c, idx) => {
        const existing = prev.find((l) => l.i === c.id);
        if (existing) return existing;
        // si es chart nuevo, posición por defecto
        const perRow = Math.min(charts.length, 3);
        const w = Math.floor(12 / perRow);
        const row = Math.floor(idx / perRow);
        const col = idx % perRow;
        return { i: c.id, x: col * w, y: row * 8, w, h: idx < perRow ? 12 : 8 };
      });
    });
  }, [charts]);

  // Guarda layout cuando cambie (drag/resize)
  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(newLayout));
  };

  // Añadir gráfico
  const addChart = () => {
    if (!newSymbol) return;
    const id = `chart-${Date.now()}`;
    const indicators = Object.values(indicatorTabs).flat();
    setCharts((prev) => [
      ...prev,
      { id, symbol: newSymbol, interval: newInterval, theme: newTheme, indicators },
    ]);
    // reset formulario
    setNewSymbol("");
    setNewInterval("D");
    setNewTheme("dark");
    setIndicatorTabs({ tendencia: [], momentum: [], volatilidad: [], volumen: [] });
    setIsAddDialogOpen(false);
  };

  // Quitar gráfico
  const removeChart = (id: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== id));
    // layout asociado también desaparece porque en el useEffect de charts lo filtramos
  };

  // Toggle indicadores
  const toggleIndicator = (cat: string, ind: string) => {
    setIndicatorTabs((prev) => {
      const list = prev[cat];
      return {
        ...prev,
        [cat]: list.includes(ind) ? list.filter((i) => i !== ind) : [...list, ind],
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 p-4 text-white">
      {/* Botón + Diálogo */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-teal-500 to-blue-500 mb-4">
            <Plus className="h-4 w-4 mr-2" /> Añadir Gráfico
          </Button>
        </DialogTrigger>
        <DialogContent
          onKeyDown={(e) => e.key === "Enter" && addChart()}
          className="bg-gradient-to-b from-teal-900 to-blue-900 border-teal-700 text-white max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Gráfico</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Configuración básica */}
            <div className="space-y-4">
              <Label>Símbolo</Label>
              <Input
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                placeholder="NASDAQ:AAPL"
                className="bg-teal-900/50 text-white border-teal-700/50"
              />
              <Label>Intervalo</Label>
              <Select value={newInterval} onValueChange={setNewInterval}>
                <SelectTrigger className="bg-teal-900/50 text-white border-teal-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-teal-900 text-white">
                  {["1", "5", "15", "30", "60", "D", "W", "M"].map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Tema</Label>
              <Select value={newTheme} onValueChange={(v) => setNewTheme(v as any)}>
                <SelectTrigger className="bg-teal-900/50 text-white border-teal-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-teal-900 text-white">
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selección de indicadores */}
            <div className="space-y-2 overflow-hidden">
              <Label>Indicadores</Label>
              <Tabs defaultValue="tendencia">
                <TabsList className="bg-teal-800 text-white overflow-x-auto whitespace-nowrap rounded-md">
                  {Object.keys(indicatorTabs).map((cat) => (
                    <TabsTrigger key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="tendencia">
                  {["SMA", "EMA", "Ichimoku"].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        checked={indicatorTabs.tendencia.includes(i)}
                        onCheckedChange={() => toggleIndicator("tendencia", i)}
                      />
                      <label>{i}</label>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="momentum">
                  {["MACD", "RSI", "Stoch"].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        checked={indicatorTabs.momentum.includes(i)}
                        onCheckedChange={() => toggleIndicator("momentum", i)}
                      />
                      <label>{i}</label>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="volatilidad">
                  {["Bollinger"].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        checked={indicatorTabs.volatilidad.includes(i)}
                        onCheckedChange={() => toggleIndicator("volatilidad", i)}
                      />
                      <label>{i}</label>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="volumen">
                  {["Volumen", "VWAP"].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        checked={indicatorTabs.volumen.includes(i)}
                        onCheckedChange={() => toggleIndicator("volumen", i)}
                      />
                      <label>{i}</label>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-4"
            onClick={addChart}
          >
            📈 Añadir Gráfico
          </Button>
        </DialogContent>
      </Dialog>

      {/* Grid con persistencia de layout */}
      <ResponsiveGridLayout
        layout={layout}
        cols={12}
        rowHeight={40}
        width={1200}
        compactType="vertical"
        preventCollision={false}
        resizeHandles={["se", "sw"]}
        onLayoutChange={onLayoutChange}
      >
        {charts.map((chart) => (
          <div
            key={chart.id}
            data-grid={layout.find((l) => l.i === chart.id)!}
            className="rounded-xl shadow-lg bg-gradient-to-br from-teal-900/80 to-blue-900/80 border-teal-700/50 overflow-hidden flex flex-col"
          >
            <div className="p-2 bg-teal-800/90 text-white text-sm flex justify-between cursor-move">
              <span>
                {chart.symbol} ({chart.interval})
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeChart(chart.id)}
                className="text-white hover:bg-teal-700/50 p-1 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-grow">
              <TradingViewWidget
                symbol={chart.symbol}
                interval={chart.interval}
                theme={chart.theme}
                indicators={chart.indicators}
              />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
