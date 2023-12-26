import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import ModalForm from '@/components/ui/form/ModalForm';
import { Grid } from '@mui/material';
import InputForm from '@/components/ui/form/InputForm';
import FormButtons from '@/components/ui/form/FormButtons';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import { Software, SoftwareRequest } from '@/interface/Software.interface';
import { SoftwareForm, softwareSchema } from './SoftwareValidation';
import { useSoftwareService } from '@/services/Software.service';
import { useSubcategoriaService } from '@/services/Subcategoria.service';
import { Subcategoria } from '@/interface/Subcategoria.interface';

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPeristed: Software, inser: boolean) => void;
  }

const SoftwareModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const softwareService = useSoftwareService();
    const subcategoriaService = useSubcategoriaService();
    const { notiSuccess, notiApiResponseError } = useNotification();
    const {control, handleSubmit, formState, setError, setValue, reset } = useForm<SoftwareForm>({
        defaultValues: {
          nombre: "",
          subcategoria: undefined,
        },
        resolver: yupResolver(softwareSchema)
    })

    useEffect(() => {
      if (modalState.id) {
        softwareService.findById(modalState.id).then((response) => {
            setValue("nombre", response.nombre),
            setValue("subcategoria", response.subcategoria);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id]);

    const onSubmit = (values: SoftwareForm) => {
        if(modalState.id){
          softwareService.update(modalState.id, values as SoftwareRequest)
          .then((response) => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Componente actualizado con éxito")
            reset();
          })
          .catch(error => {
            notiApiResponseError(error);
            setError("nombre", {
              type: "manual",
              message: error.message
            })
          })
        }else{
          softwareService.create(values as SoftwareRequest)
          .then((response) => {
            onPersist(response, true);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Componente creado con éxito")
            reset();
          })
          .catch(error => {
            notiApiResponseError(error);
            setError("nombre", {
              type: "manual",
              message: error.message
            })
          })        
        }
    }

    const subcategoriaData = useFetchApi<Subcategoria>({service: subcategoriaService, params: {
      size: "100",
      page: "1",
      categoria: "Software"
    }});
    

    return (
      <ModalForm
        open={modalState.createEditModal}
        title={modalState.id ? "Editar Software" : "Crear Software"}
        handleClose={() => dispatchModal({ type: "CLOSE" })}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
            <Grid item xs={6} lg={12}>
              <FormAutocomplete
                control={control}
                name="subcategoria"
                optId="id"
                optLabel="nombre"
                label="Subcategoría"
                fetchData={subcategoriaData}
              />
            </Grid>
            <Grid item xs={6} lg={12}>
              <InputForm
                control={control}
                name="nombre"
                label="Nombre"
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

export default SoftwareModalForm