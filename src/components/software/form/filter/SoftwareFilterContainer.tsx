import { SoftwareParams } from '@/app/software/page'
import { Subcategoria } from '@/interface/Subcategoria.interface';
import subcategoriaService from '@/services/Subcategoria.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import SoftwareFilterForm from './SoftwareFilterForm';

interface Props {
    softwareParams: SoftwareParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const SoftwareFilterContainer = ({softwareParams, modalState, dispatchModal}: Props) => {
    
    const subcategorias = useFetchApi<Subcategoria>(subcategoriaService.url + "?size=100&page=1&categoria=Software");

    if (subcategorias.isLoading) {
      return <LoadingFilter />;
    }

    if (subcategorias.error) {
      return <ErrorFilter />;
    }

    return (
      <div>
        <SoftwareFilterForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          softwareParams={softwareParams}
          subcategorias={subcategorias.data?.content!}
        />
      </div>
    );
}

export default SoftwareFilterContainer