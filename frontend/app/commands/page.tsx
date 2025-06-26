"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories } from "./commands"

interface Command {
  name: string
  description: string
  usage?: string
}

interface Category {
  name: string
  commands: Command[]
}

export default function CommandsPage() {
  const allCategories: Category[] = categories
  const [activeTab, setActiveTab] = useState(allCategories[0]?.name || "")
  const tabsListRef = useRef<HTMLDivElement>(null)

  return (
    <PageLayout>
      <div className="pt-32 md:pt-40 px-4 md:px-10 pb-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-white text-3xl font-bold mb-2 text-center">Commands</h1>

          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full overflow-hidden">
              <div ref={tabsListRef} className="overflow-x-auto scroll-smooth scrollbar-hide">
                <TabsList className="w-max bg-gray-900/50">
                  {allCategories.map((cat) => (
                    <TabsTrigger
                      key={cat.name}
                      value={cat.name}
                      className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-[#030303]"
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {allCategories.map((cat) =>
            cat.name === activeTab ? (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {cat.commands.map((cmd) => (
                    <div
                      key={cmd.name}
                      className="bg-gray-900/50 border border-gray-800 p-4 rounded-md hover:border-[#FDFBD4]/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-mono text-lg">{cmd.name}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{cmd.description}</p>
                      {cmd.usage && (
                        <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs font-mono">
                          {cmd.usage}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  )
}
