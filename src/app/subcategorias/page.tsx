import SubcategoriaTable from '@/components/subcategoria/table/SubcategoriaTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface SubcategoriaParams extends Pageable {
  referencia: string;
  categoria: string;
}

const SubcategoriaPage = ({searchParams}: {searchParams: SubcategoriaParams}) => {
  return (
    <div>
        <SubcategoriaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default SubcategoriaPage