import { UbicacionParams } from '@/app/ubicaciones/page';
import { Facultad } from '@/interface/Facultad.interface';
import facultadService from '@/services/Facultad.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import React, { Dispatch } from 'react'
import UbicacionFilterForm from './UbicacionFilterForm';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    ubicacionParams: UbicacionParams;
}

const UbicacionFilterContainer = ({modalState, dispatchModal, ubicacionParams}: Props) => {
    const facultades = useFetchApi<Facultad>(facultadService.url + "?size=100&page=1")
    
    if (facultades.isLoading) {
      return <LoadingFilter />;
    }

    if (facultades.error) {
      return <ErrorFilter />;
    }

    return (
      <div>
        <UbicacionFilterForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          ubicacionParams={ubicacionParams}
          facultades={facultades.data?.content!}
        />
      </div>
    );
}

export default UbicacionFilterContainer