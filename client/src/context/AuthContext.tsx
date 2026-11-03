import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Usuario {
  _id: string
  nombre: string
  email: string
  token: string
}

interface AuthContextType {
  usuario: Usuario | null
  login: (u: Usuario) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const leerGuardado = (): Usuario | null => {
  try {
    const raw = localStorage.getItem('usuario')
    return raw ? (JSON.parse(raw) as Usuario) : null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(leerGuardado)

  const login = (u: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(u))
    setUsuario(u)
  }

  const logout = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return <AuthContext.Provider value={{ usuario, login, logout }}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}