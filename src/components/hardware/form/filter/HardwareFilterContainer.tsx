import { HardwareParams } from '@/app/hardware/page'
import marcaService from '@/services/Marca.service';
import modeloService from '@/services/Modelo.service';
import subcategoriaService from '@/services/Subcategoria.service';
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import React, { Dispatch } from 'react'
import HardwareFilterForm from './HardwareFilterForm';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';

interface Props {
    hardwareParams: HardwareParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}


const HardwareFilterContainer = ({hardwareParams, modalState, dispatchModal}: Props) => {  
    const fetchFilter = useFetchFindAllPromiseAllSettled([
      () =>
        modeloService.findAll({
          size: "100",
          page: "1",
          categoria: "Hardware",
          sort: "subcategoria.nombre,asc",
        }),
      () => marcaService.findAll({ size: "100" }),
      () =>
        subcategoriaService.findAll({
          size: "100",
          categoria: "Hardware",
        }),
    ]);

    if(fetchFilter.isLoading){
        return <div>Cargando Filtros ...</div>
    }

  return (
    <>
      <HardwareFilterForm
        modalState={modalState}
        dispatchModal={dispatchModal}
        modelos={fetchFilter.data[0].content}
        marcas={fetchFilter.data[1].content}
        subcategorias={fetchFilter.data[2].content}
        hardwareParams={hardwareParams}
      />
    </>
  );
}

export default HardwareFilterContainer