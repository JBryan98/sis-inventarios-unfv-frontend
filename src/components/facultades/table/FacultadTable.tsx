"use client"

import { FacultadParams } from '@/app/facultades/page';
import { Facultad } from '@/interface/Facultad.interface';
import facultadService from '@/services/Facultad.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import { FacultadColumns } from './FacultadColumns';
import FacultadModalForm from '../form/FacultadModalForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';

const FacultadTable = ({urlSearchParams}: {urlSearchParams: FacultadParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Facultad>({params: urlSearchParams, service: facultadService});
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
    );

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Facultad, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(dataState.data?.content);
      }
    };
  return (
    <div>
      {modalState.createEditModal && (
        <FacultadModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={facultadService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de facultades"
        data={dataState.data?.content || []}
        columns={FacultadColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default FacultadTable