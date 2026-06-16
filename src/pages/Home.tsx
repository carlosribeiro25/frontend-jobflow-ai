import AppSidebar from "@/@/components/layout/Sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/@/components/ui/sidebar";

export default function HomePage() {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 items-center border-b px-4">
                    <SidebarTrigger/>
                </header>

                <main className="p-6">
                    <h1>Pagina principal</h1>
                </main>
            </SidebarInset>
        </SidebarProvider>
        
    )
}