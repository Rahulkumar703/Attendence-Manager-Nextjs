"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function NextThemeProvider({ children }) {
    return (
        <ThemeProvider
            defaultTheme='system'
            storageKey='theme'
            disableTransitionOnChange={true}
        >
            {children}
        </ThemeProvider>
    )
}
