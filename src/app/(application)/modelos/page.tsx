import ModeloTable from '@/components/modelos/table/ModeloTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface ModeloParams extends Pageable {
  referencia?: string;
  subcategorias?: string;
  categoria?: string;
  marca?: string;
}

export const metadata: Metadata = {
  title: "Modelos - Sistema de inventarios de TI UNFV",
}

const page = ({searchParams}: {searchParams: ModeloParams }) => {
  return (
    <div>
        <ModeloTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page