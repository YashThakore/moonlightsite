import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Crown, Scale } from "lucide-react"

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#FDFBD4]/10 rounded-full border border-[#FDFBD4]/20">
                <Scale className="h-12 w-12 text-[#FDFBD4]" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#FDFBD4] bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              By using Moonlight, you agree to abide by these Terms. These may change at any time without notice.
            </p>
            <div className="mt-6 text-sm text-gray-500">Last updated: January 2025</div>
          </div>

          {/* Terms Content */}
          <div className="grid gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">1. Usage Guidelines</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Moonlight is provided "as is" without any warranties. We are not responsible for misuse, bugs, or
                  server disruptions caused by the bot. Users must comply with Discord's Terms of Service and Community
                  Guidelines.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                  <p className="text-sm text-gray-300">
                    <strong>Important:</strong> Any attempt to exploit, abuse, or reverse-engineer the bot may result in
                    immediate termination of service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">2. Account Termination</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  We reserve the right to ban users or restrict access for abuse, fraud, violations of these terms, or
                  any behavior that negatively impacts our service or community.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                  <li>Spamming or flooding commands</li>
                  <li>Attempting to bypass rate limits</li>
                  <li>Using the bot for illegal activities</li>
                  <li>Harassment of other users or staff</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Crown className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">3. Premium Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Premium plans are non-refundable unless required by law. You can cancel your subscription anytime
                  through Stripe's customer portal. Premium features will remain active until the end of your billing
                  period.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Billing</h4>
                    <p className="text-sm text-gray-400">
                      All payments are processed securely through Stripe. Subscriptions auto-renew unless cancelled.
                    </p>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-[#FDFBD4] font-semibold mb-2">Cancellation</h4>
                    <p className="text-sm text-gray-400">
                      You have the ability to cancel and recieve a refund no more than 7 days after purchasing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">4. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Moonlight and its developers shall not be liable for any indirect, incidental, special, consequential,
                  or punitive damages resulting from your use of the service. Our total liability is limited to the
                  amount paid for premium services in the last 12 months.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">5. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  We may update these Terms of Service at any time. Continued use of Moonlight after changes constitutes
                  acceptance of the new terms. We recommend checking this page periodically for updates.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#FDFBD4]/10 to-yellow-500/10 rounded-2xl p-8 border border-[#FDFBD4]/20">
              <h3 className="text-2xl font-bold text-white mb-4">Questions about our Terms?</h3>
              <p className="text-gray-400 mb-6">
                If you have any questions about these Terms of Service, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@moonlightbot.dev"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#FDFBD4] text-[#030303] rounded-lg font-semibold hover:bg-[#F2F0EF] transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#FDFBD4] text-[#FDFBD4] rounded-lg font-semibold hover:bg-[#FDFBD4]/10 transition-colors"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
