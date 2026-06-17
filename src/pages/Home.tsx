import { AvatarMenu } from "@/@/components/layout/AvatarDropdown";
import AppSidebar from "@/@/components/layout/Sidebar";
import WhatsappAction from "@/@/components/layout/WhatsappAction";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/@/components/ui/sidebar";

export default function HomePage() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                
                <header className="flex  justify-between h-16 items-center border-b px-4">
                     <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        
                    </div> 

                    <div className="flex justi items-center gap-4">
                        <WhatsappAction />
                        <AvatarMenu />
                    </div>

                </header>

                <main className="p-6">
                    <h1>Pagina principal</h1>
                </main>
            </SidebarInset>
        </SidebarProvider>

    )
}