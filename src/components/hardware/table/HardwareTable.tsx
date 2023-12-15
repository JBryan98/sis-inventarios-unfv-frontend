"use client"

import { HardwareParams } from '@/app/hardware/page'
import componenteService from '@/services/Hardaware.service';
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

const HardwareTable = ({urlSearchParams}: {urlSearchParams: HardwareParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Hardware>({params: urlSearchParams, service: componenteService});
    const { tableActions } = useTableActions(
        urlSearchParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Hardware, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "serie");
      }
    };
  
  
    return (
      <div>
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
            service={componenteService}
            onDelete={onDelete}
          />
        )}
        <MUIDataTable
          title="Lista de hardware"
          data={dataState.data?.content || []}
          columns={ComponentesColumn(dispatchModal)}
          options={tableActions}
        />
      </div>
    );
}

export default HardwareTable