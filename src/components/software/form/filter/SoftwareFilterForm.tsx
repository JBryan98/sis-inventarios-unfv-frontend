import { SoftwareParams } from '@/app/(application)/software/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Subcategoria } from '@/interface/Subcategoria.interface';
import FilterContainer from '@/utils/components/FilterContainer';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import {string, object, InferType} from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    softwareParams: SoftwareParams;
    subcategorias: Subcategoria[];
}


const SoftwareFilterForm = ({modalState, dispatchModal, softwareParams, subcategorias}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        subcategoria: object().nullable().default(softwareParams.subcategoria ? subcategorias.find(s => s.nombre === softwareParams.subcategoria) : null)
    })

    type SoftwareFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<SoftwareFilterForm>({
      defaultValues: defaultValues.getDefault(),
    });

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        subcategoria: values.subcategoria?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={softwareParams}
        modalFormTitle="Filtrar Software"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <Grid item xs={6} lg={12}>
          <FormAutocomplete
            control={control}
            name="subcategoria"
            optId="id"
            optLabel="nombre"
            label="Subcategoría"
            data={subcategorias}
          />
        </Grid>
      </FilterContainer>
    );
}

export default SoftwareFilterForm