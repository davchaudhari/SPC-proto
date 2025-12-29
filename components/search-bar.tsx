"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for a firm or partner (e.g., Sequoia, Roelof)..."
        className="w-full pl-12 pr-4 py-6 text-base bg-secondary border-border focus:border-ring"
      />
    </div>
  )
}
