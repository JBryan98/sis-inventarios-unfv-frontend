import { Button } from "@mui/material";
import KeyboardReturnSharpIcon from "@mui/icons-material/KeyboardReturnSharp";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
    href: string;
}

const BotonVolver = ({href}: Props) => {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      sx={{ background: "#1f2937", "&:hover": { background: "#4b5563" } }}
      startIcon={<KeyboardReturnSharpIcon />}
      onClick={() => router.push(href)}
    >
      Volver
    </Button>
  );
};

export default BotonVolver;
