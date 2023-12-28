import FormButtons from '@/components/ui/form/FormButtons';
import ModalForm from '@/components/ui/form/ModalForm';
import PasswordInput from '@/components/ui/form/PasswordInput';
import { useUsuarioService } from '@/services/Usuario.service';
import { useNotification } from '@/utils/hooks/useNotification';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'Yup';

interface Props {
    email: string;
    setEmail: Dispatch<SetStateAction<string | null>>;
    openChangePasswordModal: boolean;
    setOpenChangePasswordModal: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordAdminModal = ({email, setEmail, openChangePasswordModal, setOpenChangePasswordModal}: Props) => {
  const usuarioService = useUsuarioService();
  const { notiSuccess, notiError } = useNotification();

  const changePasswordSchema = object({
    newPassword: string().required().min(8).default(""),
  });

  type ChangePasswordForm = InferType<typeof changePasswordSchema>;

  const { control, handleSubmit, reset } = useForm<ChangePasswordForm>({
    defaultValues: changePasswordSchema.getDefault(),
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (values: ChangePasswordForm) => {
    usuarioService
      .changePasswordAdmin(email, values)
      .then(() => {
        setEmail(null);
        notiSuccess("Se actualizo la contraseña con éxito");
        reset();
      })
      .catch((error) => {
        notiError(error.message);
      });
  };

  return (
    <ModalForm
      open={openChangePasswordModal}
      handleClose={() => setOpenChangePasswordModal(!openChangePasswordModal)}
      title={`Cambiar contraseña ${email}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid item xs={12}>
            <PasswordInput
              control={control}
              name="newPassword"
              label="Nueva contraseña"
            />
          </Grid>
          <FormButtons
            handleClose={() => {
              setOpenChangePasswordModal(!openChangePasswordModal);
              setEmail(null);
              reset();
            }}
          />
        </Grid>
      </form>
    </ModalForm>
  );
}

export default ChangePasswordAdminModal