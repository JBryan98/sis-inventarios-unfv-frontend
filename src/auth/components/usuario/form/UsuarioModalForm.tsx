import { useUsuarioService } from '@/services/Usuario.service'
import { useNotification } from '@/utils/hooks/useNotification';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { UsuarioForm, crearUsuarioSchema, editarUsuarioSchema } from './UsuarioValidation';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { Usuario } from '@/auth/interfaces/Usuario.interface';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from '@mui/material';
import InputForm from '@/components/ui/form/InputForm';
import FormButtons from '@/components/ui/form/FormButtons';
import PasswordInput from '@/components/ui/form/PasswordInput';
import { useRolService } from '@/services/Rol.service';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { Rol } from '@/auth/interfaces/Rol.interface';
import FormMultiSelect from '@/components/ui/form/FormMultiSelect';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPersisted: Usuario, insert: boolean) => void;
}

const UsuarioModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
  const usuarioService = useUsuarioService();
  const rolService = useRolService();
  const { notiSuccess, notiApiResponseError } = useNotification();
  const {control, handleSubmit, formState, setError, setValue, reset } = useForm<UsuarioForm>({
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      email: "",
      password: "",
      roles: [],
    },
    resolver: yupResolver(modalState.id ? editarUsuarioSchema : crearUsuarioSchema)
  })

  useEffect(() => {
    if(modalState.id) {
        usuarioService.findById(modalState.id).then(response => {
            setValue("nombres", response.nombres);
            setValue("apellidos", response.apellidos);
            setValue("dni", response.dni);
            setValue("email", response.email);
            setValue("roles", response.roles);
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.id])

  const onSubmit = (values: UsuarioForm) => {
    if (modalState.id) {
      usuarioService
        .update(modalState.id, values)
        .then((response) => {
          onPersist(response, false);
          dispatchModal({ type: "CLOSE" });
          notiSuccess("Usuario actualizado con éxito");
          reset();
        })
        .catch((error) => {
          notiApiResponseError(error);
          if (error.message.includes("dni")) {
            setError("dni", {
              type: "manual",
              message: error.message,
            });
          }
          if (error.message.includes("email")) {
            setError("email", {
              type: "manual",
              message: error.message,
            });
          }
        });
    } else {
      usuarioService
        .create(values)
        .then((response) => {
          onPersist(response, true);
          dispatchModal({ type: "CLOSE" });
          notiSuccess("Usuario actualizado con éxito");
          reset();
        })
        .catch((error) => {
          notiApiResponseError(error);
          if (error.message.includes("dni")) {
            setError("dni", {
              type: "manual",
              message: error.message,
            });
          }
          if (error.message.includes("email")) {
            setError("email", {
              type: "manual",
              message: error.message,
            });
          }
        });
    }
  };

  const rolesData = useFetchApi<Rol>({service: rolService, params: {size: "100"}})

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Usuario" : "Crear Usuario"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={6}>
            <InputForm control={control} name="nombres" label="Nombre" />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputForm control={control} name="apellidos" label="Apellidos" />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputForm control={control} name="email" label="Email" />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputForm control={control} name="dni" label="Dni" />
          </Grid>
          {!modalState.id && (
            <Grid item xs={6} lg={6}>
              <PasswordInput
                control={control}
                name="password"
                label="Contraseña"
              />
            </Grid>
          )}
          <Grid item xs={6} lg={!modalState.id ? 6 : 12}>
            <FormMultiSelect
              control={control}
              name="roles"
              label="Roles"
              fetchData={rolesData}
              optId="id"
              optLabel="nombre"
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

export default UsuarioModalForm