import { HardwareParams } from '@/app/(application)/hardware/page'
import { useFetchFindAllPromiseAllSettled } from '@/utils/hooks/useFetchApi';
import React, { Dispatch } from 'react'
import HardwareFilterForm from './HardwareFilterForm';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import LoadingFilter from '@/utils/components/LoadingFilter';
import ErrorFilter from '@/utils/components/ErrorFilter';
import { useModeloService } from '@/services/Modelo.service';
import { useMarcaService } from '@/services/Marca.service';
import { useSubcategoriaService } from '@/services/Subcategoria.service';

interface Props {
    hardwareParams: HardwareParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}


const HardwareFilterContainer = ({hardwareParams, modalState, dispatchModal}: Props) => {  
    const modeloService = useModeloService();
    const marcaService = useMarcaService();
    const subcategoriaService= useSubcategoriaService();
    
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

    if (fetchFilter.isLoading) {
      return <LoadingFilter />;
    }

    if (fetchFilter.error) {
      return <ErrorFilter />;
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