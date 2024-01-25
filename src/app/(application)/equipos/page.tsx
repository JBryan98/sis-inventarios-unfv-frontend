import EquipoTable from '@/components/equipos/table/EquipoTable';
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface EquipoParams extends Pageable {
  referencia?: string;
  estado?: string;
  ubicacion?: string;
}

export const metadata: Metadata = {
  title: "Equipos - Sistema de inventarios de TI UNFV",
}

const EquiposPage = ({searchParams}: {searchParams: EquipoParams}) => {
  return (
    <div>
        <EquipoTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EquiposPage