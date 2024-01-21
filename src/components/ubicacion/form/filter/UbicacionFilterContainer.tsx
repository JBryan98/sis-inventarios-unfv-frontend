import { UbicacionParams } from '@/app/(application)/ubicaciones/page';
import { Facultad } from '@/interface/Facultad.interface';
import { useFacultadService } from '@/services/Facultad.service';
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
    const facultadService = useFacultadService();
    const facultades = useFetchApi<Facultad>({service: facultadService, params: {size: "999", page: "1"}})
    
    if (facultades.isLoading) {
      return <LoadingFilter />;
    }

    if (facultades.error) {
      return <ErrorFilter />;
    }

    return (
      <>
        {facultades.data && (
          <UbicacionFilterForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            ubicacionParams={ubicacionParams}
            facultades={facultades.data?.content!}
          />
        )}
      </>
    );
}

export default UbicacionFilterContainer