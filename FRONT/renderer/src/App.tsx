import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";


const Task = lazy (() => import("./sections/Task"));
function Layout() {


  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 bg-background-main ">
        <Routes>
          <Route path="/" element={<Task />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}

export default App;
