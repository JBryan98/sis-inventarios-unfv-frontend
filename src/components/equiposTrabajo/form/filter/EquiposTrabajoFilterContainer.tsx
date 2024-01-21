import { EquiposTrabajoParams } from '@/app/(application)/equipos-de-trabajo/page';
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import EquiposTrabajoFilterForm from './EquiposTrabajoFilterForm';
import LoadingFilter from '@/utils/components/LoadingFilter';
import ErrorFilter from '@/utils/components/ErrorFilter';
import { useModeloService } from '@/services/Modelo.service';
import { useMarcaService } from '@/services/Marca.service';
import { useSubcategoriaService } from '@/services/Subcategoria.service';

interface Props {
    equiposTrabajoParams: EquiposTrabajoParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const EquiposTrabajoFilterContainer = ({equiposTrabajoParams, modalState, dispatchModal}: Props) => {
    const modeloService = useModeloService();
    const marcaService = useMarcaService();
    const subcategoriaService = useSubcategoriaService();
    const fetchFilter = useFetchFindAllPromiseAllSettled([
      () => modeloService.findAll({
          size: "999",
          page: "1",
          categoria: "Equipos de Trabajo",
          sort: "subcategoria.nombre,asc",
        }),
      () => marcaService.findAll({ size: "999" }),
      () => subcategoriaService.findAll({
          size: "999",
          categoria: "Equipos de Trabajo",
        }),
    ]);

    if (fetchFilter.isLoading) {
      return <LoadingFilter />;
    }

    if (fetchFilter.error) {
      return <ErrorFilter />;
    }
    
  return (
    <div>
        <EquiposTrabajoFilterForm
            modalState={modalState}
            dispatchModal={dispatchModal}
            equiposTrabajoParams={equiposTrabajoParams}
            modelos={fetchFilter.data[0].content}
            marcas={fetchFilter.data[1].content}
            subcategorias={fetchFilter.data[2].content}
        />
    </div>
  )
}

export default EquiposTrabajoFilterContainer