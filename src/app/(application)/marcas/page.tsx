import MarcaTable from '@/components/marca/table/MarcaTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface MarcaParams extends Pageable{

}

const page = ({searchParams}: {searchParams: MarcaParams}) => {
  return (
    <div>
        <MarcaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page