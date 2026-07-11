import { ModeToggle } from '../theme/mode-toggle'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { SidebarTrigger } from '../ui/sidebar'
import { SearchVagas } from '../Vagas/SearchVagas'

import SearchIcon from '@mui/icons-material/Search'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AvatarMenu } from './AvatarDropdown'

type AppHeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  onSearch: (value: string) => void
}

export function AppHeader({ search, onSearchChange, onSearch }: AppHeaderProps) {
  return (
    <div className="">
      <header className=" inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <h1 className="font-extrabold lg:text-2xl md:text-xl text-fuchsia-700 ">Jobflow AI</h1>
        </div>

        <div className="hidden md:block md:w-70 lg:w-xl">
          <SearchVagas value={search} onChange={onSearchChange} onSearch={onSearch} />
        </div>

        <div className="flex justify-between items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ">
                <SearchIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-6 ">
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle>Buscar Vagas</SheetTitle>
                  <SheetDescription>
                    Digite o nome da vaga para realizar a pesquisa
                  </SheetDescription>
                </SheetHeader>
              </VisuallyHidden>
              <SearchVagas value={search} onChange={onSearchChange} onSearch={onSearch} />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <ModeToggle />
          </div>
          <AvatarMenu />
        </div>
      </header>
    </div>
  )
}
