import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ oscuro = false }: { oscuro?: boolean }) => {
  const hover = oscuro ? 'hover:text-amber-400' : 'hover:text-amber-600'
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const salir = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={oscuro ? 'bg-black text-white' : 'bg-white text-black sticky top-0 z-50 shadow-sm'}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif italic">Dulce Aroma</Link>

        <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
          <li><Link to="/" className={`${hover} transition`}>Home</Link></li>
          <li><Link to="/menu" className={`${hover} transition`}>Menú</Link></li>
          <li><Link to="/contacto" className={`${hover} transition`}>Contacto</Link></li>
        </ul>

        <div className="flex items-center gap-5">
          {usuario ? (
            <>
              <span className="hidden md:inline text-sm">Hola, {usuario.nombre}</span>
              <button onClick={salir} className={`text-sm uppercase tracking-wide ${hover} transition`}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-sm uppercase tracking-wide ${hover} transition`}>Ingresar</Link>
              <Link to="/registro" className={`hidden md:inline text-sm uppercase tracking-wide ${hover} transition`}>Registrarse</Link>
            </>
          )}

          <button aria-label="Carrito" className={`relative ${hover} transition`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>

          <button aria-label="Menú" className={`md:hidden ${hover} transition`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar