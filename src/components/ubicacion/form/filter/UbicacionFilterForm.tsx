import { UbicacionParams } from '@/app/ubicaciones/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Facultad } from '@/interface/Facultad.interface';
import FilterContainer from '@/utils/components/FilterContainer';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import { object, InferType} from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    ubicacionParams: UbicacionParams;
    facultades: Facultad[];
}

const UbicacionFilterForm = ({modalState, dispatchModal, ubicacionParams, facultades}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        facultad: object().nullable().default(ubicacionParams.facultad ? facultades.find(f => f.nombre === ubicacionParams.facultad) : null)
    })

    type UbicacionFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<UbicacionFilterForm>({
      defaultValues: defaultValues.getDefault(),
    });

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        facultad: values.facultad?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={ubicacionParams}
        modalFormTitle="Filtrar Ubicaciones"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <Grid item xs={6} lg={12}>
          <FormAutocomplete
            control={control}
            name="facultad"
            optId="id"
            optLabel="nombre"
            label="Facultad"
            data={facultades}
          />
        </Grid>
      </FilterContainer>
    );
}

export default UbicacionFilterForm