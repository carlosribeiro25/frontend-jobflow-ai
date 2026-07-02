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
} from '@/@/components/ui/sidebar'
import { sidebarItens } from '../config/sidebar-itens'
import { useAuth } from '@/modules/auth/context/auth-context'

export default function AppSidebar() {
  const { user } = useAuth()
  const userData = user?.userData

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex gap-2 items-center ml-2 tracking-widest">
            <span className="font-semibold text-base text-fuchsia-700">Jobflow </span>
            <p> de {userData?.name} </p>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarSeparator />
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
