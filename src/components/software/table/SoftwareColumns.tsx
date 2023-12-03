import TableCrudActions from '@/components/ui/table/TableCrudActions';
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { Chip } from '@mui/material';
import { MUIDataTableMeta } from 'mui-datatables';
import React, { Dispatch } from 'react'


const SoftwareColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
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
      label: "Nombre",
      options: {
        sort: true,
      },
    },
    {
      name: "subcategoria.nombre",
      label: "SUBCATEGORIA",
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

export default SoftwareColumns