import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { Software } from '@/interface/Software.interface'
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    data: Software[] | undefined;
    acciones?: boolean;
    onDelete?: (id: number) => void;
}

const EquipoSoftwareTable = ({data, acciones, onDelete}: Props) => {
  return (
    <>
      <h3>SOFTWARE</h3>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>SUBCATEGORIA</TableCell>
              {acciones && onDelete && <TableCell>ACCIONES</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((software) => (
                <TableRow key={software.id} hover>
                  <TableCell>{software.id}</TableCell>
                  <TableCell>{software.nombre}</TableCell>
                  <TableCell>{software.subcategoria.nombre}</TableCell>
                  {acciones && onDelete && (
                    <TableCell>
                      <Tooltip title="Eliminar" placement="right">
                        <IconButton onClick={() => onDelete(software.id)}>
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
                  colSpan={acciones ? 4 : 3}
                  sx={{ textAlign: "center" }}
                >
                  {acciones
                    ? "El software que agregue se visualizará aquí"
                    : "El equipo no cuenta con software"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EquipoSoftwareTable