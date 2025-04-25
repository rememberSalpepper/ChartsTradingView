"use client"

import { useEffect, useRef } from "react"

export default function TickerTape() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
      ],
      showSymbolLogo: true,
      isTransparent: false,        // no transparente para forzar fondo negro
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en"
    })
    ref.current.appendChild(script)
  }, [])

  return (
    <div
      className="w-full overflow-hidden rounded-md mb-6"
      style={{
        backgroundColor: "#000",       // fondo negro puro
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "4px",
      }}
    >
      <div ref={ref} />
      <style>{`
        .tradingview-widget-copyright {
          display: none !important;    /* logo oculto */
        }
        iframe {
          background-color: #000 !important;
        }
      `}</style>
    </div>
  )
}
