import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuth } from "@/modules/auth/context/auth-context"

export function AvatarMenu() {
    const { user, logout } = useAuth();
    const userData = user?.userData;

    const initials = [userData?.name?.[0], userData?.email?.[0]]
        .filter(Boolean)
        .join("")
        .toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src={userData?.picture ?? ""} alt={userData?.name ?? "Avatar"} />
                        <AvatarFallback>{initials || "?"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-3">
                <DropdownMenuLabel className="flex flex-col gap-0.5 ">
                    <span className="font-semibold">{userData?.name ?? "Usuário"}</span>
                    <span className="text-xs text-muted-foreground font-normal">{userData?.email ?? ""}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}