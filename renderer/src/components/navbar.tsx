import { NavLink } from "react-router-dom"
import { HandCoins, RectangleEllipsis, Settings, NotepadText } from "lucide-react"

export default function Navbar() {
  const navItems = [
    {
      name: "Gestor financiero",
      icon: HandCoins,
      path: "/financial-manager",
    },
    {
      name: "Gestor de tareas",
      icon: NotepadText,
      path: "/task-manager",
    },
    {
      name: "Gestor contraseñas",
      icon: RectangleEllipsis,
      path: "/password-manager",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ]

  return (
    <nav className="w-64 h-full bg-primary  border-r border-gray-200  flex flex-col">
      <div className="p-4 border-b border-gray-200 ">
        <h1 className="text-xl font-bold text-white ">Gestor personal</h1>
      </div>
      <div className="py-4 flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-background-hover     text-font-bold    font-medium"
                      : "text-font-bold bg-gray-100 hover:bg-background-hover"
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
