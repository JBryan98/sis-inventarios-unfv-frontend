import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Equipos de Trabajo Dashboard - Sistema de inventarios de TI UNFV",
}

const EquiposDeTrabajoDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default EquiposDeTrabajoDashboardLayout