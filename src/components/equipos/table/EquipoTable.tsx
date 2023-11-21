"use client"

import { useFetchUrlApi } from '@/utils/hooks/useFetchApi';
import { useTableActions } from '@/utils/hooks/useTableActions';
import { useUrlSearchParams } from '@/utils/hooks/useUrlSearchParams';
import { modalInitialState, modalReducer } from '@/utils/reducers/CrudModalReducer';
import MUIDataTable from 'mui-datatables';
import React, { useReducer } from 'react'
import DeleteDialogAlert from '@/components/ui/table/DeleteDialogAlert';
import { EquipoParams } from '@/app/equipos/page';
import equipoService from '@/services/Equipo.service';
import { EquipoColumns } from './EquiposColumns';
import EquipoModalForm from '../form/EquipoModalForm';
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/navigation';
import { Equipo } from '@/interface/Equipo.interface';

const EquipoTable = ({urlSearchParams}: {urlSearchParams: EquipoParams}) => {
    const [modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState);
    const {params, setParams, setPageOnPersist, setPageAfterDelete} = useUrlSearchParams<Equipo, EquipoParams>(urlSearchParams);
    const dataState = useFetchUrlApi<Equipo>({params: params, service: equipoService});
    const router = useRouter();
    const { tableActions } = useTableActions(
      params,
      setParams,
      dataState.isLoading,
      dataState.data?.totalElements!,
      dispatchModal
    );

    const onPersist = (entityPersisted: Equipo, insert: boolean) => {
      setPageOnPersist(insert);
    };

    const onDelete = () => {
      if (dataState.data) {
        setPageAfterDelete(dataState.data?.content);
      }
    };

    const equipoTableActions = {
      ...tableActions,
      customToolbar: () => {
        return (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                router.push("/equipos/crear-equipo")
              }}
            >
              <AddIcon /> Nuevo
            </Button>
          </>
        );
      },
    }

  return (
    <div>
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
        title="Lista de Escuelas"
        data={dataState.data?.content || []}
        columns={EquipoColumns(dispatchModal)}
        options={equipoTableActions}
      />
    </div>
  );
}

export default EquipoTable