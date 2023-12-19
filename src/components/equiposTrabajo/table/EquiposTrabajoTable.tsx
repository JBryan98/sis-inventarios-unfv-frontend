"use client"

import componenteService from '@/services/Hardaware.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './EquiposTrabajoColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { EquiposTrabajo } from '@/interface/EquiposTrabajo.interface';
import { EquiposTrabajoParams } from '@/app/equipos-de-trabajo/page';
import equiposTrabajoService from '@/services/EquiposTrabajo.service';
import EquiposTrabajoModalForm from '../form/EquiposTrabajoModalForm';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { Stack } from '@mui/material';
import EquiposTrabajoFilterContainer from '../form/filter/EquiposTrabajoFilterContainer';

const EquiposTrabajoTable = ({urlSearchParams}: {urlSearchParams: EquiposTrabajoParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<EquiposTrabajo>({params: urlSearchParams, service: equiposTrabajoService});
    const { tableActions } = useTableActions(
        urlSearchParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: EquiposTrabajo, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "serie");
      }
    };
  
  
    return (
      <Stack flexDirection="column" gap={2}>
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
            service={componenteService}
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