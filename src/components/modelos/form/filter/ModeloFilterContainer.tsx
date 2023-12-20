import { ModeloParams } from '@/app/modelos/page'
import categoriaService from '@/services/Categoria.service';
import marcaService from '@/services/Marca.service';
import subcategoriaService from '@/services/Subcategoria.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import ModeloFilterForm from './ModeloFilterForm';

interface Props {
    modeloParams: ModeloParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const ModeloFilterContainer = ({modeloParams, modalState, dispatchModal}: Props) => {
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