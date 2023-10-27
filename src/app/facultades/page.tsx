import FacultadTable from '@/components/facultades/table/FacultadTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface FacultadParams extends Pageable{

}

const page = ({searchParams}: {searchParams: FacultadParams}) => {
  return (
    <div>
        <FacultadTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page