import { Chip } from '@mui/material'
import React from 'react'

interface Props {
    label: string;
}

const EstadoChip = ({ label }: Props) => {
  const chipColorHandler = (value: string) => {
    switch (value) {
      case "Stock":
        return "success";
      case "Operativo":
        return "primary";
      case "Mantenimiento":
        return "warning";
      case "Baja":
        return "error";
      default:
        return "default"  
    }
  };
  
  return (
    <Chip
      label={label}
      sx={{ marginLeft: "-8px" }}
      size="small"
      color={chipColorHandler(label)}
    />
  );
};

export default EstadoChip