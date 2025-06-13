import { useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Edit, Trash2, Plus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {  Dialog,  DialogContent,  DialogDescription,  DialogHeader,  DialogTitle,  DialogTrigger} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date | null
  createdAt: Date
}

interface TaskFormData {
  title: string
  description: string
  dueDate: Date | undefined
  completed: boolean
}

// Datos mock para las tareas
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Completar presentación del proyecto",
    description: "Preparar slides y ensayar la presentación para el cliente",
    completed: false,
    dueDate: new Date(2024, 11, 20),
    createdAt: new Date(2024, 11, 10),
  },
  {
    id: "2",
    title: "Revisar código del equipo",
    description: "Code review de las nuevas funcionalidades implementadas",
    completed: true,
    dueDate: new Date(2024, 11, 15),
    createdAt: new Date(2024, 11, 8),
  },
  {
    id: "3",
    title: "Planificar sprint siguiente",
    description: "Definir objetivos y tareas para el próximo sprint de desarrollo",
    completed: false,
    dueDate: new Date(2024, 11, 25),
    createdAt: new Date(2024, 11, 12),
  },
  {
    id: "4",
    title: "Actualizar documentación",
    description: "Documentar las nuevas APIs y funcionalidades",
    completed: false,
    dueDate: null,
    createdAt: new Date(2024, 11, 9),
  },
  {
    id: "5",
    title: "Configurar entorno de testing",
    description: "Instalar y configurar herramientas de testing automatizado",
    completed: true,
    dueDate: new Date(2024, 11, 12),
    createdAt: new Date(2024, 11, 5),
  },
]

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const form = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      completed: false,
    },
  })

  const onSubmit = (data: TaskFormData) => {
    if (editingTask) {
      // Editar tarea existente
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? { ...task, ...data, dueDate: data.dueDate || null } : task)),
      )
    } else {
      // Crear nueva tarea
      const newTask: Task = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        completed: data.completed,
        dueDate: data.dueDate || null,
        createdAt: new Date(),
      }
      setTasks((prev) => [...prev, newTask])
    }

    handleCloseDialog()
  }

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setEditingTask(task)
      form.reset({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate || undefined,
        completed: task.completed,
      })
    } else {
      setEditingTask(null)
      form.reset({
        title: "",
        description: "",
        dueDate: undefined,
        completed: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingTask(null)
    form.reset()
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

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
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Tareas</h1>
            <p className="text-muted-foreground mt-2">Organiza y gestiona tus tareas de manera eficiente</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Tarea
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}</DialogTitle>
                <DialogDescription>
                  {editingTask
                    ? "Modifica los detalles de la tarea existente."
                    : "Completa los campos para crear una nueva tarea."}
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: "El título es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa el título de la tarea" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe los detalles de la tarea"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha Límite</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd 'de' MMMM, yyyy", { locale: es })
                                ) : (
                                  <span>Selecciona una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="completed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Marcar como completada</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Cancelar
                    </Button>
                    <Button type="submit">{editingTask ? "Actualizar" : "Crear"} Tarea</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{tasks.filter((task) => task.completed).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{tasks.filter((task) => !task.completed).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Table */}
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
                  {tasks.map((task) => (
                    <TableRow key={task.id} className={task.completed ? "opacity-60" : ""}>
                      <TableCell className="font-medium">
                        <div className={cn("flex items-center gap-2", task.completed && "line-through")}>
                          <Checkbox checked={task.completed} onCheckedChange={() => handleToggleComplete(task.id)} />
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
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(task)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTask(task.id)}
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

              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay tareas creadas aún</p>
                  <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
                    Crear primera tarea
                  </Button>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
