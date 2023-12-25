import EquiposTrabajoTable from '@/components/equiposTrabajo/table/EquiposTrabajoTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface EquiposTrabajoParams extends Pageable{
  referencia: string;
  estado: string;
  subcategoria: string;
  modelo: string;
  marca: string;
}

const EquiposTrabajoPage = ({searchParams}: {searchParams: EquiposTrabajoParams}) => {
  return (
    <div>
        <EquiposTrabajoTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EquiposTrabajoPage