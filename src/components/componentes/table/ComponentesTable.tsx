"use client"

import { ComponenteParams } from '@/app/componentes/page'
import { categoriaColumns } from '@/components/categoria/table/CategoriaColumns';
import { Componente } from '@/interface/Componentes.interface';
import componenteService from '@/services/Componentes.service';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import ComponentesColumn from './ComponentesColumn';
import ComponenteModalForm from '../form/ComponenteForm';
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';

const ComponentesTable = ({urlSearchParams}: {urlSearchParams: ComponenteParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Componente, ComponenteParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Componente>({params: params, service: componenteService});
    const { tableActions } = useTableActions(
        params,
        setParams,
        dataState.isLoading,
        dataState.data?.totalElements!,
        dispatchModal,
    )

    const onPersist = (entityPersisted: Componente, insert: boolean) => {
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
          <ComponenteModalForm
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

export default ComponentesTable