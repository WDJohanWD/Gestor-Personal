import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { TaskHeader } from "./TaskHeader"
import { TaskStats } from "./TaskStats"
import { TaskList } from "./TaskList"
import { TaskDialog } from "./TaskDialog"
import { Task } from "./types"

export default function Tasks() {
    const { token, user } = useAuth()
    const [tasks, setTasks] = useState<Task[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    useEffect(() => {
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

    const handleDeleteTask = (taskId: string) => {
        setTasks((prev) => prev?.filter((task) => task.id !== taskId))
    }

    const handleToggleComplete = (taskId: string) => {
        setTasks((prev) => prev?.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
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