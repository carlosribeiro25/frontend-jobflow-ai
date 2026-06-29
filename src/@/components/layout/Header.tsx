import { SidebarTrigger } from '../ui/sidebar'
import { AvatarMenu } from './AvatarDropdown'
import WhatsappAction from './WhatsappAction'

export function AppHeader() {
  return (
    <div>
      <header className="flex  justify-between h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="font-extrabold lg:text-2xl md:text-2xl text-fuchsia-700 ">Jobflow AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <WhatsappAction />
          <AvatarMenu />
        </div>
      </header>
    </div>
  )
}
