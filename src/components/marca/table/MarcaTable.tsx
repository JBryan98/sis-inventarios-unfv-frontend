"use client"

import { MarcaParams } from '@/app/marcas/page'
import { categoriaColumns } from '@/components/categoria/table/CategoriaColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { Marca } from '@/interface/Marca.interface';
import marcaService from '@/services/Marca.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import MarcaForm from '../form/MarcaForm';

const MarcaTable = ({urlSearchParams}: {urlSearchParams: MarcaParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Marca, MarcaParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Marca>({params: params, service: marcaService});
    const { tableActions } = useTableActions(
        params,
        setParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const onPersist = (entityPersisted: Marca, insert: boolean) => {
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
        <MarcaForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={marcaService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de marcas"
        data={dataState.data?.content || []}
        columns={categoriaColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default MarcaTable