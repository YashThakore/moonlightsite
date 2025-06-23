import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Mail, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function DmcaPage() {
  return (
    <PageLayout>
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#FDFBD4]/10 rounded-full border border-[#FDFBD4]/20">
                <FileText className="h-12 w-12 text-[#FDFBD4]" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#FDFBD4] bg-clip-text text-transparent">
              DMCA Policy
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              If you believe your copyrighted content is being used improperly via Moonlight, please follow the process
              below.
            </p>
            <div className="mt-6 text-sm text-gray-500">Last updated: January 2025</div>
          </div>

          {/* DMCA Content */}
          <div className="grid gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">Copyright Infringement Notice</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Moonlight respects the intellectual property rights of others. If you believe that your copyrighted
                  work has been copied in a way that constitutes copyright infringement through our service, please
                  provide us with the following information:
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Important:</strong> False claims may result in legal consequences. Ensure you have a good
                    faith belief that the use is not authorized.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">How to File a DMCA Notice</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-400 leading-relaxed">
                  Send a detailed email to <span className="text-[#FDFBD4] font-semibold">dmca@moonlightbot.dev</span>{" "}
                  with the following required information:
                </p>

                <div className="grid gap-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                    <h4 className="text-white font-semibold mb-2">1. Your Contact Information</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Full legal name</li>
                      <li>• Physical address</li>
                      <li>• Phone number</li>
                      <li>• Email address</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                    <h4 className="text-white font-semibold mb-2">2. Identification of Copyrighted Work</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Description of the copyrighted work</li>
                      <li>• Registration number (if applicable)</li>
                      <li>• URL or location of original work</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                    <h4 className="text-white font-semibold mb-2">3. Location of Infringing Material</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Discord server ID where infringement occurred</li>
                      <li>• Specific channel or message links</li>
                      <li>• Screenshots or evidence of infringement</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-[#FDFBD4]">
                    <h4 className="text-white font-semibold mb-2">4. Legal Statements</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Good faith belief statement</li>
                      <li>• Statement of accuracy under penalty of perjury</li>
                      <li>• Electronic or physical signature</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">Our Response Process</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Upon receiving a valid DMCA notice, we will take the following steps:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#FDFBD4] text-[#030303] rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      1
                    </div>
                    <h4 className="text-white font-semibold mb-2">Review</h4>
                    <p className="text-sm text-gray-400">We review your notice within 24-48 hours</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#FDFBD4] text-[#030303] rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      2
                    </div>
                    <h4 className="text-white font-semibold mb-2">Action</h4>
                    <p className="text-sm text-gray-400">Remove or disable access to infringing content</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#FDFBD4] text-[#030303] rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      3
                    </div>
                    <h4 className="text-white font-semibold mb-2">Notify</h4>
                    <p className="text-sm text-gray-400">Inform the alleged infringer of the takedown</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#FDFBD4]" />
                  <CardTitle className="text-2xl text-white">Counter-Notification</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  If you believe your content was removed in error, you may file a counter-notification. This must
                  include your contact information, identification of the removed content, and a statement under penalty
                  of perjury that the content was removed by mistake.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-200 text-sm">
                    <strong>Note:</strong> Counter-notifications are forwarded to the original complainant, who may then
                    file a lawsuit to keep the content disabled.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-[#FDFBD4]/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Repeat Infringer Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  We maintain a policy of terminating the accounts of users who are repeat infringers. Users who receive
                  multiple valid DMCA notices may have their access to Moonlight permanently disabled.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#FDFBD4]/10 to-yellow-500/10 rounded-2xl p-8 border border-[#FDFBD4]/20">
              <h3 className="text-2xl font-bold text-white mb-4">Need to File a DMCA Notice?</h3>
              <p className="text-gray-400 mb-6">
                Send your complete DMCA notice to our designated agent at{" "}
                <span className="text-[#FDFBD4] font-semibold">dmca@moonlightbot.dev</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:dmca@moonlightbot.dev"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#FDFBD4] text-[#030303] rounded-lg font-semibold hover:bg-[#F2F0EF] transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send DMCA Notice
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#FDFBD4] text-[#FDFBD4] rounded-lg font-semibold hover:bg-[#FDFBD4]/10 transition-colors"
                >
                  DMCA Template
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
