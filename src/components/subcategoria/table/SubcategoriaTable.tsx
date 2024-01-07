"use client"

import { Subcategoria } from '@/interface/Subcategoria.interface';
import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer'
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { SubcategoriaParams } from '@/app/(application)/subcategorias/page';
import { useSubcategoriaService } from '@/services/Subcategoria.service';
import { subcategoriaColumns } from './SubcategoriaColumns';
import SubcategoriaModalForm from '../form/SubcategoriaModalForm';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { Stack } from '@mui/material';
import SubcategoriaFilterContainer from '../form/filter/SubcategoriaFilterContainer';

const SubcategoriaTable = ({urlSearchParams}: {urlSearchParams: SubcategoriaParams}) => {
    const subcategoriaService = useSubcategoriaService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Subcategoria>({params: urlSearchParams, service: subcategoriaService});

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Subcategoria, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data && modalState) {
        setPageAfterDelete(modalState.id!, "nombre");
      }
    };

    const onExportReport = () => {
      subcategoriaService.downloadReportExcel(urlSearchParams);
    }

    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal,
      onExportReport
  )

  return (
    <Stack spacing={2}>
      <SubcategoriaFilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        subcategoriaParams={urlSearchParams}
      />
      {modalState.createEditModal && (
        <SubcategoriaModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={subcategoriaService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de subcategorias"
        data={dataState.data?.content || []}
        columns={subcategoriaColumns(dispatchModal)}
        options={tableActions}
      />
    </Stack>
  );
}

export default SubcategoriaTable