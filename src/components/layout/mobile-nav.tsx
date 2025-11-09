"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items?type=lost", label: "Lost Items" },
    { href: "/items?type=found", label: "Found Items" },
    { href: "/report", label: "Report Item" },
    { href: "/dashboard", label: "Dashboard" },
  ]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Logo className="h-6 w-6 text-primary" />
            <span className="sr-only">FindMyStuff</span>
          </Link>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
