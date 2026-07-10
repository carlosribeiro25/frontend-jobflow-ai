import HomeFilledIcon from '@mui/icons-material/HomeFilled'
import FilterListAltIcon from '@mui/icons-material/FilterListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

export const sidebarItens = [
  {
    title: 'Home',
    path: '/',
    icon: HomeFilledIcon,
  },
  {
    title: 'Upload Vagas',
    path: '/cadastrar-vagas',
    icon: UnarchiveIcon,
  },
  {
    title: 'Buscar por filtros',
    path: '/filtros',
    icon: FilterListAltIcon,
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
