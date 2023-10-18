import TableCrudActions from '@/components/ui/table/TableCrudActions';
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { MUIDataTableMeta } from 'mui-datatables';
import React, { Dispatch } from 'react'

const ComponentesColumn = (dispatchModal: Dispatch<ModalReducerActions>) => {
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
      },
    },
    {
      name: "modelo.nombre",
      label: "MODELO",
      options: {
        sort: true,
      },
    },
    {
      name: "modelo.categoria.nombre",
      label: "CATEGORÍA",
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

export default ComponentesColumn