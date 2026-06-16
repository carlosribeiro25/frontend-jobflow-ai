import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import AppSidebar from "./Sidebar";

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                
                <main className="flex-1">
                    conteudo
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}