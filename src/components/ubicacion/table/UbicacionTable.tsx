"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import UbicacionService from '@/services/Ubicacion.service';
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/navigation';
import { Ubicacion } from '@/interface/Ubicacion.interface';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import { UbicacionParams } from '@/app/ubicaciones/page';
import ubicacionService from '@/services/Ubicacion.service';
import { UbicacionColumns } from './UbicacionColumns';
import UbicacionModalForm from '../form/UbicacionModalForm';
import UbicacionFilterContainer from '../form/filter/UbicacionFilterContainer';

const UbicacionTable = ({urlSearchParams}: {urlSearchParams: UbicacionParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Ubicacion>({params: urlSearchParams, service: ubicacionService});
    const router = useRouter();
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
    );

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Ubicacion, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "nombre");
      }
    };

    const UbicacionTableActions = {
      ...tableActions,
      customToolbar: () => {
        return (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                router.push("/ubicaciones/crear-ubicacion")
              }}
            >
              <AddIcon /> Nuevo
            </Button>
          </>
        );
      },
    }

  return (
    <Stack gap={2}>
      <UbicacionFilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        ubicacionParams={urlSearchParams}
      />
      {modalState.createEditModal && (
        <UbicacionModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={UbicacionService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de Ubicaciones"
        data={dataState.data?.content || []}
        columns={UbicacionColumns(dispatchModal)}
        options={UbicacionTableActions}
      />
    </Stack>
  );
}

export default UbicacionTable