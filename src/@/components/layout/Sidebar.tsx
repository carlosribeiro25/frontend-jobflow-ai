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
  SidebarMenuItem,
} from '@/@/components/ui/sidebar'
import HomeFilledIcon from '@mui/icons-material/HomeFilled'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarSeparator />

            <SidebarMenuButton>
              <HomeFilledIcon />
              Dashboard
            </SidebarMenuButton>

            <SidebarSeparator />

            <SidebarMenuButton>
              <HomeFilledIcon />
              Dashboard
            </SidebarMenuButton>
            <SidebarMenuButton>
              <HomeFilledIcon />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
