import { EstadoCount } from '@/interface/Dashboard.interface';
import DevicesIcon from '@mui/icons-material/Devices';

export interface CardInfo {
    title: string;
    subtitle: string | number;
    icon: JSX.Element;
    cardBackgroundColor: string;
    iconBackgroundColor: string;
}

export const cardData = (estado: EstadoCount): CardInfo[] => {
    return [
      {
        title: "En stock",
        subtitle: estado.stock,
        icon: <DevicesIcon fontSize="large" />,
        cardBackgroundColor: "#4caf50",
        iconBackgroundColor: "#2e7d32",
      },
      {
        title: "Operativos",
        subtitle: estado.operativo,
        icon: <DevicesIcon fontSize="large" />,
        cardBackgroundColor: "#42a5f5",
        iconBackgroundColor: "#1976d2",
      },
      {
        title: "Dados de baja",
        subtitle: estado.baja,
        icon: <DevicesIcon fontSize="large" />,
        cardBackgroundColor: "#ef5350",
        iconBackgroundColor: "#d32f2f",
      },
  
      {
        title: "En mantenimiento",
        subtitle: estado.mantenimiento,
        icon: <DevicesIcon fontSize="large" />,
        cardBackgroundColor: "#ff9800",
        iconBackgroundColor: "#ed6c02",
      },
    ];
  };