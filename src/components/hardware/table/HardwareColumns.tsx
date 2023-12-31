import EstadoChip from '@/components/ui/chip/EstadoChip';
import TableCrudActions from '@/components/ui/table/TableCrudActions';
import { Estado } from '@/utils/constants/Estado';
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { MUIDataTableMeta } from 'mui-datatables';
import React, { Dispatch } from 'react'

const HardwareColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
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
        customBodyRender: (value: Estado, tableMeta: MUIDataTableMeta) => (
          <EstadoChip label={value}/>
        )
      },
    },
    {
      name: "equipo.nombre",
      label: "EQUIPO",
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

export default HardwareColumns