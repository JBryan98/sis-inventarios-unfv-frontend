import { ModeloParams } from '@/app/modelos/page';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Categoria } from '@/interface/Categoria.interface';
import { Marca } from '@/interface/Marca.interface';
import { Subcategoria } from '@/interface/Subcategoria.interface';
import FilterContainer from '@/utils/components/FilterContainer';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import { object, InferType} from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    modeloParams: ModeloParams;
    categorias: Categoria[];
    subcategorias: Subcategoria[];
    marcas: Marca[];
}

const ModeloFilterForm = ({modalState, dispatchModal, modeloParams, categorias, subcategorias, marcas}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        marca: object().nullable().default(modeloParams.marca ? marcas.find(m => m.nombre === modeloParams.marca) : null),
        subcategorias: object().nullable().default(modeloParams.subcategorias ? subcategorias.find(s => s.nombre === modeloParams.subcategorias) : null),
        categoria: object().nullable().default(modeloParams.categoria ? categorias.find(c => c.nombre === modeloParams.categoria) : null)
    })

    type ModeloFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<ModeloFilterForm>({
        defaultValues: defaultValues.getDefault()
    })

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        marca: values.marca?.nombre,
        categoria: values.categoria?.nombre,
        subcategorias: values.subcategoria?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={modeloParams}
        modalFormTitle="Filtrar Modelos"
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
            data={categorias.filter(categoria => categoria.nombre !== "Software")}
            label="Categoría"
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
      </FilterContainer>
    );
}

export default ModeloFilterForm