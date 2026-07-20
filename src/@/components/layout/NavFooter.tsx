import { NavLink } from 'react-router-dom'
import { itensNavMobile } from '../config/footer-mobile'

export function NavMobileFooter() {
  return (
    <nav className="fixed  bottom-0 left-0 right-0 border-t bg-background/90 backdrop-blur shadow-md pb-[env(safe-area-insert-botton)] ">
      <div className="grid grid-cols-3 h-15 mt-2 ">
        {itensNavMobile.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              isActive ? 'text-emerald-400 font-semibold' : 'text-muted-foreground'
            }
          >
            <div className="flex flex-col gap-1 p-1  justify-center  items-center text-sm font-medium">
              <item.icon />
              <span>{item.label}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
