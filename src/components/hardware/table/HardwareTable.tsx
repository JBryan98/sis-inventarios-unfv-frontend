"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './HardwareColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { Hardware } from '@/interface/Hardware.interface';
import HardwareModalForm from '../form/HardwareForm';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { Stack } from '@mui/material';
import HardwareFilterContainer from '../form/filter/HardwareFilterContainer';
import { HardwareParams } from '@/app/(application)/hardware/page';
import { useHardwareService } from '@/services/Hardaware.service';

const HardwareTable = ({urlSearchParams}: {urlSearchParams: HardwareParams}) => {
    const hardwareService = useHardwareService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Hardware>({params: urlSearchParams, service: hardwareService});
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Hardware, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "serie");
      }
    };

    const onExportReport = () => {
      hardwareService.downloadReportExcel(urlSearchParams);
    }

    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      onExportReport
  )

    return (
      <Stack flexDirection="column" gap={2}>
        <HardwareFilterContainer
          hardwareParams={urlSearchParams}
          modalState={modalState}
          dispatchModal={dispatchModal}
        />
        {modalState.createEditModal && (
          <HardwareModalForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            onPersist={onPersist}
          />
        )}
        {modalState.id && (
          <DeleteDialogAlert
            modalState={modalState}
            dispatchModal={dispatchModal}
            service={hardwareService}
            onDelete={onDelete}
          />
        )}
        <MUIDataTable
          title="Lista de hardware"
          data={dataState.data?.content || []}
          columns={ComponentesColumn(dispatchModal)}
          options={tableActions}
        />
      </Stack>
    );
}

export default HardwareTable