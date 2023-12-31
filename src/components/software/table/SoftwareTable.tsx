"use client"

import { SoftwareParams } from '@/app/(application)/software/page';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './SoftwareColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { Software } from '@/interface/Software.interface';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import SoftwareModalForm from '../form/SoftwareModalForm';
import { Stack } from '@mui/material';
import SoftwareFilterContainer from '../form/filter/SoftwareFilterContainer';
import { useSoftwareService } from '@/services/Software.service';

const SoftwareTable = ({urlSearchParams}: {urlSearchParams: SoftwareParams}) => {
    const softwareService = useSoftwareService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Software>({params: urlSearchParams, service: softwareService});
    const { tableActions } = useTableActions(
        urlSearchParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Software, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "nombre");
      }
    };
  
  
    return (
      <Stack gap={2}>
        <SoftwareFilterContainer
          modalState={modalState}
          dispatchModal={dispatchModal}
          softwareParams={urlSearchParams}
        />
        {modalState.createEditModal && (
          <SoftwareModalForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            onPersist={onPersist}
          />
        )}
        {modalState.id && (
          <DeleteDialogAlert
            modalState={modalState}
            dispatchModal={dispatchModal}
            service={softwareService}
            onDelete={onDelete}
          />
        )}
        <MUIDataTable
          title="Lista de Software"
          data={dataState.data?.content || []}
          columns={ComponentesColumn(dispatchModal)}
          options={tableActions}
        />
      </Stack>
    );
}

export default SoftwareTable