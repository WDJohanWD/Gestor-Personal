import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/AuthContext"
import { Task, TaskFormData } from "./types"
import { DueDatePicker } from "./DueDatePicker"
import { useToast } from "@/contexts/ToastContext"
interface TaskDialogProps {
    isOpen: boolean
    onClose: () => void
    editingTask: Task | null
    onTaskCreated: (task: Task) => void
    onTaskUpdated: (task: Task) => void
}

export function TaskDialog({ isOpen, onClose, editingTask, onTaskCreated, onTaskUpdated }: TaskDialogProps) {
    const { token, user } = useAuth()
    const { showToast } = useToast()
    const form = useForm<TaskFormData>({
        defaultValues: {
            title: "",
            description: "",
            dueDate: undefined,
        },
    })

    const onSubmit = async (data: TaskFormData) => {
        if (editingTask) {
            const updatedTask = {
                ...editingTask,
                ...data,
                dueDate: data.dueDate || null
            }
            onTaskUpdated(updatedTask)
        } else {
            const taskData = {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate ? format(data.dueDate, 'yyyy-MM-dd') : null,
                userEmail: user?.email
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/task/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(taskData),
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const newTask = await response.json()
                onTaskCreated(newTask)
                showToast({ title: "Tarea creada", description: "La tarea ha sido creada correctamente" })
            } catch (error) {
                console.error('Error creating task:', error)
            }
        }

        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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

                        <DueDatePicker control={form.control} />



                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit">{editingTask ? "Actualizar" : "Crear"} Tarea</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
} 