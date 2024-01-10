import UbicacionTable from '@/components/ubicacion/table/UbicacionTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface UbicacionParams extends Pageable {
  referencia: string;
  facultad: string;
}

export const metadata: Metadata = {
  title: "Ubicaciones - Sistema de inventarios de TI UNFV",
}

const UbicacionesPage = ({searchParams}: {searchParams: UbicacionParams}) => {
  return (
    <div>
        <UbicacionTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default UbicacionesPage