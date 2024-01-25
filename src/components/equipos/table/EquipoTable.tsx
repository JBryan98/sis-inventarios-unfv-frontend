"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { EquipoColumns } from './EquiposColumns';
import EquipoModalForm from '../form/EquipoModalForm';
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Equipo } from '@/interface/Equipo.interface';
import { usePageActionsHandler } from '@/utils/hooks/usePageActionsHandler';
import EquipoFilterContainer from '../form/filter/EquipoFilterContainer';
import { EquipoParams } from '@/app/(application)/equipos/page';
import { useEquipoService } from '@/services/Equipo.service';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';

const EquipoTable = ({urlSearchParams}: {urlSearchParams: EquipoParams}) => {
    const equipoService = useEquipoService();
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const dataState = useFetchUrlApi<Equipo>({params: urlSearchParams, service: equipoService});
    const router = useRouter();
    const { tableActions } = useTableActions(
      urlSearchParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
    );

    const {setPageAfterDelete, setPageOnPersist} = usePageActionsHandler(urlSearchParams, dataState.data);

    const onPersist = (entityPersisted: Equipo, insert: boolean) => {
      setPageOnPersist(insert, entityPersisted);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(modalState.id!, "nombre");
      }
    };

    const { validateNotEmptyParams } = useParamsHandler();

    const onExportReport = () => {
      equipoService.downloadReportExcel(validateNotEmptyParams(urlSearchParams));
    }

    const equipoTableActions = {
      ...tableActions,
      customToolbar: () => {
        return (
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<FileDownloadIcon />}
              onClick={() => {
                onExportReport();
              }}
            >
              Exportar
            </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              router.push("/equipos/crear-equipo")
            }}
            startIcon={<AddCircleIcon />}
          >
            Nuevo
          </Button>
        </Box>
        );
      },
    }

  return (
    <Stack gap={2}>
      <EquipoFilterContainer
        equipoParams={urlSearchParams}
        modalState={modalState}
        dispatchModal={dispatchModal}
      />
       {modalState.createEditModal && (
        <EquipoModalForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          onPersist={onPersist}
        />
      )}
      {modalState.id && (
        <DeleteDialogAlert
          modalState={modalState}
          dispatchModal={dispatchModal}
          service={equipoService}
          onDelete={onDelete}
        />
      )}
      <MUIDataTable
        title="Lista de Equipos"
        data={dataState.data?.content || []}
        columns={EquipoColumns(dispatchModal)}
        options={equipoTableActions}
      />
    </Stack>
  );
}

export default EquipoTable