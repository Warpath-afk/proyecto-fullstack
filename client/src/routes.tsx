import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import ContactoPage from './pages/ContactoPage'
import AuthPage from './pages/AuthPage'
import RutaProtegida from './components/RutaProtegida'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contacto', element: <ContactoPage /> },
      { path: 'login', element: <AuthPage modo="login" /> },
      { path: 'registro', element: <AuthPage modo="registro" /> },
      {
        element: <RutaProtegida />,
        children: [{ path: 'menu', element: <MenuPage /> }],
      },
    ],
  },
])