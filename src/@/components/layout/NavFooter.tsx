import { NavLink } from 'react-router-dom'
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';

export function NavMobileFooter() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/90 backdrop-blur shadow-md pb-[env(safe-area-insert-botton)]">
            <div className="grid grid-cols-4 h-15 mt-2 ">
                <NavLink to="/" className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"}>
                    <div className="flex flex-col gap-1 justify-center  items-center text-sm font-medium">
                        <HomeFilledIcon className='' />
                        <span>Inicio</span>
                    </div>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"}>
                    <div className="flex flex-col gap-1 justify-center  items-center text-sm font-medium">
                        <SettingsSuggestIcon />
                        <span>Configurações</span>
                    </div>
                </NavLink>

                <NavLink to="/filtros" className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"}>
                    <div className="flex flex-col gap-1 justify-center  items-center text-sm font-medium">
                        <FilterListAltIcon />
                        <span >Filtros</span>
                    </div>
                </NavLink>
                <NavLink to="/conectWhatsapp" className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"}>
                    <div className="flex flex-col gap-1 justify-center  items-center text-sm font-medium">
                        <WhatsAppIcon />
                        <span>WhatsApp</span>
                    </div>
                </NavLink>
            </div>
        </nav>
    )
}

