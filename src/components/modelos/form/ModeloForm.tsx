import { CreateModelo, Modelo } from '@/interface/Modelo.interface';
import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { ModeloForm, modeloSchema } from './ModeloValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import modeloService from '@/services/Modelo.service';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from "@mui/material";
import InputForm from '@/components/ui/form/InputForm';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import categoriaService from '@/services/Categoria.service';
import { Marca } from '@/interface/Marca.interface';
import { Categoria } from '@/interface/Categoria.interface';
import marcaService from '@/services/Marca.service';
import FormButtons from '@/components/ui/form/FormButtons';

interface Props {
    modalState: ModalState,
    dispatchModal: Dispatch<ModalReducerActions>,
    onPersist: (entityPeristed: Modelo, insert: boolean) => void;
  }

const ModeloForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const { notiSuccess, notiApiResponseError } = useNotification();
    const { control, handleSubmit, setError, setValue, reset } = useForm<ModeloForm>({
        defaultValues: {
            nombre: "",
            descripcion: "",
            categoria: undefined,
            marca: undefined
        },
        resolver: yupResolver(modeloSchema)
    });

    useEffect(() => {
        if(modalState.id){
            modeloService.findById(modalState.id)
            .then(response => {
                setValue("nombre", response.nombre);
                setValue("descripcion", response.descripcion);
                setValue("categoria", response.categoria);
                setValue("marca", response.marca);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id])

    const onSubmit = (values: ModeloForm) => {
        if(modalState.id){
            modeloService
            .update(modalState.id, values as CreateModelo)
            .then(response => {
                onPersist(response, false);
                dispatchModal({type: "CLOSE"});
                notiSuccess("Modelo actualizado con éxito");
                reset();
            })
            .catch(error => {
                notiApiResponseError(error)
                setError("nombre", {
                    type: "manual",
                    message: error.message
                })
            })
        }else{
            modeloService
            .create(values as CreateModelo)
            .then(response => {
                onPersist(response, true);
                dispatchModal({type: "CLOSE"});
                notiSuccess("Modelo creado con éxito");
                reset();
            })
            .catch(error => {
                notiApiResponseError(error)
                setError("nombre", {
                    type: "manual",
                    message: error.message
                })
            })
        }
    }

    const params: Record<string, string> = {
        page: "1",
        size: "100",
    }
    const categoriaData = useFetchApi<Categoria>(`${categoriaService.url}?${new URLSearchParams(params)}`)
    const marcaData = useFetchApi<Marca>(`${marcaService.url}?${new URLSearchParams(params)}`)

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Modelo" : "Crear Modelo"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
        <Grid item xs={6} lg={6}>
            <FormAutocomplete
              control={control}
              name="categoria"
              label="Categoría"
              fetchData={categoriaData}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <FormAutocomplete
              control={control}
              name="marca"
              label="Marca"
              fetchData={marcaData}
            />
          </Grid>
          <Grid item xs={6} lg={12}>
            <InputForm control={control} name="nombre" label="Nombre" />
          </Grid>
          <Grid item xs={6} lg={12}>
            <InputForm
              control={control}
              name="descripcion"
              label="Descripción"
            />
          </Grid>
          <FormButtons
            handleClose={() => {
              dispatchModal({ type: "CLOSE" });
              reset();
            }}
          />
        </Grid>
      </form>
    </ModalForm>
  );
}

export default ModeloForm