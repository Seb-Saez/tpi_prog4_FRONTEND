import { useState } from "react"
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query"

import ProductList from "../components/producto/ProductList"
import ProductModal from "../components/producto/ProductModal"

import type { Producto } from "../types"

const API_URL = "http://127.0.0.1:8000"

const ProductsPage = () => {
    const queryClient = useQueryClient()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)

    /*
      GET productos
    */
    const { data: productos = [], isLoading } = useQuery({
        queryKey: ["productos"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/producto/`)

            if (!response.ok) {
                throw new Error("Error al obtener productos")
            }

            return response.json()
        }
    })

    /*
      GET categorias
      necesario para el multiselect
    */
    const { data: categorias = [] } = useQuery({
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
    const saveProductoMutation = useMutation({
        mutationFn: async ({
            data,
            id
        }: {
            data: Omit<Producto, "id">
            id?: number
        }) => {
            const url = id
                ? `${API_URL}/producto/${id}`
                : `${API_URL}/producto/`

            const method = id ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error("Error al guardar producto")
            }

            return response.json()
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["productos"]
            })

            setIsModalOpen(false)
            setSelectedProducto(null)
        }
    })

    /*
      DELETE
    */
    const deleteProductoMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${API_URL}/producto/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("Error al eliminar producto")
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["productos"]
            })
        }
    })

    const handleSubmit = (
        data: Omit<Producto, "id">,
        id?: number
    ) => {
        saveProductoMutation.mutate({ data, id })
    }

    const handleDelete = (id: number) => {
        deleteProductoMutation.mutate(id)
    }

    const handleEdit = (producto: Producto) => {
        setSelectedProducto(producto)
        setIsModalOpen(true)
    }

    const handleNew = () => {
        setSelectedProducto(null)
        setIsModalOpen(true)
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                Cargando productos...
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-[var(--color-brown)]">
                    Gestión de Productos
                </h1>

                <button
                    onClick={handleNew}
                    className="px-5 py-2.5 rounded-xl bg-[var(--color-green)] text-[var(--color-brown)] font-medium hover:opacity-90 transition"
                >
                    + Nuevo producto
                </button>
            </div>

            <ProductList
                productos={productos}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                producto={selectedProducto}
                categorias={categorias}
            />
        </div>
    )
}

export default ProductsPage