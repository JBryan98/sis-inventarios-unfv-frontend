import EscuelaTable from '@/components/escuela/table/EscuelaTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface EscuelaParams extends Pageable {
}

const EscuelaPage = ({searchParams}: {searchParams: EscuelaParams}) => {
  return (
    <div>
        <EscuelaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default EscuelaPage