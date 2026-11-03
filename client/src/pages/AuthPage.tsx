import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type Usuario } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const AuthPage = ({ modo }: { modo: 'login' | 'registro' }) => {
  const esRegistro = modo === 'registro'
  const navigate = useNavigate()
  const { login } = useAuth()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const validar = (): string | null => {
    if (esRegistro && !nombre.trim()) return 'El nombre es obligatorio'
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Ingresa un correo válido'
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const mensaje = validar()
    if (mensaje) {
      setError(mensaje)
      return
    }

    setError('')
    setCargando(true)
    try {
      const res = await fetch(`${API}/api/auth/${modo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(esRegistro ? { nombre, email, password } : { email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.mensaje ?? 'Error inesperado')

      login(data as Usuario)
      navigate('/menu')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  const campo =
    'w-full bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm text-white outline-none focus:border-amber-500'

  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <h2 className="text-center font-serif text-4xl font-bold">
          {esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
          {esRegistro && (
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={campo}
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={campo}
          />
          <input
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={campo}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:brightness-95 disabled:opacity-50"
          >
            {cargando ? 'Enviando...' : esRegistro ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          {esRegistro ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <Link to={esRegistro ? '/login' : '/registro'} className="text-amber-400 hover:underline">
            {esRegistro ? 'Inicia sesión' : 'Regístrate'}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthPage