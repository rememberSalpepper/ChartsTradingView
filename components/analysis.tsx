export default function Analysis() {
  return (
    <div className="h-full bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Análisis
        </h2>
        <p className="text-teal-300/70 mb-4">
          Esta sección está en desarrollo. Próximamente podrás encontrar herramientas de análisis avanzado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-40 rounded-xl bg-gradient-to-br from-teal-900/50 to-blue-900/50 border border-teal-800/30 p-4 flex flex-col justify-between"
            >
              <div className="text-teal-300 font-medium">Herramienta de Análisis {item}</div>
              <div className="text-white/70 text-sm">Próximamente disponible</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
