"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './EquiposTrabajoColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { EquiposTrabajo } from '@/interface/EquiposTrabajo.interface';
import EquiposTrabajoModalForm from '../form/EquiposTrabajoModalForm';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { Stack } from '@mui/material';
import EquiposTrabajoFilterContainer from '../form/filter/EquiposTrabajoFilterContainer';
import { EquiposTrabajoParams } from '@/app/(application)/equipos-de-trabajo/page';
import { useEquiposTrabajoService } from '@/services/EquiposTrabajo.service';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';

const EquiposTrabajoTable = ({urlSearchParams}: {urlSearchParams: EquiposTrabajoParams}) => {
    const equiposTrabajoService = useEquiposTrabajoService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<EquiposTrabajo>({params: urlSearchParams, service: equiposTrabajoService});

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: EquiposTrabajo, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "serie");
      }
    };
    
    const { validateNotEmptyParams } = useParamsHandler();
    
    const onExportReport = () => {
      equiposTrabajoService.downloadReportExcel(validateNotEmptyParams(urlSearchParams));
    }

    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      onExportReport
  )
  
  
    return (
      <Stack gap={2}>
        <EquiposTrabajoFilterContainer
          equiposTrabajoParams={urlSearchParams}
          modalState={modalState}
          dispatchModal={dispatchModal}
        />
        {modalState.createEditModal && (
          <EquiposTrabajoModalForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            onPersist={onPersist}
          />
        )}
        {modalState.id && (
          <DeleteDialogAlert
            modalState={modalState}
            dispatchModal={dispatchModal}
            service={equiposTrabajoService}
            onDelete={onDelete}
          />
        )}
        <MUIDataTable
          title="Lista de Equipos de Trabajo"
          data={dataState.data?.content || []}
          columns={ComponentesColumn(dispatchModal)}
          options={tableActions}
        />
      </Stack>
    );
}

export default EquiposTrabajoTable