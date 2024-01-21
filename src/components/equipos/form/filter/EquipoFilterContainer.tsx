import { useUbicacionService } from '@/services/Ubicacion.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import EquipoFilterForm from './EquipoFilterForm';
import { Ubicacion } from '@/interface/Ubicacion.interface';
import { EquipoParams } from '@/app/(application)/equipos/page';

interface Props {
    equipoParams: EquipoParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const EquipoFilterContainer = ({equipoParams, modalState, dispatchModal}: Props) => {
    const ubicacionService = useUbicacionService();
    const ubicaciones = useFetchApi<Ubicacion>({service: ubicacionService, params: {size: "999"}})

    if (ubicaciones.isLoading) {
      return <LoadingFilter />;
    }

    if (ubicaciones.error) {
      return <ErrorFilter />;
    }
    return (
      <>
        {ubicaciones.data && (
          <EquipoFilterForm
            dispatchModal={dispatchModal}
            modalState={modalState}
            equipoParams={equipoParams}
            ubicaciones={ubicaciones.data?.content!}
          />
        )}
      </>
    );
}

export default EquipoFilterContainer