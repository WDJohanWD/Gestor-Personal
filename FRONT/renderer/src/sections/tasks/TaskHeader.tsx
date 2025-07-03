import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TaskHeaderProps {
    onOpenDialog: () => void
}

export function TaskHeader({ onOpenDialog }: TaskHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gestión de Tareas</h1>
                <p className="text-muted-foreground mt-2">Organiza y gestiona tus tareas de manera eficiente</p>
            </div>
            <Button onClick={onOpenDialog} className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Tarea
            </Button>
        </div>
    )
} 