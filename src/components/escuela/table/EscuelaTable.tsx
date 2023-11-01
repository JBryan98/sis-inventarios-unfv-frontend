"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { EscuelaParams } from '@/app/escuelas/page';
import { Escuela } from '@/interface/Escuela.interface';
import escuelaService from '@/services/Escuela.service';
import { EscuelaColumns } from './EscuelaColumns';
import EscuelaModalForm from '../form/EscuelaModalForm';

const EscuelaTable = ({urlSearchParams}: {urlSearchParams: EscuelaParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Escuela, EscuelaParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Escuela>({params: params, service: escuelaService});
    const { tableActions } = useTableActions(
      params,
      setParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
    );

    const onPersist = (entityPersisted: Escuela, insert: boolean) => {
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
        <EscuelaModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={escuelaService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de Escuelaes"
        data={dataState.data?.content || []}
        columns={EscuelaColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default EscuelaTable