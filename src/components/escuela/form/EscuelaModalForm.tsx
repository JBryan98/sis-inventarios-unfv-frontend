import { Escuela, EscuelaRequest } from '@/interface/Escuela.interface';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch, useEffect } from 'react'
import { EscuelaForm, escuelaSchema } from './EscuelaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotification } from '@/utils/hooks/useNotification';
import { useForm } from 'react-hook-form';
import escuelaService from '@/services/Escuela.service';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from '@mui/material';
import InputForm from '@/components/ui/form/InputForm';
import FormButtons from '@/components/ui/form/FormButtons';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import facultadService from '@/services/Facultad.service';
import { Facultad } from '@/interface/Facultad.interface';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPersisted: Escuela, insert: boolean) => void;
}


const EscuelaModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const { notiSuccess, notiApiResponseError } = useNotification();
    const { control, handleSubmit, setError, setValue, reset } = useForm<EscuelaForm>({
        defaultValues: {
            nombre: "",
            abreviatura: "",
            facultad: undefined
        },
        resolver: yupResolver(escuelaSchema)
    })

    useEffect(() => {
        if(modalState.id){
            escuelaService.findById(modalState.id)
            .then(response => {
                setValue("nombre", response.nombre);
                setValue("abreviatura", response.abreviatura);
                setValue("facultad", response.facultad);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id])

    const facultades = useFetchApi<Facultad>(facultadService.url + "?size=100")

    const onSubmit = (values: EscuelaForm) => {
      if (modalState.id) {
        escuelaService
          .update(modalState.id, values as EscuelaRequest)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Escuela actualizada con éxito");
            reset();
          })
          .catch((error) => {
            notiApiResponseError(error);
            setError("abreviatura", {
              type: "manual",
              message: error.message,
            });
          });
      } else {
        escuelaService
          .create(values as EscuelaRequest)
          .then((response) => {
            onPersist(response, true);
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Escuela creada con éxito");
            reset();
          })
          .catch((error) => {
            notiApiResponseError(error);
            if (error.message.includes("abreviatura")) {
              setError("abreviatura", {
                type: "manual",
                message: error.message,
              });
            }
            if (error.message.includes("nombre")) {
              setError("nombre", {
                type: "manual",
                message: error.message,
              });
            }
          });
      }
    };

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Escuela" : "Crear Escuela"}
      handleClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={6} lg={8}>
            <InputForm control={control} name="nombre" label="Nombre" />

          </Grid>
          <Grid item xs={6} lg={4}>
            <InputForm control={control} name="abreviatura" label="Abreviatura" />
          </Grid>
          <Grid item xs={6} lg={12}>
            <FormAutocomplete
                label='Facultad'
                name='facultad'
                control={control}
                fetchData={facultades}
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
  )
}

export default EscuelaModalForm