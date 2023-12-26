"use client"

import { CategoriaParams } from '@/app/(application)/categorias/page';
import { Categoria } from '@/interface/Categoria.interface';
import { useCategoriaService } from '@/services/Categoria.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer'
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import { categoriaColumns } from './CategoriaColumns';
import CategoriaForm from '../form/CategoriaForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';

const CategoriaTable = ({urlSearchParams}: {urlSearchParams: CategoriaParams}) => {
    const categoriaService = useCategoriaService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Categoria>({params: urlSearchParams, service: categoriaService});
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      )
      
    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Categoria, insert: boolean) => {
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
        <CategoriaForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {
        modalState.id && (
          <DeleteDialogAlert
              modalState={modalState}
              dispatchModal={dispatchModal}
              service={categoriaService}
              onDelete={onDelete}
          />
        )
      }
      <MUIDataTable
        title="Lista de categorías"
        data={dataState.data?.content || []}
        columns={categoriaColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default CategoriaTable