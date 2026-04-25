import { useEffect, useState } from "react"
import type { Categoria } from "../../types"

type CategoriaModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Categoria, "id">, id?: number) => void
  categoria?: Categoria | null
}

const CategoriaModal = ({
  isOpen,
  onClose,
  onSubmit,
  categoria
}: CategoriaModalProps) => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagenUrl, setImagenUrl] = useState("")
  const [parentId, setParentId] = useState("")

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre)
      setDescripcion(categoria.descripcion || "")
      setImagenUrl(categoria.imagen_url || "")
      setParentId(categoria.parent_id ? String(categoria.parent_id) : "")
    } else {
      setNombre("")
      setDescripcion("")
      setImagenUrl("")
      setParentId("")
    }
  }, [categoria, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit(
      {
        nombre,
        descripcion,
        imagen_url: imagenUrl || undefined,
        parent_id: parentId ? Number(parentId) : null
      },
      categoria?.id
    )
  }

  return (
    <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-[#F8F4EE] shadow-2xl">

        {/* Header */}
        <div className="border-b border-stone-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-stone-800">
            {categoria ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Completá los datos de la categoría
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-stone-700">
              Nombre *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
              placeholder="Ej: Pizzas"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-stone-700">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition resize-none"
              placeholder="Breve descripción de la categoría"
            />
          </div>

          {/* Imagen URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-stone-700">
              URL de imagen
            </label>
            <input
              type="text"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
              placeholder="https://..."
            />
          </div>

          {/* Parent ID */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-stone-700">
              ID categoría padre (opcional)
            </label>
            <input
              type="number"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              min="1"
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
              placeholder="Ej: 1"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriaModal