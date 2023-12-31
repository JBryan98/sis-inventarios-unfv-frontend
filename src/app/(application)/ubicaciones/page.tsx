import UbicacionTable from '@/components/ubicacion/table/UbicacionTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface UbicacionParams extends Pageable {
  referencia: string;
  facultad: string;
}

const UbicacionesPage = ({searchParams}: {searchParams: UbicacionParams}) => {
  return (
    <div>
        <UbicacionTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default UbicacionesPage