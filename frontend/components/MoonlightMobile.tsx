"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot, AlignJustify } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function MoonlightMobile() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleAddToDiscord = () => {
    setIsRedirecting(true)
    setTimeout(() => {
      window.open(
        "https://discord.com/oauth2/authorize?client_id=809245562615758898&permissions=8&scope=bot+applications.commands",
        "_blank"
      )
      setIsRedirecting(false)
    }, 600)
  }

  const features = [
    "Moderation",
    "Server Tools",
    "Information",
    "LastFM",
    "Fun & Games",
    "Roleplay",
    "Economy",
    "Search",
    "Artists",
  ]

  const commandCategories = [
    {
      name: "Moderation",
      commands: [
        { name: "/ban", desc: "Ban a user" },
        { name: "/kick", desc: "Kick a user" },
        { name: "/mute", desc: "Mute a user" },
        { name: "/warn", desc: "Warn a user" },
      ],
    },
    {
      name: "Music",
      commands: [
        { name: "/play", desc: "Play music" },
        { name: "/queue", desc: "View queue" },
        { name: "/skip", desc: "Skip song" },
        { name: "/volume", desc: "Adjust volume" },
      ],
    },
    {
      name: "LastFM",
      commands: [
        { name: "/fm", desc: "Now playing" },
        { name: "/fmset", desc: "Set LastFM username" },
        { name: "/fmtop", desc: "Top tracks/artists" },
        { name: "/fmcompare", desc: "Compare with user" },
      ],
    },
  ]

  const faqItems = [
    {
      question: "How do I add Moonlight to my server?",
      answer: "Click 'Add to Discord' and authorize with Manage Server permission."
    },
    {
      question: "What are the premium features?",
      answer: "AI commands, artist tools, branding, priority support, more."
    },
    {
      question: "How much does premium cost?",
      answer: "$4.99/month or $49.99/year."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, 7 days free for all new users."
    },
    {
      question: "How do I get support?",
      answer: "Join the support server or use /support."
    }
  ]

  return (
    <main className="bg-black text-white px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <img
          src="https://pbs.twimg.com/profile_images/1459679847115071495/ZOBwpWaf_400x400.jpg"
          alt="Moonlight Bot"
          className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#FDFBD4] bg-clip-text text-transparent">
          Moonlight
        </h1>
        <p className="text-gray-400 text-sm">Your All-in-One Discord Bot</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleAddToDiscord}
          disabled={isRedirecting}
          className="bg-[#FDFBD4] text-black hover:bg-[#f2f0e8] text-base py-6"
        >
          {isRedirecting ? (
            <><Bot className="mr-2 h-5 w-5 animate-spin" /> Redirecting...</>
          ) : (
            <><Bot className="mr-2 h-5 w-5" /> Add to Discord</>
          )}
        </Button>
        <Button className="bg-[#FDFBD4] text-black hover:bg-[#f2f0e8] text-base py-6">
          <AlignJustify className="mr-2 h-5 w-5" /> View Commands
        </Button>
      </div>

      {/* Features */}
      <section className="grid grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <motion.div key={i} className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center text-sm" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {feature}
          </motion.div>
        ))}
      </section>

      {/* Command Categories */}
      <section className="space-y-6">
        {commandCategories.map((cat, i) => (
          <motion.div key={i} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h3 className="text-lg font-semibold text-[#FDFBD4] mb-2">{cat.name}</h3>
            <ul className="space-y-2">
              {cat.commands.map((cmd, j) => (
                <li key={j} className="flex justify-between text-sm text-gray-300">
                  <code className="text-[#FDFBD4] font-mono">{cmd.name}</code>
                  <span>{cmd.desc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-[#111] border border-gray-800 rounded-lg">
              <AccordionTrigger className="text-left text-sm text-white px-4 py-2">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-gray-400 px-4 pb-2">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  )
}