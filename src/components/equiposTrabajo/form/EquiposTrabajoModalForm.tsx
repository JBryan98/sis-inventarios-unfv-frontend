import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid, IconButton, InputAdornment, Tooltip } from '@mui/material';
import InputForm from '@/components/ui/form/InputForm';
import FormButtons from '@/components/ui/form/FormButtons';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import modeloService from '@/services/Modelo.service';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Modelo } from '@/interface/Modelo.interface';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { v4 as uuidv4 } from 'uuid';
import { EquiposTrabajo, EquiposTrabajoRequest } from '@/interface/EquiposTrabajo.interface';
import { EquiposTrabajoForm, equiposTrabajoSchema } from './EquiposTrabajoValidation';
import equiposTrabajoService from '@/services/EquiposTrabajo.service';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPeristed: EquiposTrabajo, inser: boolean) => void;
  }

const EquiposTrabajoModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const { notiSuccess, notiApiResponseError } = useNotification();
    const {control, handleSubmit, formState, setError, setValue, reset } = useForm<EquiposTrabajoForm>({
        defaultValues: {
          serie: "",
          modelo: undefined,
          //estado: "",
        },
        resolver: yupResolver(equiposTrabajoSchema)
    })

    useEffect(() => {
      if (modalState.id) {
        equiposTrabajoService.findById(modalState.id).then((response) => {
          setValue("serie", response.serie);
          setValue("modelo", response.modelo);
            //setValue("estado", response.estado);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id]);

    const onSubmit = (values: EquiposTrabajoForm) => {
        if(modalState.id){
            equiposTrabajoService.update(modalState.id, values as EquiposTrabajoRequest)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Equipo de Trabajo actualizado con éxito")
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
        equiposTrabajoService.create(values as EquiposTrabajoRequest)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Equipo de Trabajo creado con éxito")
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

    const modelosData = useFetchApi<Modelo>(modeloService.url + "?size=100&page=1&categoria=Equipos de Trabajo&sort=subcategoria.nombre%2Casc");
    

    return (
      <ModalForm
        open={modalState.createEditModal}
        title={modalState.id ? "Editar EquiposTrabajo" : "Crear EquiposTrabajo"}
        handleClose={() => dispatchModal({ type: "CLOSE" })}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
            <Grid item xs={6} lg={12}>
              <FormAutocomplete
                control={control}
                name="modelo"
                optId="id"
                optLabel="nombre"
                label="Modelo"
                fetchData={modelosData}
                autoCompleteProps={{
                  groupBy: (option: Modelo) => option.subcategoria.nombre
                }}
              />
            </Grid>
            <Grid item xs={6} lg={12}>
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
            {/* <Grid item xs={6} lg={6}>
              <FormSelect
                options={["Operativo", "Stock", "Baja", "Mantenimiento"]}
                control={control}
                name="estado"
                label="Estado"
              />
            </Grid> */}
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

export default EquiposTrabajoModalForm