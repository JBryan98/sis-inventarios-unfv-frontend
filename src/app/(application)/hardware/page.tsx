import HardwareTable from '@/components/hardware/table/HardwareTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface HardwareParams extends Pageable{
  estado: string;
  serie: string;
  subcategorias: string;
  modelo: string;
  marca: string;
}

export const metadata: Metadata = {
  title: "Hardware - Sistema de inventarios de TI UNFV",
}

const HardwarePage = ({searchParams}: {searchParams: HardwareParams}) => {
  return (
    <div>
        <HardwareTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default HardwarePage