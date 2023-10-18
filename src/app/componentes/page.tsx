import ComponentesTable from '@/components/componentes/table/ComponentesTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface ComponenteParams extends Pageable{
}

const page = ({searchParams}: {searchParams: ComponenteParams}) => {
  return (
    <div>
        <ComponentesTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page