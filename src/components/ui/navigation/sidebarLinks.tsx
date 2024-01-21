import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HandymanIcon from "@mui/icons-material/Handyman";
import RoomIcon from "@mui/icons-material/Room";
import GridViewIcon from "@mui/icons-material/GridView";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AirplayIcon from '@mui/icons-material/Airplay';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Authority } from "@/auth/interfaces/Authority.interface";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export interface SidebarLink {
  href?: string;
  label: string;
  icon: JSX.Element;
  roles: Authority[];
  children?: {
    href: string;
    label: string;
    icon: JSX.Element;
    roles: Authority[];
  }[],
}

export const sidebarLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    roles: ["ADMIN", "USER"],
    children: [
      {
        href: "/dashboard/hardware",
        label: "Hardware",
        icon: <DashboardCustomizeIcon />,
        roles: ["ADMIN", "USER"],
      },
      {
        href: "/dashboard/equipos",
        label: "Equipos",
        icon: <DashboardCustomizeIcon />,
        roles: ["ADMIN", "USER"],
      },
      {
        href: "/dashboard/equipos-de-trabajo",
        label: "Equipos de trabajo",
        icon: <DashboardCustomizeIcon />,
        roles: ["ADMIN", "USER"],
      }
    ]
  },
  {
    href: "/categorias",
    label: "Categorias",
    icon: <CategoryIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/subcategorias",
    label: "Subcategorias",
    icon: <WidgetsIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/marcas",
    label: "Marcas",
    icon: <TurnedInIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/modelos",
    label: "Modelos",
    icon: <GridViewIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/equipos-de-trabajo",
    label: "Equipos de Trabajo",
    icon: <WorkIcon/>,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/hardware",
    label: "Hardware",
    icon: <BrowserUpdatedIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/software",
    label: "Software",
    icon: <DisplaySettingsIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/equipos",
    label: "Equipos",
    icon: <AirplayIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/facultades",
    label: "Facultades",
    icon: <ApartmentIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/ubicaciones",
    label: "Ubicaciones",
    icon: <RoomIcon />,
    roles: ["ADMIN", "USER"]
  },
  {
    href: "/auth",
    label: "Autenticación",
    icon: <AdminPanelSettingsIcon />,
    roles: ["ADMIN"],
    children: [
      {
        href: "/auth/usuarios",
        label: "Usuarios",
        icon: <GroupIcon />,
        roles: ["ADMIN"],
      },
      {
        href: "/auth/roles",
        label: "Roles",
        icon: <VerifiedUserIcon />,
        roles: ["ADMIN"],
      }
    ]
  },
];

export const sidebarLinksHandler = (roles: Authority[]) => {
  return sidebarLinks.filter(link => {
    return link.roles.some(rol => roles.some(r => r == rol))
  })
}