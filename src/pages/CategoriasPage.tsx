import { useState } from "react"
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query"

import CategoriaList from "../components/categoria/CategoriaList"
import CategoriaModal from "../components/categoria/CategoriaModal"
import type { Categoria } from "../types"

const API_URL = "http://127.0.0.1:8000"

const CategoriasPage = () => {
  const queryClient = useQueryClient()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)

  /*
    GET categorias
  */
  const { data: categorias = [], isLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/categoria/`)

      if (!response.ok) {
        throw new Error("Error al obtener categorías")
      }

      return response.json()
    }
  })

  /*
    CREATE + UPDATE
  */
  const saveCategoriaMutation = useMutation({
    mutationFn: async ({
      data,
      id
    }: {
      data: Omit<Categoria, "id">
      id?: number
    }) => {
      const url = id
        ? `${API_URL}/categoria/${id}`
        : `${API_URL}/categoria/`

      const method = id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Error al guardar categoría")
      }

      return response.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"]
      })

      setIsModalOpen(false)
      setSelectedCategoria(null)
    }
  })

  /*
    DELETE
  */
  const deleteCategoriaMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/categoria/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Error al eliminar categoría")
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"]
      })
    }
  })

  const handleSubmit = (
    data: Omit<Categoria, "id">,
    id?: number
  ) => {
    saveCategoriaMutation.mutate({ data, id })
  }

  const handleDelete = (id: number) => {
    deleteCategoriaMutation.mutate(id)
  }

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedCategoria(null)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-stone-600">
        Cargando categorías...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-stone-800">
          Gestión de Categorías
        </h1>

        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          + Nueva categoría
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