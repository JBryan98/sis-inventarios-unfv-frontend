"use client"

import React from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { Top5ByMarca } from '@/interface/Dashboard.interface';

interface Props {
  data: Top5ByMarca[] | undefined;
  title: string;
  subtitle: string;
}

const TopMarcasTable = ({ data, title, subtitle }: Props) => {
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
              <TableCell>MARCA</TableCell>
              <TableCell>CANTIDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.marca} hover>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopMarcasTable