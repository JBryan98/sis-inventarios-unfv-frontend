import { Hardware } from '@/interface/Hardware.interface'
import { Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, colors } from '@mui/material'
import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";

const chipColor = (value: string) => {
  switch (value){
    case "Stock":
      return "success"
    case "Operativo":
      return "primary"  
  }
}

interface Props {
    data: Hardware[] | undefined
    acciones?: boolean;
    onDelete?: (id: number) => void;
}

const EquipoHardwareTable = ({data, acciones = false, onDelete}: Props) => {
  return (
    <>
      <h3>HARDWARE</h3>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SERIE</TableCell>
              <TableCell sx={{ paddingLeft: "22px" }}>ESTADO</TableCell>
              <TableCell>MODELO</TableCell>
              <TableCell>DESCRIPCIÓN</TableCell>
              <TableCell>MARCA</TableCell>
              <TableCell>CATEGORIA</TableCell>
              {acciones && <TableCell>ACCIONES</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((hardware) => (
                <TableRow key={hardware.serie} hover>
                  <TableCell>{hardware.serie}</TableCell>
                  <TableCell>
                    <Chip
                      label={hardware.estado}
                      color={chipColor(hardware.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{hardware.modelo.nombre}</TableCell>
                  <TableCell>{hardware.modelo.descripcion}</TableCell>
                  <TableCell>{hardware.modelo.marca.nombre}</TableCell>
                  <TableCell>{hardware.modelo.subcategoria.nombre}</TableCell>
                  {acciones && onDelete && (
                    <TableCell>
                      <Tooltip title="Eliminar" placement="right">
                        <IconButton onClick={() => onDelete(hardware.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={acciones ? 7 : 6}
                  sx={{ textAlign: "center" }}
                >
                  {acciones
                    ? "El hardware que agregue se visualizará aquí"
                    : "El equipo no cuenta con hardware"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EquipoHardwareTable