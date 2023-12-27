import RolTable from '@/auth/components/rol/table/RolTable';
import { Pageable } from '@/utils/interface/Pageable';
import React from 'react'

export interface RolParams extends Pageable{
  referencia: string;
}

const RolPage = ({searchParams}: {searchParams: RolParams}) => {
  return (
    <div>
      <RolTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default RolPage