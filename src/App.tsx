import AuthProvider from './pages/auth/AuthLogin'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}
