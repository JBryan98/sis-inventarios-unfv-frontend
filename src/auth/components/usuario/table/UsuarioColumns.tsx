import { Rol } from '@/auth/interfaces/Rol.interface'
import RolChip from '@/components/ui/chip/RolChip'
import TableCrudActions from '@/components/ui/table/TableCrudActions'
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer'
import { IconButton, Tooltip } from '@mui/material'
import { MUIDataTableMeta } from 'mui-datatables'
import KeyIcon from '@mui/icons-material/Key';
import React, { Dispatch, SetStateAction, useState } from 'react'

export const usuarioColumns = (
  dispatchModal: Dispatch<ModalReducerActions>,
  setEmail: Dispatch<SetStateAction<string | null>>,
  setOpenChangePasswordModal: Dispatch<SetStateAction<boolean>>
) => {
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
            <>
              <Tooltip title="Cambiar contraseña">
                <IconButton onClick={() => {
                  setEmail(tableMeta.rowData[1]);
                  setOpenChangePasswordModal(true)
                }}>
                  <KeyIcon color="primary" />
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