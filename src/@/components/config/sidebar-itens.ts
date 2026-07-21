import HomeFilledIcon from '@mui/icons-material/HomeFilled'
import SettingsIcon from '@mui/icons-material/Settings'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

export const sidebarItens = [
  {
    title: 'Home',
    path: '/vagas-filtros',
    icon: HomeFilledIcon,
  },
  {
    title: 'Cadastro de Vagas',
    path: '/cadastrar-vagas',
    icon: UnarchiveIcon,
  },
  {
    title: 'Conectar com o Whatsapp',
    path: '/conectWhatsapp',
    icon: WhatsAppIcon,
  },
  {
    title: 'Configurações',
    path: '/settings',
    icon: SettingsIcon,
  },
]
