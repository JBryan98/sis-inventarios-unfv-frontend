import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';import HomeIcon from '@mui/icons-material/Home';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HandymanIcon from '@mui/icons-material/Handyman';
import RoomIcon from '@mui/icons-material/Room';
import GridViewIcon from '@mui/icons-material/GridView';

export const sidebarLinks = [
  {
    href: "/",
    label: "Inicio",
    icon: <HomeIcon />,
  },
  {
    href: "/componentes",
    label: "Componentes",
    icon: <BrowserUpdatedIcon />,
  },
  {
    href: "/categorias",
    label: "Categorias",
    icon: <GridViewIcon />,
  },
  {
    href: "/marcas",
    label: "Marcas",
    icon: <TurnedInIcon />,
  },
  {
    href: "/facultades",
    label: "Facultades",
    icon: <ApartmentIcon />,
  },
  {
    href: "/label",
    label: "Escuelas",
    icon: <SchoolIcon />,
  },
  {
    href: "/mantenimiento",
    label: "Mantenimientos",
    icon: <HandymanIcon/>
  },
  {
    href: "/ubicaciones",
    label: "Ubicaciones",
    icon: <RoomIcon/>
  }
];