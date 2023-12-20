import { EquipoParams } from '@/app/equipos/page'
import ubicacionService from '@/services/Ubicacion.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import EquipoFilterForm from './EquipoFilterForm';
import { Ubicacion } from '@/interface/Ubicacion.interface';

interface Props {
    equipoParams: EquipoParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const EquipoFilterContainer = ({equipoParams, modalState, dispatchModal}: Props) => {

    const ubicaciones = useFetchApi<Ubicacion>(ubicacionService.url + "?size=100&page=1")

    if (ubicaciones.isLoading) {
      return <LoadingFilter />;
    }

    if (ubicaciones.error) {
      return <ErrorFilter />;
    }
    return (
      <div>
        <EquipoFilterForm
          dispatchModal={dispatchModal}
          modalState={modalState}
          equipoParams={equipoParams}
          ubicaciones={ubicaciones.data?.content!}
        />
      </div>
    );
}

export default EquipoFilterContainer