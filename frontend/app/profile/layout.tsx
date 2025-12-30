import type React from "react"
import { LayoutWithNav } from "@/components/layout-with-nav"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWithNav>{children}</LayoutWithNav>
}
