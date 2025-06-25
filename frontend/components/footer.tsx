import { Moon, Github, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 py-12 px-4 bg-[#030303]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Moon className="h-6 w-6 text-[#FDFBD4]" />
              <span className="text-lg font-bold">Moonlight</span>
            </div>
            <p className="text-gray-400 text-sm">The ultimate Discord bot for your server</p>
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Moonlight Discord Bot. All rights reserved.</div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FDFBD4]">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/#features" className="block text-gray-400 hover:text-white transition-colors">
                Add to Discord
              </Link>
              <Link href="/#commands" className="block text-gray-400 hover:text-white transition-colors">
                Commands
              </Link>
              <Link href="/#premium" className="block text-gray-400 hover:text-white transition-colors">
                Premium
              </Link>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FDFBD4]">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Support Server
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Bug Reports
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Feature Requests
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Status Page
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FDFBD4]">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/dmca" className="block text-gray-400 hover:text-white transition-colors">
                DMCA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
