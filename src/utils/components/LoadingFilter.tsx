import { Alert, Paper } from '@mui/material'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info';

const LoadingFilter = () => {
  return (
    <Paper sx={{ padding: "16px" }}>
      <Alert
        severity="warning"
        iconMapping={{
          warning: <InfoIcon fontSize="inherit"/>,
        }}
      >
        Cargando filtros ...
      </Alert>
    </Paper>
  );
}

export default LoadingFilter