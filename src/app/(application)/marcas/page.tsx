import MarcaTable from '@/components/marca/table/MarcaTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next'
import React from 'react'

export interface MarcaParams extends Pageable{

}

export const metadata: Metadata = {
  title: "Marcas - Sistema de inventarios de TI UNFV",
}

const page = ({searchParams}: {searchParams: MarcaParams}) => {
  return (
    <div>
        <MarcaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page