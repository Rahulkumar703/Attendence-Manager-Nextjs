"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function NextThemeProvider({ children, ...props }) {
    return (
        <ThemeProvider {...props}>{children}</ThemeProvider>
    )
}
