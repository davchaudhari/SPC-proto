"use client"

import { useState } from "react"
import { Plus, Search, Trash2, Edit2, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddInvestorModal } from "@/components/add-investor-modal"
import { cn } from "@/lib/utils"

interface Investor {
  id: number
  name: string
  avatar: string
  firm: string
  role: string
  warmthScore: number
  context: string
  addedDate: string
}

const initialInvestors: Investor[] = [
  {
    id: 1,
    name: "Roelof Botha",
    avatar: "/professional-man-headshot-sequoia.jpg",
    firm: "Sequoia Capital",
    role: "Partner",
    warmthScore: 92,
    context: "Former Colleagues at Bridgewater",
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Alfred Lin",
    avatar: "/professional-asian-man-venture-capitalist.jpg",
    firm: "Sequoia Capital",
    role: "Partner",
    warmthScore: 78,
    context: "Co-invested in 2 deals",
    addedDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Andrew Chen",
    avatar: "/professional-asian-man-a16z-partner.jpg",
    firm: "Andreessen Horowitz",
    role: "General Partner",
    warmthScore: 45,
    context: "Met at SPC Demo Day 2023",
    addedDate: "2023-12-05",
  },
]

export function InvestorManager() {
  const [investors, setInvestors] = useState<Investor[]>(initialInvestors)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterFirm, setFilterFirm] = useState<string | null>(null)

  const firms = Array.from(new Set(investors.map((i) => i.firm)))

  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.firm.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFirm = !filterFirm || investor.firm === filterFirm
    return matchesSearch && matchesFirm
  })

  const handleAddInvestor = (newInvestor: Omit<Investor, "id" | "addedDate">) => {
    setInvestors([
      ...investors,
      {
        ...newInvestor,
        id: Date.now(),
        addedDate: new Date().toISOString().split("T")[0],
      },
    ])
  }

  const handleDeleteInvestor = (id: number) => {
    setInvestors(investors.filter((i) => i.id !== id))
  }

  const getWarmthColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500/20 text-emerald-400"
    if (score >= 60) return "bg-yellow-500/20 text-yellow-400"
    return "bg-zinc-500/20 text-zinc-400"
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{investors.length}</p>
              <p className="text-sm text-muted-foreground">Total Investors</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{firms.length}</p>
              <p className="text-sm text-muted-foreground">VC Firms</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <span className="text-yellow-500 font-semibold">%</span>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {Math.round(investors.reduce((acc, i) => acc + i.warmthScore, 0) / investors.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Warmth</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions Row */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search investors or firms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filterFirm === null ? "secondary" : "ghost"} size="sm" onClick={() => setFilterFirm(null)}>
            All
          </Button>
          {firms.map((firm) => (
            <Button
              key={firm}
              variant={filterFirm === firm ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilterFirm(firm)}
            >
              {firm}
            </Button>
          ))}
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Investor
        </Button>
      </div>

      {/* Investors List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Your Investor Connections
          </h2>
          <span className="text-sm text-muted-foreground">{filteredInvestors.length} investors</span>
        </div>

        <div className="space-y-3">
          {filteredInvestors.map((investor) => (
            <Card key={investor.id} className="p-4 bg-card border-border hover:border-ring/50 transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={investor.avatar || "/placeholder.svg"}
                  alt={investor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{investor.name}</h3>
                    <Badge className={cn("text-xs", getWarmthColor(investor.warmthScore))}>
                      {investor.warmthScore}% Warm
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {investor.role} at {investor.firm}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{investor.context}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteInvestor(investor.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AddInvestorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddInvestor} />
    </div>
  )
}
