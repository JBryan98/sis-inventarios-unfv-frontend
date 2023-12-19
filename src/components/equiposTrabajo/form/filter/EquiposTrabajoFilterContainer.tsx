import { EquiposTrabajoParams } from '@/app/equipos-de-trabajo/page'
import marcaService from '@/services/Marca.service';
import modeloService from '@/services/Modelo.service';
import subcategoriaService from '@/services/Subcategoria.service';
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import EquiposTrabajoFilterForm from './EquiposTrabajoFilterForm';
import LoadingFilter from '@/utils/components/LoadingFilter';
import ErrorFilter from '@/utils/components/ErrorFilter';

interface Props {
    equiposTrabajoParams: EquiposTrabajoParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const EquiposTrabajoFilterContainer = ({equiposTrabajoParams, modalState, dispatchModal}: Props) => {
    const fetchFilter = useFetchFindAllPromiseAllSettled([
      () => modeloService.findAll({
          size: "100",
          page: "1",
          categoria: "Equipos de Trabajo",
          sort: "subcategoria.nombre,asc",
        }),
      () => marcaService.findAll({ size: "100" }),
      () => subcategoriaService.findAll({
          size: "100",
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