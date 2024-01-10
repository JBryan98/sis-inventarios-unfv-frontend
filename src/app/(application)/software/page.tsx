import SoftwareTable from '@/components/software/table/SoftwareTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface SoftwareParams extends Pageable {
  referencia: string;
  subcategoria: string;
}

export const metadata: Metadata = {
  title: "Software - Sistema de inventarios de TI UNFV",
}

const SoftwarePage = ({searchParams}: {searchParams: SoftwareParams}) => {
  return (
    <div>
        <SoftwareTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default SoftwarePage