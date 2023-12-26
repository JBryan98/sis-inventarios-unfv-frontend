import { FacultadRequest, Facultad } from "@/interface/Facultad.interface";
import { ModalReducerActions, ModalState } from "@/utils/reducers/CrudModalReducer";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FacultadForm, facultadSchema } from "./FacultadValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@/utils/hooks/useNotification";
import { useFacultadService } from "@/services/Facultad.service";
import ModalForm from "@/components/ui/form/ModalForm";
import { Grid } from "@mui/material";
import InputForm from "@/components/ui/form/InputForm";
import FormButtons from "@/components/ui/form/FormButtons";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    onPersist: (entityPersisted: Facultad, insert: boolean) => void;
}

const FacultadModalForm = ({modalState, dispatchModal, onPersist}: Props) => {
    const facultadService = useFacultadService();
    const { notiSuccess, notiApiResponseError } = useNotification();
    const { control, handleSubmit, setError, setValue, reset } = useForm<FacultadForm>({
        defaultValues: {
            nombre: "",
            abreviatura: ""
        },
        resolver: yupResolver(facultadSchema)
    })

    useEffect(() => {
        if(modalState.id){
            facultadService.findById(modalState.id)
            .then(response => {
                setValue("nombre", response.nombre);
                setValue("abreviatura", response.abreviatura);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState.id])

   const onSubmit = (values: FacultadForm) =>{
    if(modalState.id){
        facultadService
        .update(modalState.id, values as FacultadRequest)
        .then(response => {
            onPersist(response, false);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Facultad actualizada con éxito")
            reset()
        })
        .catch(error => {
            notiApiResponseError(error)
            setError("abreviatura", {
                type: "manual",
                message: error.message
            })
        })
    }else{
        facultadService
        .create(values as FacultadRequest)
        .then(response => {
            onPersist(response, true);
            dispatchModal({type: "CLOSE"})
            notiSuccess("Facultad creada con éxito")
            reset()
        })
        .catch(error => {
            notiApiResponseError(error)
            setError("abreviatura", {
                type: "manual",
                message: error.message
            })
        })
    }
   } 

  return (
    <ModalForm
      open={modalState.createEditModal}
      title={modalState.id ? "Editar Facultad" : "Crear Facultad"}
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

export default FacultadModalForm