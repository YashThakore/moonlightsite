"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Bot } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-[#030303]/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://pbs.twimg.com/profile_images/1459679847115071495/ZOBwpWaf_400x400.jpg"
              alt="Moonlight Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold">Moonlight</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="hover:text-[#FDFBD4] transition-colors">
              Features
            </Link>
            <Link href="/#commands" className="hover:text-[#FDFBD4] transition-colors">
              Commands
            </Link>
            <Link href="/#premium" className="hover:text-[#FDFBD4] transition-colors">
              Premium
            </Link>
            <Link href="/#support" className="hover:text-[#FDFBD4] transition-colors">
              Support
            </Link>
<Link href="/dashboard">
  <Button className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF]">
    <Bot className="mr-2 h-4 w-4" />
    Dashboard
  </Button>
</Link>

          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/#features" className="hover:text-[#FDFBD4] transition-colors">
                Features
              </Link>
              <Link href="/#commands" className="hover:text-[#FDFBD4] transition-colors">
                Commands
              </Link>
              <Link href="/#premium" className="hover:text-[#FDFBD4] transition-colors">
                Premium
              </Link>
              <Link href="/#support" className="hover:text-[#FDFBD4] transition-colors">
                Support
              </Link>
<Link href="/dashboard" className="w-full">
  <Button className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF] w-full">
    <Bot className="mr-2 h-4 w-4" />
    Dashboard
  </Button>
</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
