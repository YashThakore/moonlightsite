"use client"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import MoonlightDesktop from "@/components/MoonlightDesktop"
import MoonlightMobile from "@/components/MoonlightMobile"

export default function Page() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return isMobile ? <MoonlightMobile /> : <MoonlightDesktop />
}
