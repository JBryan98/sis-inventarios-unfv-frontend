"use client"

import { HardwareParams } from '@/app/hardware/page'
import componenteService from '@/services/Hardaware.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './HardwareColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { Hardware } from '@/interface/Hardware.interface';
import HardwareModalForm from '../form/HardwareForm';

const HardwareTable = ({urlSearchParams}: {urlSearchParams: HardwareParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Hardware, HardwareParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Hardware>({params: params, service: componenteService});
    const { tableActions } = useTableActions(
        params,
        setParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const onPersist = (entityPersisted: Hardware, insert: boolean) => {
      setPageOnPersist(insert);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(dataState.data?.content);
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
          title="Lista de componentes"
          data={dataState.data?.content || []}
          columns={ComponentesColumn(dispatchModal)}
          options={tableActions}
        />
      </div>
    );
}

export default HardwareTable