"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sliders, Monitor, Bell, Database } from "lucide-react"

export default function Settings() {
  const [autoSave, setAutoSave] = useState(true)
  const [defaultTheme, setDefaultTheme] = useState("dark")
  const [defaultInterval, setDefaultInterval] = useState("D")
  const [notifications, setNotifications] = useState(true)
  const [dataCache, setDataCache] = useState(true)

  return (
    <div className="h-full bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Configuración
        </h2>
        <p className="text-teal-300/70 mb-4">Personaliza tu experiencia en el dashboard de gráficos.</p>

        <Tabs defaultValue="general" className="mt-6">
          <TabsList className="bg-teal-900/30 border border-teal-800/30">
            <TabsTrigger value="general" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
              <Sliders className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white"
            >
              <Monitor className="h-4 w-4 mr-2" />
              Apariencia
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-teal-800/50 data-[state=active]:text-white">
              <Database className="h-4 w-4 mr-2" />
              Datos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4">
            <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30">
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription className="text-teal-300/70">
                  Configura las opciones generales del dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-save">Guardar automáticamente</Label>
                    <p className="text-sm text-teal-300/70">Guarda automáticamente los cambios en los gráficos</p>
                  </div>
                  <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="default-interval">Intervalo predeterminado</Label>
                  <Select value={defaultInterval} onValueChange={setDefaultInterval}>
                    <SelectTrigger id="default-interval" className="bg-teal-900/50 border-teal-700/50">
                      <SelectValue placeholder="Seleccionar intervalo" />
                    </SelectTrigger>
                    <SelectContent className="bg-teal-900 border-teal-700">
                      <SelectItem value="1">1 Minuto</SelectItem>
                      <SelectItem value="5">5 Minutos</SelectItem>
                      <SelectItem value="15">15 Minutos</SelectItem>
                      <SelectItem value="30">30 Minutos</SelectItem>
                      <SelectItem value="60">1 Hora</SelectItem>
                      <SelectItem value="D">1 Día</SelectItem>
                      <SelectItem value="W">1 Semana</SelectItem>
                      <SelectItem value="M">1 Mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 border-none mt-4">
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-4">
            <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30">
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription className="text-teal-300/70">Personaliza la apariencia del dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="default-theme">Tema predeterminado</Label>
                  <Select value={defaultTheme} onValueChange={setDefaultTheme}>
                    <SelectTrigger id="default-theme" className="bg-teal-900/50 border-teal-700/50">
                      <SelectValue placeholder="Seleccionar tema" />
                    </SelectTrigger>
                    <SelectContent className="bg-teal-900 border-teal-700">
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 border-none mt-4">
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30">
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription className="text-teal-300/70">
                  Configura las notificaciones del dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Notificaciones</Label>
                    <p className="text-sm text-teal-300/70">
                      Recibe notificaciones sobre cambios importantes en los mercados
                    </p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 border-none mt-4">
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <Card className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-800/30">
              <CardHeader>
                <CardTitle>Datos</CardTitle>
                <CardDescription className="text-teal-300/70">
                  Configura las opciones de datos del dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-cache">Caché de datos</Label>
                    <p className="text-sm text-teal-300/70">Almacena datos en caché para mejorar el rendimiento</p>
                  </div>
                  <Switch id="data-cache" checked={dataCache} onCheckedChange={setDataCache} />
                </div>

                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 border-none mt-4">
                  Guardar cambios
                </Button>

                <div className="pt-4 border-t border-teal-800/30 mt-4">
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Borrar todos los datos almacenados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
