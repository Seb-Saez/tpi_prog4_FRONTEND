import type { Producto } from "../../types"

type ProductListProps = {
    productos: Producto[]
    onEdit: (producto: Producto) => void
    onDelete: (id: number) => void
}

const ProductList = ({
    productos,
    onEdit,
    onDelete
}: ProductListProps) => {
    return (
        <div className="rounded-2xl border border-[var(--color-brown-light)] bg-[var(--color-beige)] shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-[var(--color-beige-light)] border-b border-[var(--color-brown-light)]">
                    <tr>
                        <th className="px-8 py-5 text-left text-sm font-semibold text-[var(--color-brown)]">
                            Nombre
                        </th>

                        <th className="px-8 py-5 text-left text-sm font-semibold text-[var(--color-brown)]">
                            Precio
                        </th>

                        <th className="px-8 py-5 text-left text-sm font-semibold text-[var(--color-brown)]">
                            Stock
                        </th>

                        <th className="px-8 py-5 text-left text-sm font-semibold text-[var(--color-brown)]">
                            Disponible
                        </th>

                        <th className="px-8 py-5 text-right text-sm font-semibold text-[var(--color-brown)]">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="py-14 text-center text-sm text-[var(--color-brown)] opacity-70"
                            >
                                No hay productos registrados
                            </td>
                        </tr>
                    ) : (
                        productos.map((producto) => (
                            <tr
                                key={producto.id}
                                className="border-b border-[var(--color-brown-light)] last:border-b-0 hover:bg-[var(--color-beige-light)] transition"
                            >
                                <td className="px-8 py-6 text-sm font-medium text-[var(--color-brown)]">
                                    {producto.nombre}
                                </td>

                                <td className="px-8 py-6 text-sm text-[var(--color-brown)]">
                                    ${producto.precio_base}
                                </td>

                                <td className="px-8 py-6 text-sm text-[var(--color-brown)]">
                                    {producto.stock_cantidad}
                                </td>

                                <td className="px-8 py-6 text-sm text-[var(--color-brown)]">
                                    {producto.disponible ? "Sí" : "No"}
                                </td>

                                <td className="px-8 py-6">
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => onEdit(producto)}
                                            className="px-5 py-2.5 rounded-xl border border-[var(--color-brown-light)] bg-white text-sm font-medium text-[var(--color-brown)] hover:bg-[var(--color-beige-light)] transition"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => onDelete(producto.id)}
                                            className="px-5 py-2.5 rounded-xl bg-[var(--color-error-light)] text-sm font-medium text-[var(--color-brown)] hover:opacity-90 transition"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList