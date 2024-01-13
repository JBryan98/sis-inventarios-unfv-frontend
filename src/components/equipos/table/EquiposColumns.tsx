import TableCrudActions from "@/components/ui/table/TableCrudActions";
import { ModalReducerActions } from "@/utils/reducers/CrudModalReducer";
import { IconButton, Tooltip } from "@mui/material";
import { MUIDataTableMeta } from "mui-datatables";
import { Dispatch } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useRouter } from "next/navigation";
import EstadoChip from "@/components/ui/chip/EstadoChip";
import { Estado } from "@/utils/constants/Estado";

export const EquipoColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
  const router = useRouter();
  return [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
      },
    },
    {
      name: "nombre",
      label: "NOMBRE",
      options: {
        sort: true,
      },
    },
    {
      name: "estado",
      label: "ESTADO",
      options: {
        sort: true,
        customBodyRender: (value: Estado, tableMeta: MUIDataTableMeta) => (
          <EstadoChip label={value}/>
        )
      },
    },
    {
      name: "ubicacion.nombre",
      label: "UBICACION",
      options: {
        sort: true,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <p>{value ? value : "No asignado"}</p>
        )
      }
    },
    {
      name: "detalles",
      label: "DETALLES",
      options: {
        sort: true,
        customBodyRender: (value: undefined, tableMeta: MUIDataTableMeta) => {
          return (
            <Tooltip title="Ver detalles">
              <Link href={`/equipos/${tableMeta.rowData[1]}`}>
              <IconButton>
                <VisibilityIcon color="primary"/>
              </IconButton>
              </Link>
            </Tooltip>
          )
        }
      },
    },
    {
      name: "acciones",
      label: "ACCIONES",
      options: {
        sort: false,
        customBodyRender: (value: undefined, tableMeta: MUIDataTableMeta) => {
          return (
            <>
              <Tooltip title="Administrar Equipo">
                <IconButton
                  onClick={() => {
                    router.push("/equipos/administrar-equipo/" + tableMeta.rowData[1])
                  }}
                >
                  <AutoFixHighIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <TableCrudActions
                dispatchModal={dispatchModal}
                tableMeta={tableMeta}
              />
            </>
          );
        },
      },
    },
  ];
};
