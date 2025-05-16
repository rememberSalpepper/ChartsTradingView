
import "./globals.css";
import ClientRoot from "../components/ClientRoot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body className="flex flex-col h-screen bg-slate-900">
        {/* Montamos el componente cliente que contiene Navbar, Dashboard y Markets */}
        <ClientRoot />
      </body>
    </html>
  );
}
