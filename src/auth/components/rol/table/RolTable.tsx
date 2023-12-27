"use client"

import { RolParams } from '@/app/(application)/auth/roles/page';
import { Rol } from '@/auth/interfaces/Rol.interface';
import { useRolService } from '@/services/Rol.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import { rolColumns } from './RolColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import RolModalForm from '../form/RolModalForm';
import { Stack } from '@mui/material';

const RolTable = ({urlSearchParams}: {urlSearchParams: RolParams}) => {
    const rolService = useRolService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Rol>({params: urlSearchParams, service: rolService});
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      )
      
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Rol, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "nombre");
      }
    };
  return (
    <Stack gap={2}>
      {modalState.createEditModal && (
        <RolModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={rolService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de Rols"
        data={dataState.data?.content || []}
        columns={rolColumns(dispatchModal)}
        options={tableActions}
      />
    </Stack>
  );
}

export default RolTable