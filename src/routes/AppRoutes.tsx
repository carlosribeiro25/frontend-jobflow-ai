import Dashboard from '@/pages/Dashboard'
import { ForgotPassword } from '@/pages/Forgot-password'
import HomePage from '@/pages/Home'
import Login from '@/pages/Login'
import { ResetPassword } from '@/pages/Reset-password'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoutes'
import { RegisterUser } from '@/pages/Register'
import { WhatsappConnect } from '@/@/components/layout/WhatsappConnect'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/CadastroUsuario" element={<RegisterUser />} />
      <Route path="/esquecer-senha" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/conectWhatsapp"
        element={
          <PrivateRoute>
            <WhatsappConnect />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
