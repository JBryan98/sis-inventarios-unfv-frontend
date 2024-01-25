import SubcategoriaTable from '@/components/subcategoria/table/SubcategoriaTable'
import { Pageable } from '@/utils/interface/Pageable'
import { Metadata } from 'next';
import React from 'react'

export interface SubcategoriaParams extends Pageable {
  referencia?: string;
  categoria?: string;
}

export const metadata: Metadata = {
  title: "Subcategorías - Sistema de inventarios de TI UNFV",
}

const SubcategoriaPage = ({searchParams}: {searchParams: SubcategoriaParams}) => {
  return (
    <div>
        <SubcategoriaTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default SubcategoriaPage