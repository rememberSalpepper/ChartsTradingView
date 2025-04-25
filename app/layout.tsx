// File: app/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

// Cargamos en cliente para NO desmontar nunca ni Dashboard ni Markets
const ChartDashboard = dynamic(
  () => import("../components/chart-dashboard"),
  { ssr: false }
);
const Markets = dynamic(() => import("../components/markets"), {
  ssr: false,
});

export default function RootLayout() {
  const [view, setView] = useState<"dashboard" | "mercados">("dashboard");

  // Cada vez que cambies de pestaña, forzamos un resize
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [view]);

  return (
    <html lang="es">
      <body
        className={`${inter.className} flex flex-col h-screen bg-slate-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Navbar */}
          <Navbar
            activeTab={view}
            onTabChange={(tab: string) =>
              setView(tab as "dashboard" | "mercados")
            }
          />

          {/* Contenedor principal */}
          <main className="flex-1 w-full overflow-auto">
            {/* Dashboard siempre montado, solo oculto/visible */}
            <div style={{ display: view === "dashboard" ? "block" : "none" }}>
              <ChartDashboard />
            </div>
            {/* Markets siempre montado, solo oculto/visible */}
            <div style={{ display: view === "mercados" ? "block" : "none" }}>
              <Markets />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
