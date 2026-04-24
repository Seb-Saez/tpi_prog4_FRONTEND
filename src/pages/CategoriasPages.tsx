import { useEffect, useState } from "react"
import CategoriaList from "../components/categoria/CategoriaList"
import CategoriaModal from "../components/categoria/CategoriaModal"
import type { Categoria } from "../types/categoria"

const API_URL = "http://127.0.0.1:8000"

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)

  const fetchCategorias = async () => {
    const res = await fetch(`${API_URL}/categoria/`)
    const data = await res.json()
    setCategorias(data)
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const handleSubmit = async (data: Omit<Categoria, "id">, id?: number) => {
    if (id) {
      await fetch(`${API_URL}/categoria/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    } else {
      await fetch(`${API_URL}/categoria/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    }

    fetchCategorias()
    setIsModalOpen(false)
  }

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/categoria/${id}`, {
      method: "DELETE"
    })

    fetchCategorias()
  }

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedCategoria(null)
    setIsModalOpen(true)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-300">
          Categorías
        </h2>

        <button
          onClick={handleNew}
          className="px-4 py-1 rounded-md bg-indigo-400/20 text-indigo-300 hover:bg-indigo-400/30"
        >
          + Nueva
        </button>
      </div>

      <CategoriaList
        categorias={categorias}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoriaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        categoria={selectedCategoria}
      />
    </div>
  )
}

export default CategoriasPage