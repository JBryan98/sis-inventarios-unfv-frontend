"use client"

import { ModeloParams } from '@/app/modelos/page'
import { Modelo } from '@/interface/Modelo.interface';
import modeloService from '@/services/Modelo.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ModeloColumns from './ModeloColumns';
import ModeloForm from '../form/ModeloForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';

const ModeloTable = ({urlSearchParams}: {urlSearchParams: ModeloParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Modelo>({params: urlSearchParams, service: modeloService});
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
      );
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);
    const onPersist = (entityPersisted: Modelo, insert: boolean) => {
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
        <ModeloForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={modeloService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de modelos"
        data={dataState.data?.content || []}
        columns={ModeloColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default ModeloTable