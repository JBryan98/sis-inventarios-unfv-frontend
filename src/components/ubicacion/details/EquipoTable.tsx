import { Equipo } from "@/interface/Equipo.interface";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    data: Equipo[] | undefined;
    acciones?: boolean;
    onDelete?: (id: number) => void;
}


const EquipoTable = ({data, acciones = false, onDelete}: Props) => {
  return (
    <>
      <h3>EQUIPOS</h3>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              {acciones && <TableCell>ACCIONES</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((equipo) => (
                <TableRow key={equipo.id}>
                  <TableCell>{equipo.id}</TableCell>
                  <TableCell>{equipo.nombre}</TableCell>
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
                  colSpan={acciones ? 3 : 2}
                  sx={{ textAlign: "center" }}
                >
                  {acciones
                    ? "El equipo que agregue se visualizará aquí"
                    : "La ubicación no cuenta con equipos"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EquipoTable