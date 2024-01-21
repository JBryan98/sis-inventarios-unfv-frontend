import { SubcategoriaParams } from '@/app/(application)/subcategorias/page';
import { Categoria } from '@/interface/Categoria.interface';
import { useCategoriaService } from '@/services/Categoria.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import React, { Dispatch } from 'react'
import SubcategoriaFilterForm from './SubcategoriaFilterForm';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    subcategoriaParams: SubcategoriaParams;
}

const SubcategoriaFilterContainer = ({modalState, dispatchModal, subcategoriaParams}: Props) => {
    const categoriaService = useCategoriaService();
    const categorias = useFetchApi<Categoria>({service: categoriaService, params: {
      size: "999",
      page: "1"
    }})

    if(categorias.isLoading){
        return <LoadingFilter/>
    }

    if(categorias.error){
        return <ErrorFilter/>
    }
  return (
    <>
      {categorias.data && (
        <SubcategoriaFilterForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          subcategoriaParams={subcategoriaParams}
          categorias={categorias.data?.content!}
        />
      )}
    </>
  );
}

export default SubcategoriaFilterContainer