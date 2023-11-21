"use client"

import { Subcategoria } from '@/interface/Subcategoria.interface';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer'
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { SubcategoriaParams } from '@/app/subcategorias/page';
import subcategoriaService from '@/services/Subcategoria.service';
import { subcategoriaColumns } from './SubcategoriaColumns';
import SubcategoriaModalForm from '../form/SubcategoriaModalForm';

const SubcategoriaTable = ({urlSearchParams}: {urlSearchParams: SubcategoriaParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Subcategoria, SubcategoriaParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Subcategoria>({params: params, service: subcategoriaService});
    const { tableActions } = useTableActions(
        params,
        setParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )


    const onPersist = (entityPersisted: Subcategoria, insert: boolean) => {
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
        <SubcategoriaModalForm
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
              service={subcategoriaService}
              onDelete={onDelete}
          />
        )
      }
      <MUIDataTable
        title="Lista de subcategorias"
        data={dataState.data?.content || []}
        columns={subcategoriaColumns(dispatchModal)}
        options={tableActions}
      />
    </div>
  );
}

export default SubcategoriaTable