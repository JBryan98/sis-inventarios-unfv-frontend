import { SoftwareParams } from '@/app/(application)/software/page'
import { Subcategoria } from '@/interface/Subcategoria.interface';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import SoftwareFilterForm from './SoftwareFilterForm';
import { useSubcategoriaService } from '@/services/Subcategoria.service';

interface Props {
    softwareParams: SoftwareParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const SoftwareFilterContainer = ({softwareParams, modalState, dispatchModal}: Props) => {
    const subcategoriaService = useSubcategoriaService();
    const subcategorias = useFetchApi<Subcategoria>({service: subcategoriaService, params: {
      size: "999",
      page: "1",
      categoria: "Software"
    }});


    if (subcategorias.isLoading) {
      return <LoadingFilter />;
    }

    if (subcategorias.error) {
      return <ErrorFilter />;
    }

    return (
      <>
        {subcategorias.data && (
          <SoftwareFilterForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            softwareParams={softwareParams}
            subcategorias={subcategorias.data.content}
          />
        )}
      </>
    );
}

export default SoftwareFilterContainer