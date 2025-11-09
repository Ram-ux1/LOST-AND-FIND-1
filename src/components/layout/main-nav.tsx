"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const navLinks = [
    { href: "/items?type=lost", label: "Lost Items" },
    { href: "/items?type=found", label: "Found Items" },
    { href: "/report", label: "Report Item" },
  ]
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "transition-colors hover:text-foreground",
            pathname === href ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </>
  )
}
