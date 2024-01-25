import RolTable from '@/auth/components/rol/table/RolTable';
import { Pageable } from '@/utils/interface/Pageable';
import { Metadata } from 'next';
import React from 'react'

export interface RolParams extends Pageable{
  referencia?: string;
}

export const metadata: Metadata = {
  title: "Roles - Sistema de inventarios de TI UNFV",
}

const RolPage = ({searchParams}: {searchParams: RolParams}) => {
  return (
    <div>
      <RolTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default RolPage