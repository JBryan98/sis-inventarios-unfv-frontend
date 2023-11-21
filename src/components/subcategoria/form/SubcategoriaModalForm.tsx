import { Subcategoria, SubcategoriaRequest } from '@/interface/Subcategoria.interface';
import { useNotification } from '@/utils/hooks/useNotification';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { SubcategoriaForm, subcategoriaSchema } from './SubcategoriaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import subcategoriaService from '@/services/Subcategoria.service';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from '@mui/material';
import FormButtons from '@/components/ui/form/FormButtons';
import InputForm from '@/components/ui/form/InputForm';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { Categoria } from '@/interface/Categoria.interface';
import categoriaService from '@/services/Categoria.service';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';

interface Props {
    modalState: ModalState,
    dispatchModal: Dispatch<ModalReducerActions>,
    onPersist: (entityPeristed: Subcategoria, insert: boolean) => void;
  }

const SubcategoriaModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const { notiSuccess, notiApiResponseError } = useNotification();
    const {control, handleSubmit, formState, setError, setValue, reset } = useForm<SubcategoriaForm>({
      defaultValues: {
        nombre: "",
        categoria: undefined,
      },
      resolver: yupResolver(subcategoriaSchema)
    })
  
    useEffect(() => {
      if (modalState.id) {
        subcategoriaService.findById(modalState.id).then((response) => {
          setValue("nombre", response.nombre);
          setValue("categoria", response.categoria);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id]);
  
    const onSubmit = (values: SubcategoriaForm) => {
      if(modalState.id){
        subcategoriaService
        .update(modalState.id, values as SubcategoriaRequest)
        .then(response => {
          onPersist(response, false);
          dispatchModal({type: "CLOSE"})
          notiSuccess("Subcategoria actualizada con éxito")
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
        subcategoriaService
        .create(values as SubcategoriaRequest)
        .then((response) => {
          onPersist(response, true);
          notiSuccess("Subcategoria creada con éxito")
          dispatchModal({type: "CLOSE"})
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

  const categoriaData = useFetchApi<Categoria>(categoriaService.url)  
  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Subcategoría" : "Crear Subcategoría"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={12}>
            <InputForm control={control} name="nombre" label="Nombre" />
          </Grid>
          <Grid item xs={6} lg={12}>
            <FormAutocomplete
                optId={"id"}
                optLabel={"nombre"}
                control={control}
                label='Categoría'
                name='categoria'
                fetchData={categoriaData}
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
    </ModalForm>  )
}

export default SubcategoriaModalForm