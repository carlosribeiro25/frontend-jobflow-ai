import { ThemeProvider } from './@/components/theme/provider-theme'
import AuthProvider from './pages/auth/AuthLogin'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
