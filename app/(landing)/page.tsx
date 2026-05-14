'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Zap, BarChart3, Users, Sparkles, ArrowRight } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { BackgroundCircles } from "@/components/ui/BGcircles/background-circles"
import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import Link from "next/link"


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
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-200 overflow-x-hidden selection:bg-emerald-500/30 font-sans antialiased">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCircles 
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

            <motion.h1 variants={itemVariants} className="text-[16px] font-semibold tracking-tight text-black dark:text-white uppercase sm:text-lg">
              Feedback loops that actually close
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[14px] text-slate-700 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Collect rich user insights in-app. Analyze with AI. Ship what users actually want without the survey fatigue.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" className="h-9 px-4 text-[14px] rounded-md bg-emerald-600 hover:bg-emerald-500 text-white border-none transition-all shadow-lg shadow-emerald-900/20">
                <Link href='/auth/signup'>Get Started</Link>
              </Button>
              <Button size="sm" variant="outline" className="h-9 px-4 text-[14px] rounded-md border-emerald-500 bg-black backdrop-blur-md hover:bg-white/10 hover:shadow-emerald-900/50">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-bold text-black dark:text-white mb-3 uppercase tracking-tight">Why teams love FeedLoop</h2>
            <p className="text-[14px] sm:text-[16px] text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to collect, analyze, and act on user feedback in one platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Quick Setup</h3>
              <p className="text-[13px] text-slate-600 dark:text-slate-400">Get live surveys and feedback widgets running in minutes. No engineering required.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">AI-Powered Insights</h3>
              <p className="text-[13px] text-slate-600 dark:text-slate-400">Automatic sentiment analysis, trend detection, and actionable recommendations powered by AI.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">User-Centric Design</h3>
              <p className="text-[13px] text-slate-600 dark:text-slate-400">Beautiful, non-intrusive widgets that don&apos;t disrupt your user experience.</p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-bold text-black dark:text-white mb-3 uppercase tracking-tight">How it works</h2>
            <p className="text-[14px] sm:text-[16px] text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Three simple steps to close your feedback loops.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div variants={itemVariants} className="flex gap-6 items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Collect Feedback</h3>
                <p className="text-[13px] text-slate-600 dark:text-slate-400">Deploy NPS surveys, rating questions, or open-ended feedback forms directly in your app. Track responses in real-time with our intuitive dashboard.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Analyze with AI</h3>
                <p className="text-[13px] text-slate-600 dark:text-slate-400">Automatically extract themes, sentiment, and actionable insights from user feedback. Our AI learns your business context to provide smarter recommendations.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Take Action</h3>
                <p className="text-[13px] text-slate-600 dark:text-slate-400">Share insights with your team, prioritize features, and ship updates users actually want. Close the feedback loop with confidence.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trusted Section */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-[16px] font-bold text-black dark:text-white uppercase">Trusted by leading companies</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 text-[14px] font-medium">TechCorp</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 text-[14px] font-medium">InnovateLabs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 text-[14px] font-medium">StartupXYZ</span>
            </div>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-bold text-black dark:text-white uppercase mb-3 tracking-tight">What our users say</h2>
            <p className="text-[14px] sm:text-[16px] text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Hear from teams already closing their feedback loops.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md h-full hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-emerald-500">★</span>)}
                  </div>
                  <p className="text-[14px] text-black dark:text-slate-300 mb-auto grow">&apos;FeedLoop transformed how we gather and act on user feedback. The AI insights are game-changing.&apos;</p>
                  <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="h-10 w-10 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">SC</div>
                    <div>
                      <p className="text-[12px] font-semibold text-black dark:text-white">Sarah Chen</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Product Manager, TechCorp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md h-full hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-emerald-500">★</span>)}
                  </div>
                  <p className="text-[14px] text-black dark:text-slate-300 mb-auto grow">&apos;The native widgets integrate seamlessly, and the real-time updates keep us informed. Setup took just hours.&apos;</p>
                  <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="h-10 w-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">MJ</div>
                    <div>
                      <p className="text-[12px] font-semibold text-black dark:text-white">Mike Johnson</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">CTO, InnovateLabs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md h-full hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-emerald-500">★</span>)}
                  </div>
                  <p className="text-[14px] text-black dark:text-slate-300 mb-auto grow">&apos;We finally understand what users actually want. The ROI has been incredible.&apos;</p>
                  <div className="flex items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="h-10 w-10 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">ER</div>
                    <div>
                      <p className="text-[12px] font-semibold text-black dark:text-white">Emma Rodriguez</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">CEO, StartupXYZ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Minimal Pricing */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-bold text-black dark:text-white uppercase mb-3 tracking-tight">Simple Pricing</h2>
            <p className="text-[14px] sm:text-[16px] text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Transparent pricing that scales with your needs. Start free, upgrade anytime.</p>
          </div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-black dark:text-white font-medium' : 'text-slate-500'}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? 'text-black dark:text-white font-medium' : 'text-slate-500'}`}>Yearly</span>
            {isYearly && <span className="text-xs text-emerald-400 font-medium ml-2">Save 20%</span>}
          </div>
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-6">
            <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm hover:border-2 hover:border-emerald-500/60 transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Free Plan</span>
                <div className="text-[16px] font-bold text-gray-700 dark:text-white mb-4">$0<span className="text-[14px] font-normal text-slate-500">/mo</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-gray-600 dark:text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  <Link href="/auth/signup"> Start Free Trial </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm hover:border-2 hover:border-emerald-500/60 transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Pro Plan</span>
                <div className="text-[16px] font-bold text-black dark:text-white mb-4">${isYearly ? '182' : '19'}<span className="text-[14px] font-normal text-slate-500">{isYearly ? '/year' : '/mo'}</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-gray-600 dark:text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  <Link href="/auth/signup"> Start Free Trial </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-emerald-500/5 border-emerald-500/20 hover:border-2 hover:border-emerald-500/60 backdrop-blur-sm hover:translate-y-1 duration-200">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-[12px] text-emerald-400 font-bold uppercase mb-2">Enterprise Plan</span>
                <div className="text-[16px] font-bold text-gray-700 dark:text-white mb-4">${isYearly ? '374' : '39'}<span className="text-[14px] font-normal text-slate-500">{isYearly ? '/year' : '/mo'}</span></div>
                <ul className="w-full space-y-3 mb-6">
                  {["Unlimited Projects", "AI Sentiment Analysis", "Custom Branding"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-[12px] text-gray-600 dark:text-slate-300">
                      <Check className="h-3 w-3 text-emerald-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-9 bg-white text-black hover:bg-slate-200 text-[14px] font-medium">
                  <Link href="/auth/signup"> Start Free Trial </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <motion.h2 variants={itemVariants} className="text-[32px] sm:text-[40px] font-bold text-black dark:text-white mb-4 tracking-tight">Ready to close your feedback loops?</motion.h2>
            <motion.p variants={itemVariants} className="text-[14px] sm:text-[16px] text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">Join hundreds of teams already collecting and analyzing user feedback with FeedLoop. Start free, see results immediately.</motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-12 px-8 text-[16px] rounded-md bg-emerald-600 hover:bg-emerald-500 text-white border-none transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                <Link href="/auth/signup" className="flex items-center gap-2"> Get Started for Free <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-[16px] rounded-md border-slate-300 dark:border-slate-600 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50">
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 bg-emerald-500 rounded flex items-center justify-center text-black font-bold text-[12px]">F</div>
                <span className="text-[14px] font-bold text-black dark:text-white tracking-tight">FeedLoop</span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-400">Closing feedback loops one survey at a time.</p>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-black dark:text-white uppercase mb-4">Product</h4>
              <ul className="space-y-2 text-[12px] text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Features</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Pricing</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-black dark:text-white uppercase mb-4">Company</h4>
              <ul className="space-y-2 text-[12px] text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">About</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Blog</Link></li>
                <li><Link href="/landing/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-black dark:text-white uppercase mb-4">Connect</h4>
              <ul className="space-y-2 text-[12px] text-slate-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Twitter</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">GitHub</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} FeedLoop. All rights reserved.
            </p>
            <div className="flex gap-6 text-[12px]">
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Privacy</Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Terms</Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Cookies</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}