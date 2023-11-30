import EquiposTrabajoTable from '@/components/equiposTrabajo/table/EquiposTrabajoTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface EquiposTrabajoParams extends Pageable{
}

const EquiposTrabajoPage = ({searchParams}: {searchParams: EquiposTrabajoParams}) => {
  return (
    <div>
        <EquiposTrabajoTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EquiposTrabajoPage