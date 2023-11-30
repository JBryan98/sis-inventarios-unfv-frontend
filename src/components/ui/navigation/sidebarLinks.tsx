import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import HomeIcon from "@mui/icons-material/Home";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import SchoolIcon from "@mui/icons-material/School";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HandymanIcon from "@mui/icons-material/Handyman";
import RoomIcon from "@mui/icons-material/Room";
import GridViewIcon from "@mui/icons-material/GridView";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AirplayIcon from '@mui/icons-material/Airplay';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';

export const sidebarLinks = [
  {
    href: "/",
    label: "Inicio",
    icon: <HomeIcon />,
  },
  {
    href: "/categorias",
    label: "Categorias",
    icon: <CategoryIcon />,
  },
  {
    href: "/subcategorias",
    label: "Subcategorias",
    icon: <WidgetsIcon />
  },
  {
    href: "/marcas",
    label: "Marcas",
    icon: <TurnedInIcon />,
  },
  {
    href: "/modelos",
    label: "Modelos",
    icon: <GridViewIcon />,
  },
  {
    href: "equipos-de-trabajo",
    label: "Equipos de Trabajo",
    icon: <WorkIcon/>
  },
  {
    href: "/hardware",
    label: "Hardware",
    icon: <BrowserUpdatedIcon />,
  },
  {
    href: "/equipos",
    label: "Equipos",
    icon: <AirplayIcon />,
  },
  {
    href: "/facultades",
    label: "Facultades",
    icon: <ApartmentIcon />,
  },
  {
    href: "/escuelas",
    label: "Escuelas",
    icon: <SchoolIcon />,
  },
  {
    href: "/mantenimiento",
    label: "Mantenimientos",
    icon: <HandymanIcon />,
  },
  {
    href: "/ubicaciones",
    label: "Ubicaciones",
    icon: <RoomIcon />,
  },
];
