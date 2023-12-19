import { Alert, Paper } from "@mui/material";
import React from "react";

const ErrorFilter = () => {
  return (
    <Paper sx={{ padding: "16px" }}>
      <Alert severity="error">
        Error al cargar los filtros, comuniquese con el administrador
      </Alert>
    </Paper>
  );
};

export default ErrorFilter;
