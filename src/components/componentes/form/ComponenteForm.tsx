import { Componente, CreateComponente } from '@/interface/Componentes.interface';
import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, useEffect } from 'react'
import { ComponenteForm, componenteSchema } from './ComponenteValidation';
import { useForm } from 'react-hook-form';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid, IconButton, InputAdornment, Tooltip } from '@mui/material';
import InputForm from '@/components/ui/form/InputForm';
import FormButtons from '@/components/ui/form/FormButtons';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import modeloService from '@/services/Modelo.service';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Modelo } from '@/interface/Modelo.interface';
import componenteService from '@/services/Componentes.service';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { v4 as uuidv4 } from 'uuid';
import FormSelect from '@/components/ui/form/FormSelect';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPeristed: Componente, inser: boolean) => void;
  }

const ComponenteModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const { notiSuccess, notiApiResponseError } = useNotification();
    const {control, handleSubmit, formState, setError, setValue, reset } = useForm<ComponenteForm>({
        defaultValues: {
          serie: "",
          modelo: undefined,
          estado: "",
        },
        resolver: yupResolver(componenteSchema)
    })

    useEffect(() => {
      if (modalState.id) {
        componenteService.findById(modalState.id).then((response) => {
          setValue("serie", response.serie),
            setValue("modelo", response.modelo),
            setValue("estado", response.estado);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id]);

    const onSubmit = (values: ComponenteForm) => {
        if(modalState.id){
          componenteService.update(modalState.id, values as CreateComponente)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Componente actualizado con éxito")
            reset();
          })
          .catch(error => {
            notiApiResponseError(error);
            setError("serie", {
              type: "manual",
              message: error.message
            })
          })
        }else{
          componenteService.create(values as CreateComponente)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Componente creado con éxito")
            reset();
          })
          .catch(error => {
            notiApiResponseError(error);
            setError("serie", {
              type: "manual",
              message: error.message
            })
          })        
        }
    }

    const generarSerie = () => {
      setValue("serie", uuidv4())
    }

    const modelosData = useFetchApi<Modelo>(modeloService.url + "?size=100&page=1");

    return (
      <ModalForm
        open={modalState.createEditModal}
        title={modalState.id ? "Editar Componentes" : "Crear Componentes"}
        handleClose={() => dispatchModal({ type: "CLOSE" })}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
            <Grid item xs={6} lg={12}>
              <FormAutocomplete
                control={control}
                name="modelo"
                label="Modelo"
                fetchData={modelosData}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <InputForm
                control={control}
                name="serie"
                label="Serie"
                textFieldProps={{
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Generar serie" placement="left">
                          <IconButton onClick={() => generarSerie()}>
                            <AutoFixHighIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <FormSelect
                options={["Operativo", "Stock", "Baja", "Mantenimiento"]}
                control={control}
                name="estado"
                label="Estado"
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

export default ComponenteModalForm