import { Authority } from "@/auth/interfaces/Authority.interface";
import { Chip } from "@mui/material";
import React from "react";

interface Props {
  label: Authority;
}

const RolChip = ({ label }: Props) => {
  const rolChipColorHandler = (value: Authority) => {
    switch (value) {
      case "ADMIN":
        return "primary";
      case "USER":
        return "secondary";
      default:
        return "default";
    }
  };
  
  return (
    <Chip
      label={label}
      sx={{ marginLeft: "-8px" }}
      size="small"
      color={rolChipColorHandler(label)}
    />
  );
};

export default RolChip;
