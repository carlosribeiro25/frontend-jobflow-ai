import { NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from '@/@/components/ui/sidebar'
import { sidebarItens } from '../config/sidebar-itens'
import { useAuth } from '@/modules/auth/context/auth-context'
import { Button } from '../ui/button'
import { useSidebar } from '@/modules/auth/hooks/use-sidebar'

export default function AppSidebar() {
  const { user } = useAuth()
  const userData = user?.userData
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex gap-2 justify-between items-center ml-1 tracking-widest">
            <div className="hidden md:block">
              <SidebarTrigger />
            </div>
            <span className="font-semibold md:text-sm text-green-400">Jobflow</span>
            <span className="md:text-sm mr-4">de {userData?.name} </span>
            <div className="md:hidden">
              <Button variant="secondary" onClick={() => setOpenMobile(false)}>
                X
              </Button>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarSeparator />
            {sidebarItens.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
