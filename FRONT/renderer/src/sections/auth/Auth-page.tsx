import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")

  const handleRegisterSuccess = () => {
    console.log("Registro exitoso")
    setActiveTab("login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Bienvenido</h2>
          <p className="mt-2 text-sm text-gray-600">Inicia sesión o crea una nueva cuenta</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <Login onSwitchToRegister={() => setActiveTab("register")} />
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <Register onSuccess={handleRegisterSuccess} onSwitchToLogin={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
