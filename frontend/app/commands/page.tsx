"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// @ts-ignore
import commandsData from "./commands.mdx"

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
    const categories: Category[] = commandsData.categories
    const [activeTab, setActiveTab] = useState(categories[0]?.name || "")

    return (
        <PageLayout>
            <div className="pt-32 md:pt-40 px-4 md:px-10 pb-10">
                <h1 className="text-white text-3xl font-bold mb-6">Commands</h1>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        {categories.map((cat) => (
                            <TabsTrigger key={cat.name} value={cat.name}>
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className={activeTab === cat.name ? "block" : "hidden"}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cat.commands.map((cmd) => (
                                <div
                                    key={cmd.name}
                                    className="bg-gray-900/50 border border-gray-800 p-4 rounded-md hover:border-[#FDFBD4]/50 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white font-mono text-lg">/{cmd.name}</span>
                                        {cmd.usage && (
                                            <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs font-mono">
                                                {cmd.usage}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm">{cmd.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    )
}
