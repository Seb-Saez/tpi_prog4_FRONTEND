import { useEffect, useState } from "react"
import type { Producto, Categoria } from "../../types"

type ProductModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<Producto, "id">, id?: number) => void
    producto?: Producto | null
    categorias: Categoria[]
}

const ProductModal = ({
    isOpen,
    onClose,
    onSubmit,
    producto,
    categorias
}: ProductModalProps) => {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precioBase, setPrecioBase] = useState("")
    const [imagenUrl, setImagenUrl] = useState("")
    const [stockCantidad, setStockCantidad] = useState("")
    const [disponible, setDisponible] = useState(true)
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([])

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre)
            setDescripcion(producto.descripcion || "")
            setPrecioBase(String(producto.precio_base))
            setImagenUrl(producto.imagen_url || "")
            setStockCantidad(String(producto.stock_cantidad))
            setDisponible(producto.disponible)
            setCategoriasSeleccionadas(producto.categorias_ids || [])
        } else {
            setNombre("")
            setDescripcion("")
            setPrecioBase("")
            setImagenUrl("")
            setStockCantidad("")
            setDisponible(true)
            setCategoriasSeleccionadas([])
        }
    }, [producto, isOpen])

    if (!isOpen) return null

    const handleCategoriaToggle = (categoriaId: number) => {
        setCategoriasSeleccionadas((prev) =>
            prev.includes(categoriaId)
                ? prev.filter((id) => id !== categoriaId)
                : [...prev, categoriaId]
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit(
            {
                nombre,
                descripcion,
                precio_base: Number(precioBase),
                imagen_url: imagenUrl || undefined,
                stock_cantidad: Number(stockCantidad),
                disponible,
                categorias_ids: categoriasSeleccionadas
            },
            producto?.id
        )
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-[var(--color-brown-light)] bg-[var(--color-beige-light)] shadow-xl">

                {/* Header */}
                <div className="border-b border-[var(--color-brown-light)] px-6 py-5">
                    <h2 className="text-xl font-semibold text-[var(--color-brown)]">
                        {producto ? "Editar producto" : "Nuevo producto"}
                    </h2>
                    <p className="text-sm text-[var(--color-brown)] opacity-70 mt-1">
                        Completá los datos del producto
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-brown)]">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            placeholder="Ej: Pizza Napolitana"
                            className="w-full rounded-xl border border-[var(--color-brown-light)] bg-white px-4 py-3 text-[var(--color-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-brown)]">
                            Descripción
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={3}
                            placeholder="Descripción del producto"
                            className="w-full rounded-xl border border-[var(--color-brown-light)] bg-white px-4 py-3 text-[var(--color-brown)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                        />
                    </div>

                    {/* Precio + Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[var(--color-brown)]">
                                Precio base *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={precioBase}
                                onChange={(e) => setPrecioBase(e.target.value)}
                                required
                                placeholder="0.00"
                                className="w-full rounded-xl border border-[var(--color-brown-light)] bg-white px-4 py-3 text-[var(--color-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[var(--color-brown)]">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={stockCantidad}
                                onChange={(e) => setStockCantidad(e.target.value)}
                                placeholder="0"
                                className="w-full rounded-xl border border-[var(--color-brown-light)] bg-white px-4 py-3 text-[var(--color-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                            />
                        </div>
                    </div>

                    {/* Imagen URL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-brown)]">
                            URL de imagen
                        </label>
                        <input
                            type="text"
                            value={imagenUrl}
                            onChange={(e) => setImagenUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-[var(--color-brown-light)] bg-white px-4 py-3 text-[var(--color-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                        />
                    </div>

                    {/* Disponible */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <label className="text-sm font-medium text-[var(--color-brown)]">
                            Producto disponible
                        </label>
                    </div>

                    {/* Categorías */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-[var(--color-brown)]">
                            Categorías
                        </label>

                        <div className="grid grid-cols-2 gap-3 max-h-52 overflow-y-auto rounded-xl border border-[var(--color-brown-light)] bg-white p-4">
                            {categorias.length === 0 ? (
                                <p className="text-sm text-[var(--color-brown)] opacity-70">
                                    No hay categorías disponibles
                                </p>
                            ) : (
                                categorias.map((categoria) => (
                                    <label
                                        key={categoria.id}
                                        className="flex items-center gap-3 text-sm text-[var(--color-brown)]"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={categoriasSeleccionadas.includes(categoria.id)}
                                            onChange={() => handleCategoriaToggle(categoria.id)}
                                        />
                                        {categoria.nombre}
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-brown-light)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-[var(--color-brown-light)] bg-white text-sm font-medium text-[var(--color-brown)] hover:bg-[var(--color-beige)] transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-[var(--color-green)] text-sm font-medium text-[var(--color-brown)] hover:opacity-90 transition"
                        >
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProductModal