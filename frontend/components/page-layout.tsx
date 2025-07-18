import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-white relative overflow-hidden">
      {/* Animated Star Field Background */}
      <div className="fixed inset-0 z-0">
        <div className="stars"></div>
        <div className="shooting-stars"></div>
      </div>

      <Header />
      <main className="relative z-10 flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
