import { useState } from "react"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"
import { Eye, EyeOff, KeyRound, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {Link} from "react-router-dom"

export default function Register() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleRegister = () => {
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres")
      return
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden")
      return
    }

    const hash = bcrypt.hashSync(password, 10)
    localStorage.setItem("passwordHash", hash)
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Crear contraseña</CardTitle>
          <CardDescription className="text-center">Crea una contraseña segura para proteger tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
            </Button>
          </div>

          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="pr-10"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              <span className="sr-only">{showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">La contraseña debe:</p>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
              <li className={password.length >= 4 ? "text-green-600" : ""}>Tener al menos 4 caracteres</li>
              <li className={password && confirm && password === confirm ? "text-green-600" : ""}>
                Coincidir en ambos campos
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleRegister}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una contraseña?{" "}
            <Link to="/login" className="text-primary underline underline-offset-4 hover:text-primary/90">
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
