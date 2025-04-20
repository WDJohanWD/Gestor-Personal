import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"



function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-6 bg-background-main ">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
