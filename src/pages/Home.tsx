import { AvatarMenu } from "@/@/components/layout/AvatarDropdown";
import AppSidebar from "@/@/components/layout/Sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/@/components/ui/sidebar";


export default function HomePage() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            
            <SidebarInset>
                <header className="flex justify-between bg-amber-600 h-16 items-center border-b px-4">
                    <SidebarTrigger/>
                    <AvatarMenu/>
                </header>

                <main className="p-6">
                    <h1>Pagina principal</h1>
                </main>
            </SidebarInset>
        </SidebarProvider>
        
    )
}