import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import AppSidebar from "./Sidebar";
import { AppHeader } from "./Header";


export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main className="flex-1">
                    conteudo
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}