import EquipoTable from '@/components/equipos/table/EquipoTable';
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface EquipoParams extends Pageable {
  referencia?: string;
}

const EquiposPage = ({searchParams}: {searchParams: EquipoParams}) => {
  return (
    <div>
        <EquipoTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EquiposPage