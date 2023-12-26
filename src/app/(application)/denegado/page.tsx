import { Box, Container, Paper, Typography } from '@mui/material'
import GppBadIcon from '@mui/icons-material/GppBad';
import React from 'react'

const AccessDeniedPage = () => {
  return (
    <Container component={Paper} elevation={2}>
      <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <GppBadIcon color='error' sx={{fontSize: "120px", margin: "auto"}}/>
        <Typography variant='button' textAlign={"center"} sx={{fontSize: "32px"}}>¡Acceso denegado!</Typography>
        <Typography variant='overline' textAlign={"center"} sx={{fontSize: "20px"}}>No cuentas con los permisos para acceder a este recurso</Typography>
      </Box>
    </Container>
  )
}

export default AccessDeniedPage