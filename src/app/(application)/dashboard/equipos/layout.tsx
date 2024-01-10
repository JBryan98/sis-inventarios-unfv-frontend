import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Equipos Dashboard - Sistema de inventarios de TI UNFV",
}

const EquiposDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default EquiposDashboardLayout