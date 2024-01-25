import CategoriaTable from '@/components/categoria/table/CategoriaTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface CategoriaParams extends Pageable{
  referencia?: string;
}

export const metadata: Metadata = {
  title: "Categorías - Sistema de inventarios de TI UNFV",
}

const page = ({searchParams}: {searchParams: CategoriaParams}) => {
  return (
    <div>
        <CategoriaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page