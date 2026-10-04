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
      className={`sticky top-0 z-40 border-b transition-shadow ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } border-zinc-200 bg-white/95 text-zinc-900 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/95 dark:text-white dark:shadow-black/40`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
          FeedLoop
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? 'text-zinc-950 dark:text-white font-medium'
                  : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden text-zinc-800 dark:text-zinc-200" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm text-zinc-800 border-b border-zinc-100 last:border-0 dark:text-zinc-200 dark:border-white/5"
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
