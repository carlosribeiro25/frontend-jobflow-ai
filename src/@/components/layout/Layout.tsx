import { Outlet, useLocation } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import { AppHeader } from './Header'
import AppSidebar from './Sidebar'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { NavMobileFooter } from './NavFooter'

export default function AppLayout() {
  const [inputValue, setInputValue] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const queryClient = useQueryClient()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') {
      const timer = window.setTimeout(() => {
        setInputValue('')
        setSubmittedSearch('')
      }, 0)

      return () => window.clearTimeout(timer)
    }
  }, [location.pathname])

  const handleSearch = () => {
    setSubmittedSearch(inputValue.trim())
    queryClient.invalidateQueries({ queryKey: ['vagas', 'search'] })
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader search={inputValue} onSearchChange={setInputValue} onSearch={handleSearch} />

        <main className="flex-1 p-6 ">
          <Outlet context={{ search: submittedSearch }} />
        </main>
        <div className="md:hidden">
          <NavMobileFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
