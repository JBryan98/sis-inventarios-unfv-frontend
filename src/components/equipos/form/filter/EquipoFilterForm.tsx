import { EquipoParams } from '@/app/(application)/equipos/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import FormSelect from '@/components/ui/form/FormSelect';
import { Ubicacion } from '@/interface/Ubicacion.interface';
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
    equipoParams: EquipoParams;
    ubicaciones: Ubicacion[];
}

const EquipoFilterForm = ({ modalState, dispatchModal, equipoParams, ubicaciones}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        ubicacion: object().nullable().default(equipoParams.ubicacion ? ubicaciones.find(u => u.nombre === equipoParams.ubicacion) : null),
        estado: string().optional().default(equipoParams.estado || "")
    })

    type EquipoFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<EquipoFilterForm>({
        defaultValues: defaultValues.getDefault(),
    })

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        estado: values.estado,
        ubicacion: values.ubicacion?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={equipoParams}
        modalFormTitle="Filtrar Equipos"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <Grid item xs={6} lg={6}>
          <FormAutocomplete
            control={control}
            name="ubicacion"
            optId={"id"}
            optLabel={"nombre"}
            label="Ubicación"
            data={ubicaciones}
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

export default EquipoFilterForm