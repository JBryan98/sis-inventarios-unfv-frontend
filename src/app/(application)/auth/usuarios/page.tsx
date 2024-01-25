import UsuarioTable from '@/auth/components/usuario/table/UsuarioTable';
import { Pageable } from '@/utils/interface/Pageable';
import { Metadata } from 'next';
import React from 'react'

export interface UsuarioParams extends Pageable{
  referencia?: string;
  rol?: string;
}

export const metadata: Metadata = {
  title: "Usuarios - Sistema de inventarios de TI UNFV",
}

const UsuariosPage = ({searchParams}: {searchParams: UsuarioParams}) => {
  return (
    <div>
      <UsuarioTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default UsuariosPage