import TableCrudActions from "@/components/ui/table/TableCrudActions";
import { ModalReducerActions } from "@/utils/reducers/CrudModalReducer";
import { MUIDataTableMeta } from "mui-datatables";
import { Dispatch } from "react";

export const FacultadColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
  return [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
      },
    },
    {
        name: "abreviatura",
        label: "ABREVIATURA",
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
