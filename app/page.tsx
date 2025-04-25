"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import ChartDashboard from "@/components/chart-dashboard"
import Markets from "@/components/markets"
import Analysis from "@/components/analysis"
import Settings from "@/components/settings"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleAddSymbol = (symbol: string) => {
    // Cambiar a la pestaña de dashboard después de añadir un símbolo
    setActiveTab("dashboard")

    // Pasar el símbolo al componente ChartDashboard
    const event = new CustomEvent("add-chart", {
      detail: { symbol },
    })
    window.dispatchEvent(event)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-grow">
        {activeTab === "dashboard" && <ChartDashboard />}
        {activeTab === "mercados" && <Markets onSelectSymbol={handleAddSymbol} />}
        {activeTab === "analisis" && <Analysis />}
        {activeTab === "configuracion" && <Settings />}
      </div>
    </main>
  )
}
