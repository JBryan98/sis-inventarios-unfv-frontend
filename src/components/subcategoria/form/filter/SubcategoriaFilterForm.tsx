import { SubcategoriaParams } from '@/app/subcategorias/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Categoria } from '@/interface/Categoria.interface';
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
    subcategoriaParams: SubcategoriaParams;
    categorias: Categoria[];
}

const SubcategoriaFilterForm = ({modalState, dispatchModal, subcategoriaParams, categorias}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
      categoria: object().nullable().default(subcategoriaParams.categoria ? categorias.find(c => c.nombre === subcategoriaParams.categoria) : null)
    })

    type SubcategoriaFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<SubcategoriaFilterForm>({
      defaultValues: defaultValues.getDefault(),
    });

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        categoria: values.categoria?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={subcategoriaParams}
        modalFormTitle="Filtrar Subcategorías"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <Grid item xs={6} lg={12}>
          <FormAutocomplete
            control={control}
            name="categoria"
            optId={"id"}
            optLabel={"nombre"}
            label="Categoría"
            data={categorias}
          />
        </Grid>
      </FilterContainer>
    );
}

export default SubcategoriaFilterForm