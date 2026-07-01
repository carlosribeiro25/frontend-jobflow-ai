import { NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/@/components/ui/sidebar'
import { sidebarItens } from '../config/sidebar-itens'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
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
