import SoftwareTable from '@/components/software/table/SoftwareTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface SoftwareParams extends Pageable {
}

const SoftwarePage = ({searchParams}: {searchParams: SoftwareParams}) => {
  return (
    <div>
        <SoftwareTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default SoftwarePage