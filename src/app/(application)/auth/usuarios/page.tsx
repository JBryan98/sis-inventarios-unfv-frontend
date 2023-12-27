import UsuarioTable from '@/auth/components/usuario/table/UsuarioTable';
import { Pageable } from '@/utils/interface/Pageable';
import React from 'react'

export interface UsuarioParams extends Pageable{
  referencia: string;
  rol: string;
}

const UsuariosPage = ({searchParams}: {searchParams: UsuarioParams}) => {
  return (
    <div>
      <UsuarioTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default UsuariosPage