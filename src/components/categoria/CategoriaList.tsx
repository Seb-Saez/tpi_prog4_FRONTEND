import type { Categoria } from "../../types/categoria"

type CategoriaListProps = {
  categorias: Categoria[]
  onEdit: (categoria: Categoria) => void
  onDelete: (id: number) => void
}

const CategoriaList = ({ categorias, onEdit, onDelete }: CategoriaListProps) => {
  return (
    <div className="max-w-5xl mx-auto mt-6 bg-zinc-900 rounded-xl shadow-md overflow-hidden">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-6 text-zinc-500">
                No hay categorías
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr
                key={cat.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="px-4 py-3 font-medium text-zinc-100">
                  {cat.nombre}
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {cat.descripcion || "-"}
                </td>

                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(cat)}
                    className="px-3 py-1 text-xs rounded-md bg-indigo-400/20 text-indigo-300 hover:bg-indigo-400/30 transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(cat.id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-400/20 text-red-300 hover:bg-red-400/30 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriaList