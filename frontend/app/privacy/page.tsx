import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Users, Lock, Eye, Settings } from "lucide-react"

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#FDFBD4]/10 rounded-full border border-[#FDFBD4]/20">
                <Shield className="h-12 w-12 text-[#FDFBD4]" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#FDFBD4] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              This Privacy Policy describes how Moonlight handles data. We respect your privacy and are committed to
              protecting it.
            </p>
            <div className="mt-6 text-sm text-gray-500">Last updated: January 2025</div>
          </div>

          {/* Privacy Content */}
          <div className="grid gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Database className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">1. What We Collect</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  We only collect essential data necessary for Moonlight to function properly. No direct messages,
                  passwords, or sensitive personal information are stored.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Server Data
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Server settings and configurations</li>
                      <li>• Command usage statistics</li>
                      <li>• Moderation logs and warnings</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      User Data
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Discord user IDs</li>
                      <li>• User preferences and settings</li>
                      <li>• LastFM usernames (if linked)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Lock className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">2. How We Use Your Data</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Your data is used solely to provide and improve Moonlight's services. We never sell, rent, or share
                  your personal information with third parties for marketing purposes.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                  <h4 className="text-white font-semibold mb-2">Data Usage Purposes:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Providing bot functionality and features</li>
                    <li>• Maintaining server configurations</li>
                    <li>• Improving service quality and performance</li>
                    <li>• Preventing abuse and ensuring security</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">3. Third-Party Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  We integrate with trusted third-party services to enhance functionality. We only share the minimum
                  data required for these integrations to work.
                </p>
                <div className="grid gap-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Payment Processing</h4>
                    <p className="text-sm text-gray-400">
                      Stripe handles all payment processing. We never store credit card information.
                    </p>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Music Integration</h4>
                    <p className="text-sm text-gray-400">
                      LastFM integration requires your LastFM username for music tracking features.
                    </p>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Discord Platform</h4>
                    <p className="text-sm text-gray-400">
                      We operate within Discord's ecosystem and comply with their privacy policies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">4. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  You have full control over your data. You can request access, modification, or deletion of your
                  information at any time.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Access</h4>
                    <p className="text-sm text-gray-400">Request a copy of all data we have about you</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Modify</h4>
                    <p className="text-sm text-gray-400">Update or correct any inaccurate information</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Delete</h4>
                    <p className="text-sm text-gray-400">Request complete removal of your data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">5. Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  We implement industry-standard security measures to protect your data, including encryption, secure
                  servers, and regular security audits. However, no method of transmission over the internet is 100%
                  secure.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#FDFBD4]/10 to-yellow-500/10 rounded-2xl p-8 border border-[#FDFBD4]/20">
              <h3 className="text-2xl font-bold text-white mb-4">Questions about your Privacy?</h3>
              <p className="text-gray-400 mb-6">
                For data requests, privacy concerns, or any questions about this policy, contact us at{" "}
                <span className="text-[#FDFBD4] font-semibold">privacy@moonlightbot.dev</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@moonlightbot.dev"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#FDFBD4] text-[#030303] rounded-lg font-semibold hover:bg-[#F2F0EF] transition-colors"
                >
                  Contact Privacy Team
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#FDFBD4] text-[#FDFBD4] rounded-lg font-semibold hover:bg-[#FDFBD4]/10 transition-colors"
                >
                  Data Request Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
