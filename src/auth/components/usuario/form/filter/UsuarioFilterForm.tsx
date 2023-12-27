import { UsuarioParams } from '@/app/(application)/auth/usuarios/page';
import { Rol } from '@/auth/interfaces/Rol.interface';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import FilterContainer from '@/utils/components/FilterContainer';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { Grid } from '@mui/material';
import React, { Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import { object, InferType} from "Yup";

interface Props {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    usuarioParams: UsuarioParams;
    roles: Rol[];
}

const UsuarioFilterForm = ({modalState, dispatchModal, usuarioParams, roles}: Props) => {
    const { pushParamsToUrl } = useParamsHandler();

    const defaultValues = object({
        rol: object().nullable().default(usuarioParams.rol ? roles.find(r => r.nombre === usuarioParams.rol) : null)
    })

    type RolFilterForm = InferType<typeof defaultValues>;

    const { control, handleSubmit, reset } = useForm<RolFilterForm>({
      defaultValues: defaultValues.getDefault(),
    });

    const onSubmit = (values: any) => {
      pushParamsToUrl({
        rol: values.rol?.nombre,
      });
      dispatchModal({ type: "CLOSE" });
    };

    return (
      <FilterContainer
        modalState={modalState}
        dispatchModal={dispatchModal}
        defaultValues={defaultValues.getDefault()}
        searchParams={usuarioParams}
        modalFormTitle="Filtrar Usuarios"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <Grid item xs={6} lg={12}>
          <FormAutocomplete
            control={control}
            name="rol"
            optId="id"
            optLabel="nombre"
            label="Rol"
            data={roles}
          />
        </Grid>
      </FilterContainer>
    );
}

export default UsuarioFilterForm