import ModalForm from '@/components/ui/form/ModalForm';
import { Categoria, CreateCategoria } from '@/interface/Categoria.interface'
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import React, { Dispatch, useEffect } from 'react'
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { CategoriaForm, categoriaSchema } from "./CategoriaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "@/components/ui/form/InputForm";
import FormButtons from '@/components/ui/form/FormButtons';
import { useCategoriaService } from '@/services/Categoria.service';
import { useNotification } from '@/utils/hooks/useNotification';

interface Props {
  modalState: ModalState,
  dispatchModal: Dispatch<ModalReducerActions>,
  onPersist: (entityPeristed: Categoria, inser: boolean) => void;
}

const CategoriaForm = ({modalState, dispatchModal, onPersist}: Props) => {
  const categoriaService = useCategoriaService();
  const { notiSuccess, notiApiResponseError } = useNotification();
  const {control, handleSubmit, formState, setError, setValue, reset } = useForm<CategoriaForm>({
    defaultValues: {
      nombre: ""
    },
    resolver: yupResolver(categoriaSchema)
  })

  useEffect(() => {
    if (modalState.id) {
      categoriaService.findById(modalState.id).then((response) => {
        setValue("nombre", response.nombre);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.id]);

  const onSubmit = (values: CategoriaForm) => {
    if(modalState.id){
      categoriaService
      .update(modalState.id, values as CreateCategoria)
      .then(response => {
        onPersist(response, false);
        dispatchModal({type: "CLOSE"})
        notiSuccess("Categoría actualizada con éxito")
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
      categoriaService
      .create(values as CreateCategoria)
      .then((response) => {
        onPersist(response, true);
        notiSuccess("Categoría creada con éxito")
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

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Categoría" : "Crear Categoría"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={12}>
            <InputForm control={control} name="nombre" label="Nombre" />
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

export default CategoriaForm