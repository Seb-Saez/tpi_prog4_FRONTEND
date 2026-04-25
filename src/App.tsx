import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"

import CategoriasPage from "./pages/CategoriasPage"
import ProductsPage from "./pages/ProductPage"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/categorias" />} />

          <Route
            path="/categorias"
            element={<CategoriasPage />}
          />

          <Route
            path="/productos"
            element={<ProductsPage />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App