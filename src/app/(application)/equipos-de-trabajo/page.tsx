import EquiposTrabajoTable from '@/components/equiposTrabajo/table/EquiposTrabajoTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface EquiposTrabajoParams extends Pageable{
  referencia?: string;
  estado?: string;
  subcategoria?: string;
  modelo?: string;
  marca?: string;
}

export const metadata: Metadata = {
  title: "Equipos de Trabajo - Sistema de inventarios de TI UNFV",
}

const EquiposTrabajoPage = ({searchParams}: {searchParams: EquiposTrabajoParams}) => {
  return (
    <div>
        <EquiposTrabajoTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EquiposTrabajoPage