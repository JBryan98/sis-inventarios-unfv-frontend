import { EquiposTrabajoParams } from '@/app/equipos-de-trabajo/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import FormSelect from '@/components/ui/form/FormSelect';
import { Marca } from '@/interface/Marca.interface';
import { Modelo } from '@/interface/Modelo.interface';
import { Subcategoria } from '@/interface/Subcategoria.interface';
import FilterContainer from '@/utils/components/FilterContainer';
import { estadoOptions } from '@/utils/constants/Estado';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import {string, object, InferType} from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    equiposTrabajoParams: EquiposTrabajoParams;
    subcategorias: Subcategoria[];
    marcas: Marca[];
    modelos: Modelo[];
}

const EquiposTrabajoFilterForm = ({modalState, dispatchModal, equiposTrabajoParams, subcategorias, marcas, modelos}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        estado: string().optional().default(equiposTrabajoParams.estado || ""),
        marca: object().nullable().default(equiposTrabajoParams.marca ? marcas.find(m => m.nombre === equiposTrabajoParams.marca) : null),
        modelo: object().nullable().default(equiposTrabajoParams.modelo ? modelos.find(m => m.nombre === equiposTrabajoParams.modelo) : null),
        subcategoria: object().nullable().default(equiposTrabajoParams.subcategorias ? subcategorias.find(s => s.nombre === equiposTrabajoParams.subcategorias) : null)    
    })

    type EquiposTrabajoFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset, watch } = useForm<EquiposTrabajoFilterForm>({
        defaultValues: defaultValues.getDefault()
    });

    const onSubmit = (values: any) => {
        pushParamsToUrl({
            estado: values.estado,
            marca: values.marca?.nombre,
            modelo: values.modelo?.nombre,
            subcategorias: values.subcategoria?.nombre
        })
        dispatchModal({type: "CLOSE"})
    }

  return (
    <FilterContainer
      modalState={modalState}
      dispatchModal={dispatchModal}
      defaultValues={defaultValues.getDefault()}
      searchParams={equiposTrabajoParams}
      modalFormTitle="Filtrar Equipos de Trabajo"
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
          name="subcategoria"
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

export default EquiposTrabajoFilterForm