import ModeloTable from '@/components/modelos/table/ModeloTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface ModeloParams extends Pageable {
}

const page = ({searchParams}: {searchParams: ModeloParams }) => {
  return (
    <div>
        <ModeloTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page