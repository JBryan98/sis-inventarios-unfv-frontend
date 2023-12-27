import { Rol } from '@/auth/interfaces/Rol.interface'
import RolChip from '@/components/ui/chip/RolChip'
import TableCrudActions from '@/components/ui/table/TableCrudActions'
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { MUIDataTableMeta } from 'mui-datatables'
import React, { Dispatch } from 'react'

export const usuarioColumns = (dispatchModal: Dispatch<ModalReducerActions>) => {
    return [
      {
        name: "id",
        label: "ID",
        options: {
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          sort: true,
        },
      },
      {
        name: "nombres",
        label: "Nombres",
        options: {
          sort: true,
        },
      },
      {
        name: "apellidos",
        label: "Apellidos",
        options: {
          sort: true,
        },
      },
      {
        name: "roles",
        label: "Roles",
        options: {
          sort: false,
          customBodyRender: (value: Rol[], tableMeta: MUIDataTableMeta) => {
            return (
              <>
                {value.map((rol) => (
                  <RolChip key={rol.id} label={rol.nombre} />
                ))}
              </>
            );
          },
        },
      },
      {
        name: "dni",
        label: "DNI",
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