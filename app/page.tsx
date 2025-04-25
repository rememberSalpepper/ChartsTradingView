// File: app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import ChartDashboard from "@/components/chart-dashboard";
import Markets from "@/components/markets";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "mercados">("dashboard");

  const handleAddSymbol = (symbol: string) => {
    // Al añadir símbolo, nos aseguramos de volver al Dashboard
    setActiveTab("dashboard");
    window.dispatchEvent(
      new CustomEvent("add-chart", { detail: { symbol } })
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-grow relative">
        {/* Dashboard siempre montado, solo oculto/visible */}
        <div
          style={{
            display: activeTab === "dashboard" ? "block" : "none",
            width: "100%",
            height: "100%",
            position: activeTab === "dashboard" ? "static" : "absolute",
            inset: 0,
          }}
        >
          <ChartDashboard />
        </div>

        {/* Markets siempre montado, solo oculto/visible */}
        <div
          style={{
            display: activeTab === "mercados" ? "block" : "none",
            width: "100%",
            height: "100%",
            position: activeTab === "mercados" ? "static" : "absolute",
            inset: 0,
          }}
        >
          <Markets onSelectSymbol={handleAddSymbol} />
        </div>
      </div>
    </main>
  );
}
