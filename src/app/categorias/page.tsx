import CategoriaTable from '@/components/categoria/table/CategoriaTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface CategoriaParams extends Pageable{

}

const page = ({searchParams}: {searchParams: CategoriaParams}) => {
  return (
    <div>
        <CategoriaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default page