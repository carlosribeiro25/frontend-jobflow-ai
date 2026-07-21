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
import TuneIcon from '@mui/icons-material/Tune'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AvatarMenu } from './AvatarDropdown'
import { FilterFormField } from '../Vagas/FilterFormFields'
import { useFilterContext } from '@/modules/auth/context/filter-context-base'
import { useLocation } from 'react-router-dom'

type AppHeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  onSearch: (value: string) => void
}

export function AppHeader({ search, onSearchChange, onSearch }: AppHeaderProps) {
  const { isSheetOpen, setIsSheetOpen } = useFilterContext()
  const location = useLocation()
  const isFiltersPage = location.pathname === '/vagas-filtros'

  return (
    <div>
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

        <div className="flex justify-between items-center gap-2 ">
          {/* Botão de filtros — visível apenas no mobile e na página de filtros */}
          {isFiltersPage && (
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button type="button" aria-label="Abrir filtros">
                    <TuneIcon />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="overflow-y-auto justify-center mt-10  w-80 m-8 rounded-xl"
                >
                  <SheetHeader>
                    <SheetTitle className="font-semibold ">Aplicar filtros</SheetTitle>
                    <VisuallyHidden>
                      <SheetDescription>Formulário de filtros de vagas</SheetDescription>
                    </VisuallyHidden>
                  </SheetHeader>
                  <div className="p-2">
                    <FilterFormField />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

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
