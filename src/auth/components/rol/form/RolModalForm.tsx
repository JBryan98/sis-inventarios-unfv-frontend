import { Rol } from '@/auth/interfaces/Rol.interface';
import FormButtons from '@/components/ui/form/FormButtons';
import InputForm from '@/components/ui/form/InputForm';
import ModalForm from '@/components/ui/form/ModalForm';
import { useRolService } from '@/services/Rol.service';
import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { InferType, string, object } from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPersisted: Rol, insert: boolean) => void;
}

const RolModalForm = ({ modalState, dispatchModal, onPersist}: Props) => {
    const rolService = useRolService();

    const { notiSuccess, notiApiResponseError } = useNotification();

    const rolSchema = object({
        nombre: string().trim().required().default("")
    })

    type RolForm = InferType<typeof rolSchema>;

    const {control, handleSubmit, setError, setValue, reset } = useForm<RolForm>({
      defaultValues: rolSchema.getDefault(),
      resolver: yupResolver(rolSchema)
    })

    useEffect(() => {
        if(modalState.id){
            rolService.findById(modalState.id).then(response => {
                setValue("nombre", response.nombre);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id])

    const onSubmit = (values: RolForm) => {
      if (modalState.id) {
        rolService
          .update(modalState.id, values)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Rol actualizado con éxito");
            reset();
          })
          .catch((error) => {
            notiApiResponseError(error);
            setError("nombre", {
              type: "manual",
              message: error.message,
            });
          });
      } else {
        rolService
          .create(values)
          .then((response) => {
            onPersist(response, true);
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Rol creado con éxito");
            reset();
          })
          .catch((error) => {
            notiApiResponseError(error);
            setError("nombre", {
              type: "manual",
              message: error.message,
            });
          });
      }
    };
    
  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Rol" : "Crear Rol"}
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

export default RolModalForm