import { ModeloParams } from '@/app/(application)/modelos/page'
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import ModeloFilterForm from './ModeloFilterForm';
import { useMarcaService } from '@/services/Marca.service';
import { useSubcategoriaService } from '@/services/Subcategoria.service';
import { useCategoriaService } from '@/services/Categoria.service';

interface Props {
    modeloParams: ModeloParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const ModeloFilterContainer = ({modeloParams, modalState, dispatchModal}: Props) => {
    const marcaService = useMarcaService();
    const subcategoriaService = useSubcategoriaService();
    const categoriaService = useCategoriaService();
    
    const fetchFilter = useFetchFindAllPromiseAllSettled([
      () => marcaService.findAll({ size: "100" }),
      () => subcategoriaService.findAll({ size: "100" }),
      () => categoriaService.findAll({ size: "100" }),
    ]);

    if (fetchFilter.isLoading) {
      return <LoadingFilter />;
    }

    if (fetchFilter.error) {
      return <ErrorFilter />;
    }
    return (
      <div>
        <ModeloFilterForm
          modalState={modalState}
          dispatchModal={dispatchModal}
          modeloParams={modeloParams}
          marcas={fetchFilter.data[0].content}
          subcategorias={fetchFilter.data[1].content}
          categorias={fetchFilter.data[2].content}
        />
      </div>
    );
}

export default ModeloFilterContainer