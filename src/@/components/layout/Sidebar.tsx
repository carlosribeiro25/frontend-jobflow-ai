import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/@/components/ui/sidebar"

export default function AppSidebar() {

    return (
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    
                    <SidebarMenu>
                        <SidebarMenuItem>
                           <SidebarMenuButton>
                           
                            </SidebarMenuButton> 
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            
                        </SidebarGroupLabel>


                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    
                </SidebarFooter>
            </Sidebar>

    )
}