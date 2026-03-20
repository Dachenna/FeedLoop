'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageSquare, BarChart3, LayoutDashboard, Check, Zap } from "lucide-react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { BackgroundCircles } from "@/components/ui/BGcircles/background-circles"

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
              { icon: BarChart3, title: "AI Insights", desc: "Identify themes and trends automatically with GPT-4." }
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

        {/* Minimal Pricing */}
        <section className="py-16 border-t border-slate-800/50">
          <div className="text-center mb-4">
            <h2 className="text-[16px] font-bold text-white uppercase">Simple Pricing</h2>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Pro Plan</span>
                <div className="text-[16px] font-bold text-white mb-4">$29<span className="text-[14px] font-normal text-slate-500">/mo</span></div>
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