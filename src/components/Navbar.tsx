import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between">

        <h1 className="text-indigo-300 font-semibold">
          Mi App
        </h1>

        <div className="flex gap-4">
          <Link
            to="/categorias"
            className={`${
              location.pathname === "/categorias"
                ? "text-indigo-300"
                : "text-zinc-400"
            }`}
          >
            Categorías
          </Link>

          <Link
            to="/productos"
            className={`${
              location.pathname === "/productos"
                ? "text-indigo-300"
                : "text-zinc-400"
            }`}
          >
            Productos
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar