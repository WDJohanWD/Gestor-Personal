"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, Wallet, DollarSign, Plus, Calendar } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types
type TransactionType = "income" | "expense"
type Transaction = {
    id: string
    date: Date
    category: string
    description: string
    amount: number
    type: TransactionType
}

type CategoryTotal = {
    name: string
    value: number
    color: string
}

// Sample data
const initialTransactions: Transaction[] = [
    {
        id: "1",
        date: new Date(2023, 3, 5),
        category: "Salary",
        description: "Monthly salary",
        amount: 3000,
        type: "income",
    },
    {
        id: "2",
        date: new Date(2023, 3, 10),
        category: "Rent",
        description: "Monthly rent",
        amount: 1200,
        type: "expense",
    },
    {
        id: "3",
        date: new Date(2023, 3, 15),
        category: "Groceries",
        description: "Weekly groceries",
        amount: 150,
        type: "expense",
    },
    {
        id: "4",
        date: new Date(2023, 3, 20),
        category: "Utilities",
        description: "Electricity bill",
        amount: 80,
        type: "expense",
    },
    {
        id: "5",
        date: new Date(2023, 3, 25),
        category: "Freelance",
        description: "Website project",
        amount: 500,
        type: "income",
    },
]

// Category colors
const categoryColors: Record<string, string> = {
    Salary: "#4ade80",
    Freelance: "#a3e635",
    Rent: "#f87171",
    Groceries: "#fb923c",
    Utilities: "#60a5fa",
    Entertainment: "#c084fc",
    Transportation: "#94a3b8",
    Food: "#fbbf24",
    Shopping: "#e879f9",
    Other: "#9ca3af",
}

export default function Finance() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
        type: "expense",
        date: new Date(),
        category: "",
        description: "",
        amount: 0,
    })
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Filter transactions by current month and year
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            transaction.date.getMonth() === currentDate.getMonth() &&
            transaction.date.getFullYear() === currentDate.getFullYear()
        )
    })

    // Calculate summary data
    const initialBalance = 2000 // Example initial balance
    const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const currentBalance = initialBalance + totalIncome - totalExpenses

    // Calculate expense categories for chart
    const expensesByCategory = filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((acc: Record<string, number>, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount
            return acc
        }, {})

    const chartData: CategoryTotal[] = Object.entries(expensesByCategory).map(([name, value]) => ({
        name,
        value,
        color: categoryColors[name] || "#9ca3af",
    }))

    // Handle month navigation
    const prevMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev)
            newDate.setMonth(newDate.getMonth() - 1)
            return newDate
        })
    }

    const nextMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev)
            newDate.setMonth(newDate.getMonth() + 1)
            return newDate
        })
    }

    // Handle adding new transaction
    const handleAddTransaction = () => {
        if (!newTransaction.category || !newTransaction.description || !newTransaction.amount) {
            return
        }

        const transaction: Transaction = {
            id: Date.now().toString(),
            date: newTransaction.date || new Date(),
            category: newTransaction.category,
            description: newTransaction.description,
            amount: Number(newTransaction.amount),
            type: newTransaction.type as TransactionType,
        }

        setTransactions((prev) => [...prev, transaction])
        setNewTransaction({
            type: "expense",
            date: new Date(),
            category: "",
            description: "",
            amount: 0,
        })
        setIsDialogOpen(false)
    }

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload }: { active: boolean; payload: { name: string; value: number }[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded p-2 shadow-sm">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-sm">${payload[0].value.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                        {((payload[0].value / totalExpenses) * 100).toFixed(1)}% of expenses
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
            {/* Header with month selector */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Personal Finance Manager</h1>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">{format(currentDate, "MMMM yyyy")}</div>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Initial Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${initialBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-500">+${totalIncome.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">-${totalExpenses.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${currentBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Add transaction button */}
            <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Transaction
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Transaction</DialogTitle>
                        </DialogHeader>
                        <Tabs
                            defaultValue="expense"
                            className="w-full"
                            onValueChange={(value: string) => setNewTransaction({ ...newTransaction, type: value as TransactionType })}
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="expense">Expense</TabsTrigger>
                                <TabsTrigger value="income">Income</TabsTrigger>
                            </TabsList>
                            <TabsContent value="expense" className="space-y-4 mt-4">
                                <div className="space-y-4">
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="date">Date</Label>
                                        <div className="flex w-full items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="date"
                                                type="date"
                                                value={newTransaction.date ? format(new Date(newTransaction.date), "yyyy-MM-dd") : ""}
                                                onChange={(e) =>
                                                    setNewTransaction({
                                                        ...newTransaction,
                                                        date: new Date(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            onValueChange={(value: string) => setNewTransaction({ ...newTransaction, category: value })}
                                            value={newTransaction.category}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Rent">Rent</SelectItem>
                                                <SelectItem value="Groceries">Groceries</SelectItem>
                                                <SelectItem value="Utilities">Utilities</SelectItem>
                                                <SelectItem value="Entertainment">Entertainment</SelectItem>
                                                <SelectItem value="Transportation">Transportation</SelectItem>
                                                <SelectItem value="Food">Food</SelectItem>
                                                <SelectItem value="Shopping">Shopping</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            placeholder="Enter description"
                                            value={newTransaction.description}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="0.00"
                                            value={newTransaction.amount || ""}
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) })
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="income" className="space-y-4 mt-4">
                                <div className="space-y-4">
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="date-income">Date</Label>
                                        <div className="flex w-full items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="date-income"
                                                type="date"
                                                value={newTransaction.date ? format(new Date(newTransaction.date), "yyyy-MM-dd") : ""}
                                                onChange={(e) =>
                                                    setNewTransaction({
                                                        ...newTransaction,
                                                        date: new Date(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="category-income">Category</Label>
                                        <Select
                                            onValueChange={(value: string) => setNewTransaction({ ...newTransaction, category: value })}
                                            value={newTransaction.category}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Salary">Salary</SelectItem>
                                                <SelectItem value="Freelance">Freelance</SelectItem>
                                                <SelectItem value="Investment">Investment</SelectItem>
                                                <SelectItem value="Gift">Gift</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="description-income">Description</Label>
                                        <Input
                                            id="description-income"
                                            placeholder="Enter description"
                                            value={newTransaction.description}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="amount-income">Amount</Label>
                                        <Input
                                            id="amount-income"
                                            type="number"
                                            placeholder="0.00"
                                            value={newTransaction.amount || ""}
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) })
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                        <div className="flex justify-between mt-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleAddTransaction}>Add Transaction</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Main content */}
            {filteredTransactions.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Transaction list */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTransactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                                                <TableCell>{transaction.category}</TableCell>
                                                <TableCell>{transaction.description}</TableCell>
                                                <TableCell
                                                    className={`text-right ${transaction.type === "income" ? "text-emerald-500" : "text-red-500"
                                                        }`}
                                                >
                                                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Expense chart */}
                    <div>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Expenses by Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {chartData.length > 0 ? (
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                                    labelLine={false}
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip active={true} payload={[]} />} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                        <p className="text-muted-foreground">No expense data for this period</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <Card className="w-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-3 mb-4">
                            <Wallet className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-4">
                            You haven't added any transactions for this month. Click the "Add Transaction" button to get started.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Your First Transaction
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">{/* Transaction table */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Type</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTransactions.map((t) => (
                                            <TableRow key={t.id}>
                                                <TableCell>{format(new Date(t.date), "yyyy-MM-dd")}</TableCell>
                                                <TableCell>{t.category}</TableCell>
                                                <TableCell>{t.description}</TableCell>
                                                <TableCell className={t.type === "expense" ? "text-red-500" : "text-emerald-500"}>
                                                    {t.type === "expense" ? "-" : "+"}${t.amount.toFixed(2)}
                                                </TableCell>
                                                <TableCell>{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
