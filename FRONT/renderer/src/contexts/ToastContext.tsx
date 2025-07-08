// src/contexts/ToastContext.jsx
import * as Toast from "@radix-ui/react-toast"
import { createContext, useContext, useState } from "react"

const ToastContext = createContext<{ showToast: ({ title, description }: { title: string, description: string }) => void } | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const showToast = ({ title, description }: { title: string, description: string }) => {
    setTitle(title)
    setDescription(description || "")
    setOpen(false) // reset for retrigger
    setTimeout(() => setOpen(true), 10)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="bg-black text-white px-4 py-3 rounded-lg shadow-lg w-[320px] data-[state=open]:animate-in data-[state=closed]:animate-out fixed bottom-5 right-5 z-50"
        >
          <Toast.Title className="font-semibold">{title}</Toast.Title>
          {description && <Toast.Description className="text-sm mt-1">{description}</Toast.Description>}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-full z-50 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}