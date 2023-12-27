import { UsuarioParams } from '@/app/(application)/auth/usuarios/page';
import { Rol } from '@/auth/interfaces/Rol.interface';
import { useRolService } from '@/services/Rol.service';
import ErrorFilter from '@/utils/components/ErrorFilter';
import LoadingFilter from '@/utils/components/LoadingFilter';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import React, { Dispatch } from 'react'
import UsuarioFilterForm from './UsuarioFilterForm';

interface Props {
    usuarioParams: UsuarioParams;
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
}

const UsuarioFilterContainer = ({usuarioParams, modalState, dispatchModal}: Props) => {
  const rolService = useRolService();
  const roles = useFetchApi<Rol>({service: rolService, params: { size: "100" }});

  console.log(roles.isLoading)

  if (roles.isLoading) {
    return <LoadingFilter />;
  }

  if (roles.error) {
    return <ErrorFilter />;
  }

  return (
    <UsuarioFilterForm
      modalState={modalState}
      dispatchModal={dispatchModal}
      usuarioParams={usuarioParams}
      roles={roles.data?.content || []}
    />
  );
}

export default UsuarioFilterContainer