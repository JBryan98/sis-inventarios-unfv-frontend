"use client"

import { UsuarioParams } from '@/app/(application)/auth/usuarios/page'
import { Usuario } from '@/auth/interfaces/Usuario.interface';
import { useUsuarioService } from '@/services/Usuario.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer, useState } from 'react'
import { usuarioColumns } from './UsuarioColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import UsuarioModalForm from '../form/UsuarioModalForm';
import { Stack } from '@mui/material';
import UsuarioFilterContainer from '../form/filter/UsuarioFilterContainer';
import ChangePasswordAdminModal from '../../password/ChangePasswordAdminModa';

const UsuarioTable = ({urlSearchParams}: {urlSearchParams: UsuarioParams}) => {
    const usuarioService = useUsuarioService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Usuario>({params: urlSearchParams, service: usuarioService});
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      )
      
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Usuario, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "email");
      }
    };

    const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
  return (
    <Stack gap={2}>
      <UsuarioFilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        usuarioParams={urlSearchParams}
      />
      {email && (
        <ChangePasswordAdminModal
          email={email}
          setEmail={setEmail}
          openChangePasswordModal={openChangePasswordModal}
          setOpenChangePasswordModal={setOpenChangePasswordModal}
        />
      )}
      {modalState.createEditModal && (
        <UsuarioModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={usuarioService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de usuarios"
        data={dataState.data?.content || []}
        columns={usuarioColumns(dispatchModal, setEmail, setOpenChangePasswordModal)}
        options={tableActions}
      />
    </Stack>
  );
}

export default UsuarioTable