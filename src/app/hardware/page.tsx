import HardwareTable from '@/components/hardware/table/HardwareTable'
import { Pageable } from '@/utils/interface/Pageable'
import React from 'react'

export interface HardwareParams extends Pageable{
}

const HardwarePage = ({searchParams}: {searchParams: HardwareParams}) => {
  return (
    <div>
        <HardwareTable urlSearchParams={searchParams}/>
    </div>
  )
}

export default HardwarePage