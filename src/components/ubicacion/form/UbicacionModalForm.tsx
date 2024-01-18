import ModalForm from '@/components/ui/form/ModalForm';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import React, { Dispatch, useEffect } from 'react'
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "@/components/ui/form/InputForm";
import FormButtons from '@/components/ui/form/FormButtons';
import { useNotification } from '@/utils/hooks/useNotification';
import { Ubicacion, UbicacionRequest } from '@/interface/Ubicacion.interface';
import { EditarUbicacionForm, editarUbicacionSchema } from './EditarEquipoValidation';
import { useUbicacionService } from '@/services/Ubicacion.service';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { useFacultadService } from '@/services/Facultad.service';
import { Facultad } from '@/interface/Facultad.interface';

interface Props {
  modalState: ModalState,
  dispatchModal: Dispatch<ModalReducerActions>,
  onPersist: (entityPeristed: Ubicacion, insert: boolean) => void;
}

const UbicacionModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
  const ubicacionService = useUbicacionService();
  const facultadService = useFacultadService();
  const { notiSuccess, notiApiResponseError } = useNotification();
  const {control, handleSubmit, formState, setError, setValue, reset } = useForm<EditarUbicacionForm>({
    defaultValues: {
      nombre: "",
      facultad: undefined,
    },
    resolver: yupResolver(editarUbicacionSchema)
  })

  useEffect(() => {
    if (modalState.id) {
      ubicacionService.findById(modalState.id).then((response: any) => {
        setValue("nombre", response.nombre);
        setValue("facultad", response.facultad);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.id]);

  const onSubmit = (values: EditarUbicacionForm) => {
    if(modalState.id){
      ubicacionService
      .update(modalState.id, values as UbicacionRequest)
      .then(response => {
        onPersist(response, false);
        dispatchModal({type: "CLOSE"})
        notiSuccess("Ubicacion actualizado con éxito")
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
        ubicacionService
      .create(values as UbicacionRequest)
      .then((response) => {
        onPersist(response, true);
        notiSuccess("Ubicacion creado con éxito")
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

  const facultadData = useFetchApi<Facultad>({service: facultadService, params: {size: "100", page: "1"}})

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Ubicacion" : "Crear Ubicacion"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={12}>
            <InputForm control={control} name="nombre" label="Nombre" />
          </Grid>
          <Grid item xs={6} lg={12}>
            <FormAutocomplete
              control={control}
              optId={"id"}
              optLabel={"nombre"}
              fetchData={facultadData}
              name="facultad"
              label="Facultad"
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

export default UbicacionModalForm