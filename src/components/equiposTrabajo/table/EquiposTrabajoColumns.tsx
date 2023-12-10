import TableCrudActions from '@/components/ui/table/TableCrudActions';
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { Chip } from '@mui/material';
import { MUIDataTableMeta } from 'mui-datatables';
import React, { Dispatch } from 'react'

const chipColor = (value: string) => {
  switch (value){
    case "Stock":
      return "success"
    case "Operativo":
      return "primary"  
  }
}

const EquiposTrabajoColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
  return [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
      },
    },
    {
      name: "serie",
      label: "SERIE",
      options: {
        sort: true,
      },
    },
    {
      name: "estado",
      label: "ESTADO",
      options: {
        sort: true,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <Chip label={value} sx={{marginLeft: "-8px"}} size='small' color={chipColor(value)}/>
        )
      },
    },
    {
      name: "ubicacion.nombre",
      label: "UBICACIÓN",
      options: {
        sort: false,
        customBodyRender: (value: string | null, tableMeta: MUIDataTableMeta) => (
          <p>{value ? value : "No asignado"}</p>
        )
      }
    },
    {
      name: "modelo.nombre",
      label: "MODELO",
      options: {
        sort: true,
      },
    },
    {
      name: "modelo.subcategoria.nombre",
      label: "SUBCATEGORIA",
      options: {
        sort: true,
      },
    },
    {
      name: "modelo.marca.nombre",
      label: "MARCA",
      options: {
        sort: true,
      },
    },
    {
      name: "acciones",
      label: "ACCIONES",
      options: {
        sort: false,
        customBodyRender: (value: undefined, tableMeta: MUIDataTableMeta) => {
          return (
            <TableCrudActions
              dispatchModal={dispatchModal}
              tableMeta={tableMeta}
            />
          );
        },
      },
    },
  ];
}

export default EquiposTrabajoColumns