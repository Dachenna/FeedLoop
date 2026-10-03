'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { ModeToggle } from '../web/mode-toggle'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/products', label: 'Products' },
  { href: '/solution', label: 'Solution' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Sales' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? 'border-white/10 bg-zinc-950/80 backdrop-blur-md'
          : 'border-transparent bg-zinc-950/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight text-white">
          FeedLoop
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white transition-colors'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-zinc-300 hover:text-white hover:bg-white/10">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden text-zinc-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-zinc-950">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm text-zinc-300 border-b border-white/5 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
