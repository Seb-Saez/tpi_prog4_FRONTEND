import './App.css'
import { Routes, Route, Navigate} from "react-router-dom"
import CategoriasPage from "./pages/CategoriasPages"

import Navbar from './components/Navbar'
import CategoriaList from "./components/categoria/CategoriaList"
import type { Categoria } from "./types/categoria"

function App() {
  return (
    <div className="bg-zinc-800 min-h-screen text-zinc-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/categorias" />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/productos" element={<div>Productos próximamente</div>} />
      </Routes>
    </div>
  )
}

export default App
