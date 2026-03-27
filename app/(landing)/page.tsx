'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, BarChart3, LayoutDashboard, Check, Zap } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { BackgroundCircles } from "@/components/ui/BGcircles/background-circles"
import { useState } from 'react'
import { Switch } from "@/components/ui/switch"


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
}

export default function Home() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="relative min-h-screen bg-black text-slate-200 overflow-x-hidden selection:bg-emerald-500/30 font-sans antialiased">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCircles 
          variant="primary" 
          backgroundOnly 
          className="opacity-40"
        />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Compact Hero Section */}
        <section className="pt-32 pb-16 flex flex-col items-center text-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] font-medium text-emerald-400 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v2.0 Live Now
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[16px] font-semibold tracking-tight text-white uppercase sm:text-lg">
              Feedback loops that actually close
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[14px] text-slate-400 max-w-md mx-auto leading-relaxed">
              Collect rich user insights in-app. Analyze with AI. Ship what users actually want without the survey fatigue.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" className="h-9 px-4 text-[14px] rounded-md bg-emerald-600 hover:bg-emerald-500 text-white border-none transition-all shadow-lg shadow-emerald-900/20">
                Get Started
              </Button>
              <Button size="sm" variant="outline" className="h-9 px-4 text-[14px] rounded-md border-slate-700 bg-white/5 backdrop-blur-md hover:bg-white/10">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Grid with 14px Gaps */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              { icon: LayoutDashboard, title: "Native Widgets", desc: "Pixel-perfect, theme-aware embeds for your app." },
              { icon: MessageSquare, title: "Smart Routing", desc: "Auto-sync feedback to Slack, Linear, or Notion." },
              { icon: BarChart3, title: "AI Insights", desc: "Identify themes and trends automatically with GPT-4." },
              { icon: Zap, title: "Real-time Updates", desc: "See feedback and analytics update live as users interact." },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 hover:border-emerald-500/40 transition-colors">
                  <CardContent className="p-4">
                    <feature.icon className="h-5 w-5 text-emerald-500 mb-3" />
                    <h3 className="text-[14px] font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-[12px] text-slate-400 leading-normal">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trusted Section */}
        <section className="py-16">
          <div className="text-center mb-8">
            <h2 className="text-[16px] font-bold text-white uppercase">Trusted by</h2>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div className="text-slate-400 text-[14px]">TechCorp</div>
            <div className="text-slate-400 text-[14px]">InnovateLabs</div>
            <div className="text-slate-400 text-[14px]">StartupXYZ</div>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="py-16">
          <div className="text-center mb-8">
            <h2 className="text-[16px] font-bold text-white uppercase">What our users say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-6">
                <p className="text-[14px] text-slate-300 mb-4">&apos;FeedLoop transformed how we gather and act on user feedback. The AI insights are game-changing.&apos;</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-[12px] font-medium text-white">Sarah Chen</p>
                    <p className="text-[10px] text-slate-400">Product Manager, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-6">
                <p className="text-[14px] text-slate-300 mb-4">&apos;The native widgets integrate seamlessly, and the real-time updates keep us informed.&apos;</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-[12px] font-medium text-white">Mike Johnson</p>
                    <p className="text-[10px] text-slate-400">CTO, InnovateLabs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Minimal Pricing */}
           
        <section className="py-16 border-t border-slate-800/50">
          <div className="text-center mb-4">
            <h2 className="text-[16px] font-bold text-white uppercase">Simple Pricing</h2>
          </div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-white font-medium' : 'text-slate-400'}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? 'text-white font-medium' : 'text-slate-400'}`}>Yearly</span>
            {isYearly && <span className="text-xs text-emerald-400 font-medium ml-2">Save 20%</span>}
          </div>
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-6">
            <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm hover:border-2 hover:border-emerald-500/60 transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Free Plan</span>
                <div className="text-[16px] font-bold text-white mb-4">$0<span className="text-[14px] font-normal text-slate-500">/mo</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm hover:border-2 hover:border-emerald-500/60 transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Pro Plan</span>
                <div className="text-[16px] font-bold text-white mb-4">${isYearly ? '182' : '19'}<span className="text-[14px] font-normal text-slate-500">{isYearly ? '/year' : '/mo'}</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-emerald-500/5 border-emerald-500/20 hover:border-2 hover:border-emerald-500/60 backdrop-blur-sm hover:translate-y-1 duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Enterprise Plan</span>
                <div className="text-[16px] font-bold text-white mb-4">${isYearly ? '374' : '39'}<span className="text-[14px] font-normal text-slate-500">{isYearly ? '/year' : '/mo'}</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="text-center">
            <h2 className="text-[18px] font-bold text-white mb-4">Ready to close your feedback loops?</h2>
            <p className="text-[14px] text-slate-400 mb-8">Join thousands of teams already using FeedLoop to collect and analyze user feedback.</p>
            <Button size="lg" className="h-12 px-8 text-[16px] rounded-md bg-emerald-600 hover:bg-emerald-500 text-white border-none transition-all shadow-lg shadow-emerald-900/20">
              Start Your Free Trial
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-emerald-500 rounded flex items-center justify-center text-black font-bold text-[12px]">F</div>
            <span className="text-[14px] font-bold text-white tracking-tight">FeedLoop</span>
          </div>
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} — Built for modern teams.
          </p>
        </footer>
      </main>
    </div>
  )
}