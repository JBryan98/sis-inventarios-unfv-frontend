import { HardwareParams } from '@/app/hardware/page'
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import FormSelect from '@/components/ui/form/FormSelect';
import { Marca } from '@/interface/Marca.interface';
import { Modelo } from '@/interface/Modelo.interface';
import { Subcategoria } from '@/interface/Subcategoria.interface';
import { estadoOptions } from '@/utils/constants/Estado';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import {string, object, InferType} from "Yup";
import FilterContainer from '../../../../utils/components/FilterContainer';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    hardwareParams: HardwareParams;
    subcategorias: Subcategoria[];
    marcas: Marca[];
    modelos: Modelo[];
}

const HardwareFilterForm = ({hardwareParams, modalState, dispatchModal, subcategorias, marcas, modelos}: Props) => {
    const {pushParamsToUrl} = useParamsHandler();

    const defaultValues = object({
      estado: string().optional().default(hardwareParams.estado || ""),
      marca: object().nullable().default(hardwareParams.marca ? marcas.find(m => m.nombre === hardwareParams.marca) : null),
      modelo: object().nullable().default(hardwareParams.modelo ? modelos.find(m => m.nombre === hardwareParams.modelo) : null),
      subcategorias: object().nullable().default(hardwareParams.subcategorias ? subcategorias.find(s => s.nombre === hardwareParams.subcategorias) : null)
    })

    type HardwareFilterForm = InferType<typeof defaultValues>

    const {control, handleSubmit, reset, watch } = useForm<HardwareFilterForm>({
        defaultValues: defaultValues.getDefault()
    })

    const onSubmit = (values: any) => {
        pushParamsToUrl({
            estado: values.estado,
            marca: values.marca?.nombre,
            modelo: values.modelo?.nombre,
            subcategorias: values.subcategorias?.nombre,
        })
        dispatchModal({type: "CLOSE"});
    }

    console.log(hardwareParams)
    console.log(watch())

  return (
    <FilterContainer
      modalState={modalState}
      dispatchModal={dispatchModal}
      defaultValues={defaultValues.getDefault()}
      searchParams={hardwareParams}
      modalFormTitle="Filtrar Hardware"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <Grid item xs={6} lg={6}>
        <FormAutocomplete
          control={control}
          name="modelo"
          optId="id"
          optLabel="nombre"
          label="Modelo"
          data={modelos}
          autoCompleteProps={{
            groupBy: (option: Modelo) => option.subcategoria.nombre,
          }}
        />
      </Grid>
      <Grid item xs={6} lg={6}>
        <FormAutocomplete
          control={control}
          name="marca"
          optId={"id"}
          optLabel={"nombre"}
          data={marcas}
          label="Marca"
        />
      </Grid>
      <Grid item xs={6} lg={6}>
        <FormAutocomplete
          control={control}
          name="subcategorias"
          optId={"id"}
          optLabel={"nombre"}
          data={subcategorias}
          label="Subcategoría"
        />
      </Grid>
      <Grid item xs={6} lg={6}>
        <FormSelect
          options={estadoOptions}
          control={control}
          name="estado"
          label="Estado"
        />
      </Grid>
    </FilterContainer>
  );
}

export default HardwareFilterForm