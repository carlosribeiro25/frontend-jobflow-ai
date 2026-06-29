import { ModeToggle } from '../theme/mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { SearchVagas } from '../Vagas/SearchVagas'
import { AvatarMenu } from './AvatarDropdown'

export function AppHeader() {
  return (
    <div>
      <header className="flex w-full justify-between h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="font-extrabold lg:text-2xl md:text-2xl text-fuchsia-700 ">Jobflow AI</h1>
        </div>

        <div className="flex justify-between  items-center gap-4">
            <SearchVagas/>
          <ModeToggle />
          <div className="hidden md:block">
            
          </div>
          <AvatarMenu />
        </div>
      </header>
    </div>
  )
}
