import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import { EquiposTrabajo } from "@/interface/EquiposTrabajo.interface";

interface Props {
    data: EquiposTrabajo[] | undefined;
    acciones?: boolean;
    onDelete?: (id: number) => void;
}


const EquiposTrabajoTable = ({data, acciones = false, onDelete}: Props) => {
  return (
    <>
      <h3>EQUIPOS DE TRABAJO</h3>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>SERIE</TableCell>
              <TableCell>MODELO</TableCell>
              <TableCell>SUBCATEGORIA</TableCell>
              <TableCell>MARCA</TableCell>
              {acciones && <TableCell>ACCIONES</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((equipo) => (
                <TableRow key={equipo.id}>
                  <TableCell>{equipo.id}</TableCell>
                  <TableCell>{equipo.serie}</TableCell>
                  <TableCell>{equipo.modelo.nombre}</TableCell>
                  <TableCell>{equipo.modelo.subcategoria.nombre}</TableCell>
                  <TableCell>{equipo.modelo.marca.nombre}</TableCell>
                  {acciones && onDelete && (
                    <TableCell>
                      <Tooltip title="Eliminar" placement="right">
                        <IconButton onClick={() => onDelete(equipo.id)}>
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
                  colSpan={acciones ? 5 : 4}
                  sx={{ textAlign: "center" }}
                >
                  {acciones
                    ? "El equipo de trabajo que agregue se visualizará aquí"
                    : "La ubicación no cuenta con equipos de trabajo"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EquiposTrabajoTable