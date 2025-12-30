"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"

export function LayoutWithNav({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
