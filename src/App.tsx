import AuthProvider from './pages/AuthLogin'
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
