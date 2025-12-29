"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, GitBranch, Settings, Compass, UserPlus, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "find-intros", label: "Find Intros", icon: Search, href: "/" },
  { id: "my-path", label: "My Path", icon: TrendingUp, href: "/my-path" },
  { id: "network-overview", label: "Network Overview", icon: GitBranch, href: "/graph" },
  { id: "partner-portal", label: "Partner Portal", icon: UserPlus, href: "/partner" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">The Pathfinder</h1>
            <p className="text-xs text-muted-foreground">South Park Commons</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">YO</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Your Name</p>
            <p className="text-xs text-muted-foreground truncate">Founder</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
