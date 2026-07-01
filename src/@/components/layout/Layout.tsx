import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import { AppHeader } from './Header'
import AppSidebar from './Sidebar'
import { useState } from 'react'
import { useDebounce } from '@/modules/auth/hooks/use-debounce'
import { useQueryClient } from '@tanstack/react-query'

export default function AppLayout() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const queryClient = useQueryClient()

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ['vagas', 'search'] })
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader search={search} onSearchChange={setSearch} onSearch={handleSearch} />

        <main className="flex-1 p-6">
          <Outlet context={{ search: debouncedSearch }} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
