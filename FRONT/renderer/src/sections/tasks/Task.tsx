import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { TaskHeader } from "./TaskHeader"
import { TaskStats } from "./TaskStats"
import { TaskList } from "./TaskList"
import { TaskDialog } from "./TaskDialog"
import { Task } from "./types"
import { useToast } from "@/contexts/ToastContext"

export default function Tasks() {
    const { showToast } = useToast()
    const { token, user } = useAuth()
    const [tasks, setTasks] = useState<Task[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const fetchTasks = async () => {
        if (!user?.userId || !token) {
            setTasks([]);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/task/user/${user.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setTasks(data)
        } catch (error) {
            console.error('Error fetching tasks:', error)
            setTasks([])
        }
    }

    useEffect(() => {

        fetchTasks()
    }, [token, user])

    const handleOpenDialog = (task?: Task) => {
        if (task) {
            setEditingTask(task)
        } else {
            setEditingTask(null)
        }
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setEditingTask(null)
    }

    const handleDeleteTask = async (taskId: string) => {
        setTasks((prev) => prev?.filter((task) => task.id !== taskId))
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/task/delete/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            setTasks((prev) => prev?.filter((task) => task.id !== taskId))
            showToast({ title: "Tarea eliminada", description: "La tarea ha sido eliminada correctamente"})
            fetchTasks()
       }catch(error){
        console.error('Error deleting task:', error)
       }
    }

    const handleToggleComplete = async (taskId: string) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/task/complete/${taskId}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        setTasks((prev) => prev?.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
        showToast({ title: "Tarea completada", description: "La tarea ha sido completada correctamente"})
        fetchTasks()
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="space-y-6">
                <TaskHeader onOpenDialog={() => handleOpenDialog()} />
                <TaskStats tasks={tasks} />
                <TaskList 
                    tasks={tasks} 
                    onEditTask={handleOpenDialog}
                    onDeleteTask={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                />
                <TaskDialog 
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    editingTask={editingTask}
                    onTaskCreated={(newTask) => setTasks(prev => prev ? [...prev, newTask] : [newTask])}
                    onTaskUpdated={(updatedTask) => setTasks(prev => 
                        prev?.map(task => task.id === updatedTask.id ? updatedTask : task)
                    )}
                />
            </div>
        </div>
    )
} 