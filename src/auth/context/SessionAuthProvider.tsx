"use client"

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

interface Props {
    children: React.ReactNode;
    session?: Session;
}

const SessionAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionAuthProvider