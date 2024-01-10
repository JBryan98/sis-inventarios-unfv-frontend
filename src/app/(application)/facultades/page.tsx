import FacultadTable from '@/components/facultades/table/FacultadTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next'
import React from 'react'

export interface FacultadParams extends Pageable{

}

export const metadata: Metadata = {
  title: "Facultades - Sistema de inventarios de TI UNFV",
}

const page = ({searchParams}: {searchParams: FacultadParams}) => {
  return (
    <div>
        <FacultadTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page