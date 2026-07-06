import { NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader
} from '@/@/components/ui/sidebar'
import { sidebarItens } from '../config/sidebar-itens'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAuth } from '@/modules/auth/context/auth-context'
import { Button } from '../ui/button'
import { useSidebar } from '@/modules/auth/hooks/use-sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { cn } from '@/@/lib/utils';


export default function AppSidebar() {
  const { user } = useAuth()
  const userData = user?.userData
  const { setOpenMobile, open, setOpen, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarHeader>
          <div className="flex h-10 gap-2 justify-between items-center tracking-widest">
            <div className="hidden md:block">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {open ? (
                      <Button
                        variant='ghost'
                        size='icon'
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}>
                        <KeyboardDoubleArrowLeftIcon />
                      </Button>

                    ) : (
                      <div onClick={() => setOpen(true)}>
                        <KeyboardDoubleArrowRightIcon className='cursor-pointer' />
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    {open ? "Fechar Barra lateral" : "Abrir Barra lateral"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <span
              className={cn(
                'md:text-sm lg:mr-3.5 font-semibold text-green-400 whitespace-nowrap',
                'transition-all duration-200 ease-linear',
                open || isMobile
                  ? 'opacity-100 translate-x-0 delay-200'
                  : 'opacity-0 -translate-x-2 pointer-events-none delay-0'
              )}
            >
              Jobflow de {userData?.name}
            </span>

            <div className="md:hidden">
              <Button variant="secondary" onClick={() => setOpenMobile(false)}>
                X
              </Button>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu className="gap-3">
            <SidebarSeparator className="mx-0" />
            {sidebarItens.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <item.icon />
                    <span >{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
