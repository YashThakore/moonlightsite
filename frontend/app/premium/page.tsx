"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, MicVocal, Bot, Crown, ShieldPlus } from "lucide-react"

const premiumFeatures = [
    { icon: Zap, text: "AI-powered commands" },
    { icon: MicVocal, text: "Artist features" },
    { icon: Bot, text: "Custom bot branding" },
    { icon: ShieldPlus, text: "Anti-nuke protection" },
    { icon: Crown, text: "Exclusive commands" },
    { icon: Zap, text: "Enhanced limits" },
]

const premiumPlans = [
    {
        title: "User Premium",
        description: "Access all premium commands across any server. Best for personal use.",
        price: "$5",
        buttonText: "Pay",
        link: "https://buy.stripe.com/aFa8wPbgy3tF0TS1Q23sI02",
    },
    {
        title: "Server Premium (One Guild)",
        description: "Unlock premium commands for one full server, ideal for communities.",
        price: "$10",
        buttonText: "Pay",
        link: "https://buy.stripe.com/8x2eVd98q2pB5a8eCO3sI03",
        popular: true,
    },
    {
        title: "Server Premium (Two Guilds)",
        description: "Premium access for two servers — perfect for networks.",
        price: "$15",
        buttonText: "Pay",
        link: "https://buy.stripe.com/3cIeVd3O67JV3200LY3sI04",
    },
]

export default function PremiumPage() {
    return (
        <PageLayout>
            <motion.section
                className="relative z-10 pt-32 pb-20 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4 text-white">Moonlight Premium</h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        Unlock exclusive features and enhancements with a Moonlight Premium plan
                    </p>

                    <div className="flex flex-col md:flex-row flex-wrap justify-center gap-x-20 gap-y-4 mb-12">
                        <div className="flex flex-col space-y-4 items-start">
                            {premiumFeatures.slice(0, 3).map(({ icon: Icon, text }, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <Icon className="h-6 w-6 text-[#FDFBD4]" />
                                    <span className="text-white">{text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-4 items-start">
                            {premiumFeatures.slice(3).map(({ icon: Icon, text }, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <Icon className="h-6 w-6 text-[#FDFBD4]" />
                                    <span className="text-white">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {premiumPlans.map((plan, idx) => (
                            <Card
                                key={idx}
                                className={`bg-[#111111] border border-gray-800 rounded-2xl shadow-md text-left p-6 flex flex-col h-full relative ${plan.popular ? "ring-2 ring-[#FDFBD4]" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 right-4 bg-[#FDFBD4] text-[#030303] text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-xl text-white">{plan.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-400 mt-1">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4 p-0 mt-auto">
                                    <div className="text-4xl font-bold text-[#FDFBD4]">{plan.price}</div>
                                    <Button
                                        size="lg"
                                        className="bg-[#FDFBD4] text-[#030303] hover:bg-[#f0f0c0] transition-colors"
                                        onClick={() => window.open(plan.link, "_blank")}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </motion.section>
        </PageLayout>
    )
}
