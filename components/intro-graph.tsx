import { cn } from "@/lib/utils"

interface Introduction {
  connector: {
    name: string
    avatar: string
    role: string
  }
  targetVC: {
    name: string
    avatar: string
    firm: string
  }
  warmthScore: number
  context: string
}

interface IntroGraphProps {
  introduction: Introduction
}

export function IntroGraph({ introduction }: IntroGraphProps) {
  const { connector, targetVC, warmthScore, context } = introduction

  const getWarmthColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-zinc-500"
  }

  const getWarmthLineColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-zinc-600"
  }

  const getLineWidth = (score: number) => {
    if (score >= 90) return "h-1"
    if (score >= 60) return "h-0.5"
    return "h-px"
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Warmth Score Badge - moved to top */}
      <div className="flex justify-center">
        <div
          className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            warmthScore >= 90
              ? "bg-emerald-500/20 text-emerald-400"
              : warmthScore >= 60
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-zinc-500/20 text-zinc-400",
          )}
        >
          {warmthScore}% Warm
        </div>
      </div>

      {/* Graph nodes row */}
      <div className="flex items-center gap-2">
        {/* You Node */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary/20">
            <span className="text-sm font-semibold text-primary-foreground">You</span>
          </div>
          <span className="text-xs text-muted-foreground">Founder</span>
        </div>

        {/* First Connection Line */}
        <div className="flex-1 flex items-center min-w-[40px]">
          <div className="w-full h-px bg-border" />
          <div className="w-2 h-2 border-t border-r border-border rotate-45 -ml-1 flex-shrink-0" />
        </div>

        {/* Connector Node */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <img
            src={connector.avatar || "/placeholder.svg"}
            alt={connector.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
          />
          <span className="text-xs font-medium text-foreground whitespace-nowrap">{connector.name}</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{connector.role}</span>
        </div>

        {/* Warmth Connection Line */}
        <div className="flex-1 flex items-center min-w-[60px]">
          <div className={cn("w-full rounded-full", getWarmthLineColor(warmthScore), getLineWidth(warmthScore))} />
          <div
            className={cn(
              "w-2 h-2 border-t border-r rotate-45 -ml-1 flex-shrink-0",
              warmthScore >= 90 ? "border-emerald-500" : warmthScore >= 60 ? "border-yellow-500" : "border-zinc-600",
            )}
          />
        </div>

        {/* Target VC Node */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="relative">
            <img
              src={targetVC.avatar || "/placeholder.svg"}
              alt={targetVC.name}
              className={cn(
                "w-12 h-12 rounded-full object-cover ring-2",
                warmthScore >= 90 ? "ring-emerald-500" : warmthScore >= 60 ? "ring-yellow-500" : "ring-zinc-600",
              )}
            />
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white",
                getWarmthColor(warmthScore),
              )}
            >
              ✓
            </div>
          </div>
          <span className="text-xs font-medium text-foreground whitespace-nowrap">{targetVC.name}</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{targetVC.firm}</span>
        </div>
      </div>

      {/* Context - moved to bottom */}
      <div className="flex justify-center">
        <span className="text-xs text-muted-foreground">{context}</span>
      </div>
    </div>
  )
}
