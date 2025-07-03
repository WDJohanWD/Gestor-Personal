export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
    dueDate: Date | null
    createdAt: Date
}

export interface TaskFormData {
    title: string
    description: string
    dueDate: Date | undefined
} 