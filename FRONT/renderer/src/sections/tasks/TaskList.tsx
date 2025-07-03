import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Edit, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Task } from "./types"

interface TaskListProps {
    tasks: Task[]
    onEditTask: (task: Task) => void
    onDeleteTask: (taskId: string) => void
    onToggleComplete: (taskId: string) => void
}

export function TaskList({ tasks, onEditTask, onDeleteTask, onToggleComplete }: TaskListProps) {
    const getStatusBadge = (completed: boolean) => {
        return completed ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="w-3 h-3 mr-1" />
                Completada
            </Badge>
        ) : (
            <Badge variant="secondary">
                <X className="w-3 h-3 mr-1" />
                Pendiente
            </Badge>
        )
    }

    const formatDueDate = (date: Date | null) => {
        if (!date) return "Sin fecha límite"
        return format(date, "dd 'de' MMMM, yyyy", { locale: es })
    }

    const isOverdue = (date: Date | null, completed: boolean) => {
        if (!date || completed) return false
        return date < new Date()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Tareas</CardTitle>
                <CardDescription>Gestiona todas tus tareas desde aquí</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha Límite</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks?.map((task) => (
                                <TableRow key={task.id} className={task.completed ? "opacity-60" : ""}>
                                    <TableCell className="font-medium">
                                        <div className={cn("flex items-center gap-2", task.completed && "line-through")}>
                                            <Checkbox 
                                                checked={task.completed} 
                                                onCheckedChange={() => onToggleComplete(task.id)} 
                                            />
                                            {task.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[300px] truncate text-muted-foreground">
                                            {task.description || "Sin descripción"}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(task.completed)}</TableCell>
                                    <TableCell>
                                        <div
                                            className={cn(
                                                "text-sm",
                                                isOverdue(task.dueDate, task.completed) && "text-red-600 font-medium",
                                            )}
                                        >
                                            {formatDueDate(task.dueDate)}
                                            {isOverdue(task.dueDate, task.completed) && <span className="block text-xs">¡Vencida!</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onEditTask(task)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDeleteTask(task.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {tasks?.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No hay tareas creadas aún</p>
                            <Button variant="outline" className="mt-4" onClick={() => onEditTask({} as Task)}>
                                Crear primera tarea
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
} 