"use client"

import { Top5ByFacultadesByEquipoCount } from '@/interface/Dashboard.interface'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props {
    data: Top5ByFacultadesByEquipoCount[] | undefined;
    title: string;
    subtitle: string;
}

const TopFacultadesTable = ({data, title, subtitle}: Props) => {
  return (
    <Paper elevation={2}>
      <Box sx={{ paddingX: "16px", paddingY: "10px" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="overline">{subtitle}</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FACULTAD</TableCell>
              <TableCell>CANTIDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.nombre} hover>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TopFacultadesTable