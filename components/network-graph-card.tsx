"use client"

import { useState } from "react"
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkGraph } from "@/components/network-graph"
import { DraftModal } from "@/components/draft-modal"
import { cn } from "@/lib/utils"

interface Person {
  id: string
  name: string
  avatar: string
  role: string
  firm?: string
  notableDeals?: string[]
}

interface Connection {
  from: string
  to: string
  warmth: number
  context: string
}

interface NetworkData {
  you: Person
  connectors: Person[]
  targets: Person[]
  connections: Connection[]
}

interface Introduction {
  id: string
  connector: {
    name: string
    avatar: string
    role: string
  }
  targetVC: {
    name: string
    avatar: string
    firm: string
    notableDeals: string[]
  }
  warmthScore: number
  context: string
  allPaths?: Array<{
    connector: Person | undefined
    warmthToTarget: number
    warmthToConnector: number
    context: string
    overallWarmth: number
  }>
}

interface NetworkGraphCardProps {
  networkData?: NetworkData
  introduction?: Introduction
  compact?: boolean
}

const getWarmthColor = (score: number) => {
  if (score >= 85) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  if (score >= 60) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
}

export function NetworkGraphCard({ networkData, introduction, compact }: NetworkGraphCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAllPaths, setShowAllPaths] = useState(false)

  // Full network view
  if (networkData && !introduction) {
    return (
      <Card className="p-6 bg-card border-border overflow-hidden">
        <NetworkGraph
          you={networkData.you}
          connectors={networkData.connectors}
          targets={networkData.targets}
          connections={networkData.connections}
        />
      </Card>
    )
  }

  // Compact introduction card
  if (introduction && compact) {
    return (
      <>
        <Card className="p-4 bg-card border-border hover:border-ring/50 transition-colors">
          <div className="flex items-center gap-4">
            {/* Warmth score */}
            <div
              className={cn(
                "px-3 py-1.5 rounded-md border text-sm font-medium",
                getWarmthColor(introduction.warmthScore),
              )}
            >
              {introduction.warmthScore}%
            </div>

            {/* Mini path visualization */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] font-semibold text-primary-foreground">You</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <img
                src={introduction.connector.avatar || "/placeholder.svg"}
                alt={introduction.connector.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-emerald-500 max-w-[60px]" />
              <img
                src={introduction.targetVC.avatar || "/placeholder.svg"}
                alt={introduction.targetVC.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
              />
            </div>

            {/* Target info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{introduction.targetVC.name}</p>
              <p className="text-sm text-muted-foreground truncate">{introduction.targetVC.firm}</p>
            </div>

            {/* Connector info */}
            <div className="text-right hidden sm:block">
              <p className="text-sm text-muted-foreground">via {introduction.connector.name}</p>
              <p className="text-xs text-muted-foreground">{introduction.context}</p>
            </div>

            {/* Notable deals */}
            <div className="hidden md:flex flex-wrap gap-1 max-w-[180px]">
              {introduction.targetVC.notableDeals.slice(0, 3).map((deal) => (
                <Badge key={deal} variant="secondary" className="text-xs">
                  {deal}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {introduction.allPaths && introduction.allPaths.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllPaths(!showAllPaths)}
                  className="text-muted-foreground"
                >
                  {introduction.allPaths.length} paths
                  {showAllPaths ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </Button>
              )}
              <Button onClick={() => setIsModalOpen(true)} size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Draft Intro
              </Button>
            </div>
          </div>

          {/* Expandable alternate paths */}
          {showAllPaths && introduction.allPaths && introduction.allPaths.length > 1 && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Alternative Paths
              </p>
              {introduction.allPaths.slice(1).map((path, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className={cn("px-2 py-0.5 rounded text-xs font-medium", getWarmthColor(path.overallWarmth))}>
                    {path.overallWarmth}%
                  </div>
                  <span className="text-muted-foreground">via</span>
                  <span className="text-foreground">{path.connector?.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground text-xs">{path.context}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <DraftModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          introduction={{
            id: 1,
            connector: introduction.connector,
            targetVC: introduction.targetVC,
            warmthScore: introduction.warmthScore,
            context: introduction.context,
          }}
        />
      </>
    )
  }

  return null
}
