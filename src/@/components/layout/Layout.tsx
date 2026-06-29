import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import { AppHeader } from './Header'
import AppSidebar from './Sidebar'

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
