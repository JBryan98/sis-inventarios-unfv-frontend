"use client"

import { CategoriaParams } from '@/app/categorias/page'
import { Categoria } from '@/interface/Categoria.interface';
import categoriaService from '@/services/Categoria.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer'
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import { categoriaColumns } from './CategoriaColumns';
import CategoriaForm from '../form/CategoriaForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';

const CategoriaTable = ({urlSearchParams}: {urlSearchParams: CategoriaParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Categoria, CategoriaParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Categoria>({params: params, service: categoriaService});
    const { tableActions } = useTableActions(
        params,
        setParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )


    const onPersist = (entityPersisted: Categoria, insert: boolean) => {
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