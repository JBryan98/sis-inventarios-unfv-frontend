import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div>
      <CircularProgress size={70} sx={{ margin: "auto" }} />
      <p>Cargando</p>
    </div>
  );
};

export default Spinner;
