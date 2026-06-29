import Dashboard from '@/pages/Dashboard'
import { ForgotPassword } from '@/pages/auth/Forgot-password'
import HomePage from '@/pages/Home'
import Login from '@/pages/auth/Login'
import { ResetPassword } from '@/pages/auth/Reset-password'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoutes'
import { RegisterUser } from '@/pages/auth/Register'
import { WhatsappConnect } from '@/@/components/layout/WhatsappConnect'
import SettingsApp from '@/pages/settings/Settings'
import { ListVagas } from '@/@/components/Vagas/ListVagas'
import AppLayout from '@/@/components/layout/Layout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/CadastroUsuario" element={<RegisterUser />} />
      <Route path="/esquecer-senha" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vagas" element={<ListVagas />} />
          <Route path="/settings" element={<SettingsApp />} />
          <Route path="/conectWhatsapp" element={<WhatsappConnect />} />
        </Route>
      </Route>
    </Routes>
  )
}
