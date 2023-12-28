import FormButtons from '@/components/ui/form/FormButtons';
import ModalForm from '@/components/ui/form/ModalForm';
import PasswordInput from '@/components/ui/form/PasswordInput';
import { useUsuarioService } from '@/services/Usuario.service';
import { useNotification } from '@/utils/hooks/useNotification';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { InferType, object, string, ref } from 'Yup';

interface Props {
    openChangePassswordModal: boolean;
    setChangePassswordModal: Dispatch<SetStateAction<boolean>>;
}

const ChangeMyPasswordModal = ({openChangePassswordModal, setChangePassswordModal}: Props) => {
    const usuarioService = useUsuarioService();
    const { notiSuccess, notiError } = useNotification();

    const changeMyPasswordSchema = object({
        oldPassword: string().required().default(""),
        newPassword: string().required().min(8).default(""), 
        confirmPassword: string().required().min(8).oneOf([ref('newPassword')], 'Las contraseñas no coinciden').default(""),
    })

    type ChangeMyPasswordForm = InferType<typeof changeMyPasswordSchema>;

    const { control, handleSubmit, reset, setError } = useForm<ChangeMyPasswordForm>({
      defaultValues: changeMyPasswordSchema.getDefault(),
      resolver: yupResolver(changeMyPasswordSchema),
    });

    const onSubmit = (values: ChangeMyPasswordForm) => {
      usuarioService
        .changeMyPassword(values)
        .then(() => {
          setChangePassswordModal(!openChangePassswordModal);
          notiSuccess("Se actualizo la contraseña con éxito");
          reset();
        })
        .catch((error) => {
          setError("oldPassword", {
            type: "manual",
            message: error.message,
          });
        });
    };
  return (
    <ModalForm
      open={openChangePassswordModal}
      handleClose={() => setChangePassswordModal(!openChangePassswordModal)}
      title="Cambiar mi contraseña"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={12}>
            <PasswordInput
              name="oldPassword"
              label="Antigua contraseña"
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <PasswordInput
              name="newPassword"
              label="Nueva contraseña"
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <PasswordInput
              name="confirmPassword"
              label="Confirmar contraseña"
              control={control}
            />
          </Grid>
          <FormButtons
            handleClose={() => {
              setChangePassswordModal(!openChangePassswordModal);
              reset();
            }}
          />
        </Grid>
      </form>
    </ModalForm>
  );
}

export default ChangeMyPasswordModal