"use client"

import { Modelo } from '@/interface/Modelo.interface';
import { useModeloService } from '@/services/Modelo.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ModeloColumns from './ModeloColumns';
import ModeloForm from '../form/ModeloForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { Stack } from '@mui/material';
import ModeloFilterContainer from '../form/filter/ModeloFilterContainer';
import { ModeloParams } from '@/app/(application)/modelos/page';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';

const ModeloTable = ({urlSearchParams}: {urlSearchParams: ModeloParams}) => {
    const modeloService = useModeloService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Modelo>({params: urlSearchParams, service: modeloService});
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);
    const onPersist = (entityPersisted: Modelo, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "id");
      }
    };

    const { validateNotEmptyParams } = useParamsHandler();

    const onExportReport = () => {
      modeloService.downloadReportExcel(validateNotEmptyParams(urlSearchParams))
    }

    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      onExportReport
    );
  
  return (
    <Stack flexDirection="column" gap={2}>
      <ModeloFilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        modeloParams={urlSearchParams}
      />
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
    </Stack>
  );
}

export default ModeloTable