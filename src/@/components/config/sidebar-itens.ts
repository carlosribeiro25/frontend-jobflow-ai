import HomeFilledIcon from '@mui/icons-material/HomeFilled'
import EngineeringIcon from '@mui/icons-material/Engineering'
import SettingsIcon from '@mui/icons-material/Settings'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import WorkIcon from '@mui/icons-material/Work'

export const sidebarItens = [
  {
    title: 'Home',
    path: '/',
    icon: HomeFilledIcon,
  },
  {
    title: 'Vagas',
    path: '/PageVagas',
    icon: WorkIcon,
  },
  {
    title: 'Buscar por filtro',
    path: '/filtros',
    icon: EngineeringIcon,
  },
  {
    title: 'Configurações',
    path: '/settings',
    icon: SettingsIcon,
  },
  {
    title: 'Conectar com o Whatsapp',
    path: '/conectWhatsapp',
    icon: WhatsAppIcon,
  },
]
