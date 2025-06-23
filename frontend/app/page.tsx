"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Shield,
  Music,
  Users,
  Zap,
  Star,
  Crown,
  ChevronLeft,
  ChevronRight,
  AlignJustify,
  Loader2,
  Bot,
  Gamepad2,
  Search,
  Palette,
  DollarSign,
  Info,
} from "lucide-react"
import { LiveStatsSection } from "@/components/live-stats-section"
import { PageLayout } from "@/components/page-layout"

export default function MoonlightBot() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({
    servers: 0,
    commands: 0,
    users: 0,
  })
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleAddToDiscord = () => {
    setIsRedirecting(true)
    setTimeout(() => {
      window.open(
        "https://discord.com/oauth2/authorize?client_id=809245562615758898&permissions=8&scope=bot+applications.commands",
        "_blank",
        "noopener,noreferrer",
      )
      setIsRedirecting(false)
    }, 600)
  }

  // Animate stats when component mounts
  useEffect(() => {
    const animateStats = () => {
      const targetStats = { servers: 1250, commands: 150, users: 50000 }
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          servers: Math.floor(targetStats.servers * progress),
          commands: Math.floor(targetStats.commands * progress),
          users: Math.floor(targetStats.users * progress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setStats(targetStats)
        }
      }, stepDuration)
    }

    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Moderation",
      description: "Advanced moderation tools to keep your server safe and organized",
    },
    {
      icon: Users,
      title: "Server Tools",
      description: "Utility commands to enhance server management and user experience",
    },
    {
      icon: Info,
      title: "Information",
      description: "Get detailed information about users, servers, and Discord entities",
    },
    {
      icon: Music,
      title: "LastFM Integration",
      description: "Connect your music taste with LastFM integration and sharing",
    },
    {
      icon: Gamepad2,
      title: "Fun & Games",
      description: "Entertainment commands to keep your community engaged",
    },
    {
      icon: Bot,
      title: "Roleplay",
      description: "Interactive roleplay commands for creative communities",
    },
    {
      icon: DollarSign,
      title: "Economy",
      description: "Virtual economy system with currency and trading features",
    },
    {
      icon: Search,
      title: "Search",
      description: "Powerful search capabilities across various platforms",
    },
    {
      icon: Palette,
      title: "Artists",
      description: "Discover and share artwork from talented artists",
    },
  ]

  const commandCategories = [
    {
      name: "Moderation",
      commands: [
        { name: "/ban", description: "Ban a user from the server", usage: "/ban @user [reason]" },
        { name: "/kick", description: "Kick a user from the server", usage: "/kick @user [reason]" },
        { name: "/mute", description: "Mute a user in the server", usage: "/mute @user [duration] [reason]" },
        { name: "/warn", description: "Warn a user", usage: "/warn @user [reason]" },
      ],
    },
    {
      name: "Music",
      commands: [
        { name: "/play", description: "Play music from various sources", usage: "/play [song/url]" },
        { name: "/queue", description: "View the current music queue", usage: "/queue" },
        { name: "/skip", description: "Skip the current song", usage: "/skip" },
        { name: "/volume", description: "Adjust playback volume", usage: "/volume [1-100]" },
      ],
    },
    {
      name: "LastFM",
      commands: [
        { name: "/fm", description: "Show your current playing track", usage: "/fm [user]" },
        { name: "/fmset", description: "Set your LastFM username", usage: "/fmset [username]" },
        { name: "/fmtop", description: "Show top tracks/artists", usage: "/fmtop [tracks/artists] [period]" },
        { name: "/fmcompare", description: "Compare music taste with another user", usage: "/fmcompare @user" },
      ],
    },
    {
      name: "Fun",
      commands: [
        { name: "/8ball", description: "Ask the magic 8-ball a question", usage: "/8ball [question]" },
        { name: "/meme", description: "Get a random meme", usage: "/meme" },
        { name: "/joke", description: "Get a random joke", usage: "/joke" },
        { name: "/quote", description: "Get an inspirational quote", usage: "/quote" },
      ],
    },
  ]

  const testimonials = [
    {
      text: "Moonlight has transformed our server! The moderation tools are incredible and the LastFM integration is perfect for our music community.",
      author: "Alex",
      server: "Music Lovers Hub",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      text: "Best Discord bot we've ever used. The premium features are worth every penny and the support team is amazing!",
      author: "Sarah",
      server: "Gaming Paradise",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      text: "The economy system and fun commands keep our members engaged 24/7. Highly recommend Moonlight!",
      author: "Mike",
      server: "Community Central",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const faqItems = [
    {
      question: "How do I add Moonlight to my server?",
      answer:
        "Simply click the 'Add to Discord' button and follow the authorization process. Make sure you have the 'Manage Server' permission.",
    },
    {
      question: "What are the premium features?",
      answer:
        "Premium includes AI commands, advanced artist features, custom bot branding, priority support, and exclusive commands.",
    },
    {
      question: "How much does premium cost?",
      answer: "Premium is available for $4.99/month or $49.99/year with a 2-month discount.",
    },
    {
      question: "Is there a free trial for premium?",
      answer: "Yes! New users get a 7-day free trial of all premium features.",
    },
    {
      question: "How do I get support?",
      answer: "Join our support server or use the /support command in your server to get help from our team.",
    },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Left: Text Content */}
            <div className="text-left max-w-xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#FDFBD4] bg-clip-text text-transparent leading-tight font-outfit">
                Moonlight
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-300">Your All-in-One Discord Bot</p>
              <p className="text-lg mb-8 text-gray-400">
                Enhance your server with moderation, music, LastFM integration, and more
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToDiscord}
                  disabled={isRedirecting}
                  size="lg"
                  className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF] text-lg px-8 py-3"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-5 w-5" />
                      Add to Discord
                    </>
                  )}
                </Button>

                <Button size="lg" className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF] text-lg px-8 py-3">
                  <AlignJustify className="mr-2 h-5 w-5" />
                  View Commands
                </Button>
              </div>
            </div>

            {/* Right: Bot Image */}
            <div className="flex-shrink-0 flex justify-center md:justify-end">
              <img
                src="https://images-ext-1.discordapp.net/external/ulfSw2W1PCSP1AftfsXTbpdxbVKSeYjIpPFtl6yg26I/%3Fsize%3D512/https/cdn.discordapp.com/avatars/809245562615758898/887ed9384640bf56b8788d86a0e530ff.webp?format=webp&width=563&height=563"
                alt="Moonlight Bot"
                className="w-64 h-64 rounded-full shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <LiveStatsSection />

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-outfit">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create an amazing Discord server experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-[#FDFBD4] mb-2" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Command Showcase */}
      <section id="commands" className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-outfit">Command Showcase</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Explore our comprehensive command library</p>
          </div>

          <Tabs defaultValue="Moderation" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-900/50">
              {commandCategories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-[#030303]"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {commandCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-8">
                <div className="space-y-4">
                  {category.commands.map((command, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-2 md:mb-0">
                          <code className="text-[#FDFBD4] font-mono text-lg">{command.name}</code>
                          <p className="text-gray-400 mt-1">{command.description}</p>
                        </div>
                        <div className="text-sm text-gray-500 font-mono bg-gray-800 px-3 py-1 rounded">
                          {command.usage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Premium Section */}
      <section id="premium" className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#FDFBD4]/10 to-yellow-500/10 rounded-2xl p-8 border border-[#FDFBD4]/20">
              <Crown className="h-16 w-16 text-[#FDFBD4] mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 font-outfit">
                <span className="bg-gradient-to-r from-[#FDFBD4] to-yellow-400 bg-clip-text text-transparent">
                  Premium Features
                </span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Unlock the full potential of Moonlight with our premium subscription
              </p>

              <div className="flex justify-center mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-[#FDFBD4]" />
                      <span>AI-powered commands</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-[#FDFBD4]" />
                      <span>Advanced artist features</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bot className="h-5 w-5 text-[#FDFBD4]" />
                      <span>Custom bot branding</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-[#FDFBD4]" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Crown className="h-5 w-5 text-[#FDFBD4]" />
                      <span>Exclusive commands</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-[#FDFBD4]" />
                      <span>Enhanced limits</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Table Embed */}
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  {
                    title: "User Premium",
                    description: "Access all premium commands across any server. Best for personal use.",
                    price: "$5",
                    buttonText: "Pay",
                    link: "https://buy.stripe.com/aFa8wPbgy3tF0TS1Q23sI02",
                  },
                  {
                    title: "Server Premium (One Guild)",
                    description: "Unlock premium commands for one full server, ideal for communties.",
                    price: "$10",
                    buttonText: "Pay",
                    popular: true,
                    link: "https://buy.stripe.com/8x2eVd98q2pB5a8eCO3sI03",
                  },
                  {
                    title: "Server Premium (Two Guilds)",
                    description: "Premium access for two servers — perfect for networks.",
                    price: "$15",
                    buttonText: "Pay",
                    link: "https://buy.stripe.com/3cIeVd3O67JV3200LY3sI04",
                  },
                ].map((plan, idx) => (
                  <Card
                    key={idx}
                    className={`bg-[#111111] border border-gray-800 rounded-2xl shadow-md text-left p-6 relative ${
                      plan.popular ? "ring-2 ring-[#FDFBD4]" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-4 bg-[#FDFBD4] text-[#030303] text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl text-white">{plan.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-400 mt-1">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 p-0">
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
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-outfit">What Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of satisfied server owners</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8 text-center">
                  <p className="text-lg mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-[#FDFBD4]">{testimonials[currentTestimonial].author}</div>
                      <div className="text-sm text-gray-400">{testimonials[currentTestimonial].server}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-[#FDFBD4]" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-outfit">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Get answers to common questions about Moonlight</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:text-[#FDFBD4] transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
