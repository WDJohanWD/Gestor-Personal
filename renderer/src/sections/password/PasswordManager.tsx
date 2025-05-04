import { useState } from "react"
import { Eye, EyeOff, Lock, Plus, Search, Settings, Shield, Trash, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface PasswordEntry {
  id: string
  title: string
  username: string
  password: string
  website?: string
  notes?: string
  lastUpdated: string
}

export default function PasswordManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visiblePasswordId, setVisiblePasswordId] = useState<string | null>(null)
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    {
      id: "1",
      title: "Gmail",
      username: "user@gmail.com",
      password: "strongpassword123",
      website: "https://gmail.com",
      lastUpdated: "2023-11-15",
    },
    {
      id: "2",
      title: "GitHub",
      username: "devuser",
      password: "c0d3r2023!",
      website: "https://github.com",
      lastUpdated: "2023-10-28",
    },
    {
      id: "3",
      title: "Netflix",
      username: "user@example.com",
      password: "netflixAndChill2023",
      website: "https://netflix.com",
      lastUpdated: "2023-09-05",
    },
  ])

  const togglePasswordVisibility = (id: string) => {
    if (visiblePasswordId === id) {
      setVisiblePasswordId(null)
    } else {
      setVisiblePasswordId(id)
    }
  }

  const deletePassword = (id: string) => {
    setPasswords(passwords.filter((password) => password.id !== id))
  }

  const filteredPasswords = passwords.filter(
    (password) =>
      password.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">Password Vault</h1>
          </div>
          <Button variant="outline" size="icon" className="text-gray-500">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Search and Add */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search passwords..."
                className="pl-10 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Password</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g., Gmail, Twitter" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username or Email</Label>
                    <Input id="username" placeholder="username@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input id="website" placeholder="https://example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Input id="notes" placeholder="Additional information" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Password</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Password List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {filteredPasswords.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No passwords found</p>
              </div>
            ) : (
              filteredPasswords.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{entry.title}</h3>
                        <p className="text-sm text-gray-500 truncate">{entry.username}</p>
                        <div className="mt-1 flex items-center">
                          <div className="flex-1 flex items-center">
                            <Input
                              type={visiblePasswordId === entry.id ? "text" : "password"}
                              value={entry.password}
                              readOnly
                              className="h-7 py-1 border-gray-200 bg-gray-50 text-sm"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2 h-7 w-7"
                              onClick={() => togglePasswordVisibility(entry.id)}
                            >
                              {visiblePasswordId === entry.id ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                              <span className="sr-only">
                                {visiblePasswordId === entry.id ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex items-center space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                  <Edit2 className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Password</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-title-${entry.id}`}>Title</Label>
                                    <Input id={`edit-title-${entry.id}`} defaultValue={entry.title} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-username-${entry.id}`}>Username or Email</Label>
                                    <Input id={`edit-username-${entry.id}`} defaultValue={entry.username} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-password-${entry.id}`}>Password</Label>
                                    <Input
                                      id={`edit-password-${entry.id}`}
                                      type="password"
                                      defaultValue={entry.password}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-website-${entry.id}`}>Website</Label>
                                    <Input id={`edit-website-${entry.id}`} defaultValue={entry.website} />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-red-500"
                              onClick={() => deletePassword(entry.id)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-between">
                      <span>Last updated: {entry.lastUpdated}</span>
                      {entry.website && (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit website
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-gray-600">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Security Settings
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Lock className="h-4 w-4 mr-2 text-blue-600" />
              Encryption Options
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              Secure & Encrypted
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
