import { ModeToggle } from '../theme/mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { AvatarMenu } from './AvatarDropdown'
import WhatsappAction from './WhatsappAction'

export function AppHeader() {
  return (
    <div>
      <header className="flex w-full bg-amber-400  justify-between h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="font-extrabold lg:text-2xl md:text-2xl text-fuchsia-700 ">Jobflow AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:block">
            <WhatsappAction />
          </div>
          <AvatarMenu />
        </div>
      </header>
    </div>
  )
}
