"use client"

import { Top5ByModelo } from '@/interface/Dashboard.interface';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface Props {
  data: Top5ByModelo[] | undefined;
  title: string;
  subtitle: string;
}

const TopModelosTable = ({ data, title, subtitle }: Props) => {
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
              <TableCell>MODELO</TableCell>
              <TableCell>SUBCATEGORIA</TableCell>
              <TableCell>MARCA</TableCell>
              <TableCell>CANTIDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.marca} hover>
                <TableCell>{item.modelo}</TableCell>
                <TableCell>{item.subcategoria}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TopModelosTable