"use client"

import { MarcaParams } from '@/app/(application)/marcas/page'
import { categoriaColumns } from '@/components/categoria/table/CategoriaColumns';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { Marca } from '@/interface/Marca.interface';
import { useMarcaService } from '@/services/Marca.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import MarcaForm from '../form/MarcaForm';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';

const MarcaTable = ({urlSearchParams}: {urlSearchParams: MarcaParams}) => {
    const marcaService = useMarcaService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Marca>({params: urlSearchParams, service: marcaService});
    const { tableActions } = useTableActions(
        urlSearchParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);


    const onPersist = (entityPersisted: Marca, insert: boolean) => {
        setPageOnPersist(insert, entityPersisted);
      };
  
      const onDelete = () => {
        if (dataState.data) {
          setPageAfterDelete(modalState.id!, "nombre");
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