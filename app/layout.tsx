// File: app/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });
const ChartDashboard = dynamic(
  () => import("../components/chart-dashboard"),
  { ssr: false }
);
const Markets = dynamic(
  () => import("../components/markets"),
  { ssr: false }
);

export default function RootLayout() {
  const [view, setView] = useState<"dashboard" | "mercados">("dashboard");

  // Forzar resize al cambiar de pestaña (mantiene bien los cálculos de grid)
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [view]);

  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.className} flex flex-col h-screen bg-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar activeTab={view} onTabChange={setView} />
          <div className="flex-1 relative">
            {/* Dashboard siempre montado */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: view === "dashboard" ? 1 : 0,
                pointerEvents: view === "dashboard" ? "auto" : "none",
              }}
            >
              <ChartDashboard />
            </div>

            {/* Markets siempre montado */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: view === "mercados" ? 1 : 0,
                pointerEvents: view === "mercados" ? "auto" : "none",
              }}
            >
              <Markets onSelectSymbol={() => {}} />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
