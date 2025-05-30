// File: components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  activeTab: "dashboard" | "mercados";
  onTabChange: (tab: "dashboard" | "mercados") => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: "dashboard" | "mercados") => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-800/20 bg-gradient-to-r from-teal-900/90 to-blue-900/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <Image
            src="/images/pgas-logo.webp"
            alt="Pgas Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <Image
            src="/images/pgas-text.png"
            alt="Pgas"
            width={80}
            height={30}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex flex-1 items-center justify-between">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleTabClick("dashboard")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeTab === "dashboard" ? "text-white" : "text-white/70"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleTabClick("mercados")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeTab === "mercados" ? "text-white" : "text-white/70"
              }`}
            >
              Mercados
            </button>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-teal-800/20"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-gradient-to-b from-teal-900 to-blue-900 text-white border-teal-700"
              >
                <div className="flex flex-col space-y-4 mt-8 px-4">
                  <button
                    onClick={() => handleTabClick("dashboard")}
                    className={`text-left py-2 rounded-md ${
                      activeTab === "dashboard"
                        ? "bg-teal-800/50 text-white"
                        : "text-white/70 hover:bg-teal-800/20"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleTabClick("mercados")}
                    className={`text-left py-2 rounded-md ${
                      activeTab === "mercados"
                        ? "bg-teal-800/50 text-white"
                        : "text-white/70 hover:bg-teal-800/20"
                    }`}
                  >
                    Mercados
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
);
}
