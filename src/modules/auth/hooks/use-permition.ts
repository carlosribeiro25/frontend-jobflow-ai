import { useAuth } from '../context/auth-context'

export function usePermissions() {
  const { user } = useAuth()

  const isManager = user?.userData.role === 'manager'

  const role = user?.userData.role

  return {
    isManager,
    role,
  }
}
