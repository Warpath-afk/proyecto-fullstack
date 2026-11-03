import { useEffect, useState, type FormEvent } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'

export interface Pastel {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  stock: number
}

interface PastelForm {
  nombre: string
  descripcion: string
  precio: string
  categoria: string
  stock: string
}

interface ErrorApi extends Error {
  status?: number
}

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const queryClient = new QueryClient()
const vacio: PastelForm = { nombre: '', descripcion: '', precio: '', categoria: '', stock: '' }
const columnas = ['Nombre', 'Descripción', 'Precio', 'Categoría', 'Stock', 'Acciones']

const pedir = async (ruta: string, token: string, opciones: RequestInit = {}) => {
  const res = await fetch(`${API}${ruta}`, {
    ...opciones,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error: ErrorApi = new Error(data.mensaje ?? 'Error en la petición')
    error.status = res.status
    throw error
  }
  return data
}

const TablaPasteles = () => {
  const { usuario, logout } = useAuth()
  const token = usuario?.token ?? ''
  const qc = useQueryClient()

  const [form, setForm] = useState<PastelForm>(vacio)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState('')

  const { data: pasteles = [], isLoading, isError, error } = useQuery<Pastel[], ErrorApi>({
    queryKey: ['pasteles', usuario?._id],
    queryFn: () => pedir('/api/pasteles', token),
    enabled: !!token,
    retry: false,
  })

  // Si el token venció o es inválido, se cierra la sesión
  useEffect(() => {
    if (isError && error?.status === 401) logout()
  }, [isError, error, logout])

  const refrescar = () => qc.invalidateQueries({ queryKey: ['pasteles'] })

  const datosParaEnviar = () => ({
    nombre: form.nombre.trim(),
    descripcion: form.descripcion.trim(),
    categoria: form.categoria.trim(),
    precio: Number(form.precio),
    stock: Number(form.stock),
  })

  const mutCrear = useMutation({
    mutationFn: () => pedir('/api/pasteles', token, { method: 'POST', body: JSON.stringify(datosParaEnviar()) }),
    onSuccess: () => {
      refrescar()
      setForm(vacio)
      setMensaje('Pastel creado correctamente')
    },
    onError: (e: Error) => setMensaje(e.message),
  })

  const mutActualizar = useMutation({
    mutationFn: (id: string) =>
      pedir(`/api/pasteles/${id}`, token, { method: 'PUT', body: JSON.stringify(datosParaEnviar()) }),
    onSuccess: () => {
      refrescar()
      setForm(vacio)
      setEditandoId(null)
      setMensaje('Pastel actualizado correctamente')
    },
    onError: (e: Error) => setMensaje(e.message),
  })

  const mutEliminar = useMutation({
    mutationFn: (id: string) => pedir(`/api/pasteles/${id}`, token, { method: 'DELETE' }),
    onSuccess: () => {
      refrescar()
      setMensaje('Pastel eliminado correctamente')
    },
    onError: (e: Error) => setMensaje(e.message),
  })

  const validar = (): string | null => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio'
    if (!form.descripcion.trim()) return 'La descripción es obligatoria'
    if (!form.categoria.trim()) return 'La categoría es obligatoria'
    if (form.precio === '' || Number(form.precio) <= 0) return 'El precio debe ser mayor a 0'
    if (form.stock === '' || Number(form.stock) < 0) return 'El stock no puede ser negativo'
    return null
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const problema = validar()
    if (problema) {
      setMensaje(problema)
      return
    }
    if (editandoId) mutActualizar.mutate(editandoId)
    else mutCrear.mutate()
  }

  const handleEditar = (p: Pastel) => {
    setEditandoId(p._id)
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: String(p.precio),
      categoria: p.categoria,
      stock: String(p.stock),
    })
    setMensaje('')
  }

  const handleCancelar = () => {
    setEditandoId(null)
    setForm(vacio)
    setMensaje('')
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Seguro que quieres eliminar este pastel?')) mutEliminar.mutate(id)
  }

  const campo = 'bg-neutral-900 px-3 py-2 text-sm outline-none border border-neutral-700 focus:border-amber-500'

  return (
    <section id="menu" className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl font-bold">Nuestra carta</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm font-light text-gray-300">
          Tus productos, guardados en MongoDB.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-4 border border-neutral-700 p-6 md:grid-cols-3">
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={campo}
          />
          <input
            type="text"
            placeholder="Categoría"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className={campo}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className={campo}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className={`${campo} md:col-span-2`}
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={campo}
          />

          <div className="flex gap-3 md:col-span-3">
            <button
              type="submit"
              disabled={mutCrear.isPending || mutActualizar.isPending}
              className="bg-amber-500 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-black transition hover:brightness-95 disabled:opacity-50"
            >
              {editandoId ? 'Guardar cambios' : 'Agregar pastel'}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={handleCancelar}
                className="border border-neutral-600 px-6 py-2 text-sm uppercase tracking-widest transition hover:bg-neutral-800"
              >
                Cancelar
              </button>
            )}
          </div>

          {mensaje && <p className="text-sm text-amber-400 md:col-span-3">{mensaje}</p>}
        </form>

        {isLoading && <p className="mt-16 text-center text-gray-400">Cargando carta...</p>}

        {isError && (
          <p className="mt-16 text-center text-red-400">
            {error?.status === 401
              ? 'Tu sesión venció. Inicia sesión de nuevo.'
              : 'No se pudo cargar la carta. ¿Está encendido el backend?'}
          </p>
        )}

        {!isLoading && !isError && pasteles.length === 0 && (
          <p className="mt-16 text-center text-amber-400">Aún no tienes pasteles. Agrega el primero arriba.</p>
        )}

        {!isLoading && !isError && pasteles.length > 0 && (
          <>
            <div className="mt-12 overflow-x-auto border border-neutral-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-800 text-xs uppercase tracking-widest text-gray-300">
                  <tr>
                    {columnas.map((c) => (
                      <th key={c} className="px-4 py-3 font-semibold">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pasteles.map((p) => (
                    <tr key={p._id} className="border-t border-neutral-800 hover:bg-neutral-900">
                      <td className="px-4 py-3 font-medium">{p.nombre}</td>
                      <td className="px-4 py-3 text-gray-300">{p.descripcion}</td>
                      <td className="whitespace-nowrap px-4 py-3">S/ {p.precio.toFixed(2)}</td>
                      <td className="px-4 py-3">{p.categoria}</td>
                      <td className="px-4 py-3 text-right">{p.stock}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button onClick={() => handleEditar(p)} className="text-amber-400 hover:underline">
                            Editar
                          </button>
                          <button onClick={() => handleEliminar(p._id)} className="text-red-400 hover:underline">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-gray-500">{pasteles.length} registros</p>
          </>
        )}
      </div>
    </section>
  )
}

const Menu = () => (
  <QueryClientProvider client={queryClient}>
    <TablaPasteles />
  </QueryClientProvider>
)

export default Menu