import ModalForm from '@/components/ui/form/ModalForm';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import React, { Dispatch, useEffect } from 'react'
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "@/components/ui/form/InputForm";
import FormButtons from '@/components/ui/form/FormButtons';
import { useNotification } from '@/utils/hooks/useNotification';
import { EquipoForm } from './CrearEquipoValidation';
import { useEquipoService } from '@/services/Equipo.service';
import { EquipoRequest } from '@/interface/EquipoConComponentes';
import { EditarEquipoForm, editarEquipoSchema } from './EditarEquipoValidation';
import { Equipo } from '@/interface/Equipo.interface';
import FormSelect from '@/components/ui/form/FormSelect';

interface Props {
  modalState: ModalState,
  dispatchModal: Dispatch<ModalReducerActions>,
  onPersist: (entityPeristed: Equipo, insert: boolean) => void;
}

const EquipoModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
  const equipoService=  useEquipoService();
  const { notiSuccess, notiApiResponseError } = useNotification();
  const {control, handleSubmit, formState, setError, setValue, reset } = useForm<EditarEquipoForm>({
    defaultValues: {
      nombre: "",
      estado: "",
      ubicacion: "",
      hardware: [],
      software: []
    },
    resolver: yupResolver(editarEquipoSchema)
  })


  useEffect(() => {
    if (modalState.id) {
      equipoService.findById(modalState.id).then((response: any) => {
        setValue("nombre", response.nombre);
        setValue("ubicacion", response.ubicacion)
        setValue("estado", response.estado);
        setValue("hardware", response.hardware);
        setValue("software", response.software)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.id]);

  const onSubmit = (values: EquipoForm) => {
    if(modalState.id){
      equipoService
      .update(modalState.id, values as EquipoRequest)
      .then(response => {
        onPersist(response, false);
        dispatchModal({type: "CLOSE"})
        notiSuccess("Equipo actualizado con éxito")
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
    equipoService
      .create(values as EquipoRequest)
      .then((response) => {
        onPersist(response, true);
        notiSuccess("Equipo creado con éxito")
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
      title={modalState.id ? "Editar Equipo" : "Crear Equipo"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={12}>
            <InputForm control={control} name="nombre" label="Nombre" />
          </Grid>
          <Grid item xs={6} lg={12}>
            <FormSelect
              control={control}
              label='Estado'
              name='estado'
              options={["Stock", "Operativo", "Baja", "Mantenimiento"]}
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

export default EquipoModalForm