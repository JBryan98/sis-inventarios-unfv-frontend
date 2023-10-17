import TableCrudActions from "@/components/ui/table/TableCrudActions";
import { ModalReducerActions } from "@/utils/reducers/CrudModalReducer";
import { MUIDataTableMeta } from "mui-datatables";
import React, { Dispatch } from "react";

const ModeloColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
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
      name: "descripcion",
      label: "DESCRIPCIÓN",
      options: {
        sort: true,
      },
    },
    {
      name: "categoria.nombre",
      label: "CATEGORÍA",
      options: {
        sort: true,
      },
    },
    {
      name: "marca.nombre",
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
};

export default ModeloColumns;
