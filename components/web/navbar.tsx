'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../web/mode-toggle";
import { Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //handel navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 left-0 right-0 transition-all duration-200 z-30
      ${scrolled ? "bg-transparent dark:bg-transparent backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div>
            <Link href='/' className="flex">
              <span className="text-2xl font-bold tracking-tight bg-linear-to-br from-green-700 to-cyan-500 text-transparent dark:text-blue-600
              dark:in-[bg-linear-to-tl from-blue-700 to-purple-500 ]  bg-clip-text ">FeedLoop
              </span>
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="hover:text-blue-300" >Products</Link>
            <Link href="/solution" className="hover:text-blue-300">Solution</Link>
            <Link href="/contact" className="hover:text-blue-300">Contact Sales</Link>
            <Link href="/about" className="hover:text-blue-300">About</Link>
            <Link href="/pricing" className="hover:text-blue-300">Pricing</Link>
          </div>
          {/* Button Links */}
          <div className="flex items-center space-x-2">
            <Button
              asChild
              variant="default"
              className="hover:translate-y-0.5 dark:bg-linear-to-bl dark:from-secondary dark:to-primary dark:text-slate-200"
            >
              <Link href="/auth/signup">Sign up</Link>
            </Button>

            <div className="ml-2">
              <ModeToggle />
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md z-20">
              <div className="px-4 py-2 space-y-2">
                <Link href="/products" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>Products</Link>
                <Link href="/solution" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>Solution</Link>
                <Link href="/contact" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>Contact Sales</Link>
                <Link href="/about" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>About</Link>
                <Link href="/pricing" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>Pricing</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
