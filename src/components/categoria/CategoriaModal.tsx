import { useEffect, useState } from "react";
import type { Categoria } from "../../types/categoria";


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

  // si estamos editando cargamos los datos
  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre)
      setDescripcion(categoria.descripcion || "")
    } else {
      setNombre("")
      setDescripcion("")
    }
  }, [categoria, isOpen])

  // evitamos que renderice si esta cerrado
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  onSubmit(
    {
      nombre,
      descripcion
    },
    categoria?.id
  )
}

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-lg border border-zinc-700">
        
        <h2 className="text-lg font-semibold text-indigo-300 mb-4">
          {categoria ? "Editar Categoría" : "Nueva Categoría"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm rounded-md text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-1 text-sm rounded-md bg-indigo-400/20 text-indigo-300 hover:bg-indigo-400/30"
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
