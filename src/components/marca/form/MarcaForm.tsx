import { CreateMarca, Marca } from '@/interface/Marca.interface';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { MarcaForm, marcaSchema } from './MarcaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMarcaService } from '@/services/Marca.service';
import { useNotification } from '@/utils/hooks/useNotification';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from '@mui/material';
import FormButtons from '@/components/ui/form/FormButtons';
import InputForm from '@/components/ui/form/InputForm';

interface Props {
  modalState: ModalState;
  dispatchModal: Dispatch<ModalReducerActions>;
  onPersist: (entityPeristed: Marca, inser: boolean) => void;
}

const MarcaForm = ({ modalState, dispatchModal, onPersist }: Props) => {
    const marcaService = useMarcaService();
    const { notiSuccess, notiApiResponseError } = useNotification();
    const {control, handleSubmit, formState, setError, setValue, reset } = useForm<MarcaForm>({
        defaultValues: {
          nombre: ""
        },
        resolver: yupResolver(marcaSchema)
    })

    useEffect(() => {
      if (modalState.id) {
        marcaService.findById(modalState.id).then((response) => {
          setValue("nombre", response.nombre);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id]);


    const onSubmit = (values: MarcaForm) => {
      if (modalState.id) {
        marcaService
          .update(modalState.id, values as CreateMarca)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Marca actualizada con éxito");
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
        marcaService
          .create(values as CreateMarca)
          .then((response) => {
            onPersist(response, true);
            notiSuccess("Marca actualizada con éxito");
            dispatchModal({ type: "CLOSE" });
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
      title={modalState.id ? "Editar Marca" : "Crear Marca"}
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

export default MarcaForm