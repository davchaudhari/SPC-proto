"use client"

import { cn } from "@/lib/utils"

interface Person {
  id: string
  name: string
  avatar: string
  role: string
  firm?: string
}

interface Connection {
  from: string
  to: string
  warmth: number
  context: string
}

interface NetworkGraphProps {
  you: Person
  connectors: Person[]
  targets: Person[]
  connections: Connection[]
  highlightedPath?: string[]
}

// VC Firm colors
const firmColors: Record<string, { bg: string; border: string; text: string; region: string }> = {
  SPC: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-400", region: "bg-blue-500/10" },
  "Sequoia Capital": {
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    text: "text-emerald-400",
    region: "bg-emerald-500/10",
  },
  "Andreessen Horowitz": {
    bg: "bg-orange-500",
    border: "border-orange-500",
    text: "text-orange-400",
    region: "bg-orange-500/10",
  },
  "Founders Fund": {
    bg: "bg-purple-500",
    border: "border-purple-500",
    text: "text-purple-400",
    region: "bg-purple-500/10",
  },
  Benchmark: { bg: "bg-red-500", border: "border-red-500", text: "text-red-400", region: "bg-red-500/10" },
  "Greylock Partners": {
    bg: "bg-cyan-500",
    border: "border-cyan-500",
    text: "text-cyan-400",
    region: "bg-cyan-500/10",
  },
  "Kleiner Perkins": {
    bg: "bg-yellow-500",
    border: "border-yellow-500",
    text: "text-yellow-400",
    region: "bg-yellow-500/10",
  },
  "Lightspeed Venture Partners": {
    bg: "bg-pink-500",
    border: "border-pink-500",
    text: "text-pink-400",
    region: "bg-pink-500/10",
  },
  default: { bg: "bg-zinc-500", border: "border-zinc-500", text: "text-zinc-400", region: "bg-zinc-500/10" },
}

const getFirmColor = (firm: string | undefined) => {
  return firmColors[firm || ""] || firmColors.default
}

const getWarmthColor = (score: number) => {
  if (score >= 85) return { line: "stroke-emerald-500", bg: "bg-emerald-500/20", text: "text-emerald-400" }
  if (score >= 60) return { line: "stroke-yellow-500", bg: "bg-yellow-500/20", text: "text-yellow-400" }
  return { line: "stroke-zinc-600", bg: "bg-zinc-500/20", text: "text-zinc-400" }
}

export function NetworkGraph({ you, connectors, targets, connections, highlightedPath }: NetworkGraphProps) {
  // Group targets by firm
  const targetsByFirm = targets.reduce(
    (acc, target) => {
      const firm = target.firm || "Other"
      if (!acc[firm]) acc[firm] = []
      acc[firm].push(target)
      return acc
    },
    {} as Record<string, Person[]>,
  )

  // Calculate positions
  const youPosition = { x: 60, y: 200 }
  const connectorStartX = 180
  const connectorSpacing = 70
  const targetStartX = 450
  const firmSpacing = 140

  // Assign positions to connectors
  const connectorPositions = connectors.map((c, i) => ({
    ...c,
    x: connectorStartX,
    y: 60 + i * connectorSpacing,
  }))

  // Assign positions to targets grouped by firm
  let currentY = 30
  const firmRegions: { firm: string; x: number; y: number; width: number; height: number; people: typeof targets }[] =
    []
  const targetPositions: (Person & { x: number; y: number })[] = []

  Object.entries(targetsByFirm).forEach(([firm, people]) => {
    const regionHeight = Math.max(people.length * 65 + 40, 100)
    firmRegions.push({
      firm,
      x: targetStartX - 20,
      y: currentY,
      width: firmSpacing,
      height: regionHeight,
      people,
    })

    people.forEach((person, i) => {
      targetPositions.push({
        ...person,
        x: targetStartX + 30,
        y: currentY + 35 + i * 65,
      })
    })

    currentY += regionHeight + 15
  })

  const svgHeight = Math.max(currentY + 20, 450)

  return (
    <div className="relative w-full overflow-x-auto">
      <svg width="620" height={svgHeight} className="min-w-[620px]">
        {/* Firm region backgrounds */}
        {firmRegions.map((region) => {
          const colors = getFirmColor(region.firm)
          return (
            <g key={region.firm}>
              <rect
                x={region.x}
                y={region.y}
                width={region.width}
                height={region.height}
                rx="12"
                className={cn("fill-current opacity-10", colors.text)}
              />
              <text
                x={region.x + region.width / 2}
                y={region.y + 18}
                textAnchor="middle"
                className={cn("fill-current text-[10px] font-medium", colors.text)}
              >
                {region.firm.length > 15 ? region.firm.split(" ")[0] : region.firm}
              </text>
            </g>
          )
        })}

        {/* Connection lines */}
        {connections.map((conn, i) => {
          const fromPerson =
            conn.from === "you"
              ? { ...you, ...youPosition }
              : connectorPositions.find((c) => c.id === conn.from) || targetPositions.find((t) => t.id === conn.from)
          const toPerson =
            connectorPositions.find((c) => c.id === conn.to) || targetPositions.find((t) => t.id === conn.to)

          if (!fromPerson || !toPerson) return null

          const warmthColor = getWarmthColor(conn.warmth)
          const isHighlighted = highlightedPath?.includes(conn.from) && highlightedPath?.includes(conn.to)

          // Calculate control point for curved line
          const midX = (fromPerson.x + toPerson.x) / 2
          const midY = (fromPerson.y + toPerson.y) / 2
          const curveOffset = (fromPerson.y - toPerson.y) * 0.2

          return (
            <g key={`${conn.from}-${conn.to}-${i}`}>
              <path
                d={`M ${fromPerson.x + 20} ${fromPerson.y} Q ${midX} ${midY + curveOffset} ${toPerson.x - 20} ${toPerson.y}`}
                fill="none"
                strokeWidth={isHighlighted ? 3 : conn.warmth >= 85 ? 2 : 1}
                className={cn(warmthColor.line, isHighlighted ? "opacity-100" : "opacity-60")}
              />
              {/* Warmth indicator on line */}
              <circle cx={midX} cy={midY + curveOffset / 2} r="12" className="fill-background stroke-border" />
              <text
                x={midX}
                y={midY + curveOffset / 2 + 4}
                textAnchor="middle"
                className={cn("text-[9px] font-medium fill-current", warmthColor.text.replace("text-", "fill-"))}
              >
                {conn.warmth}%
              </text>
            </g>
          )
        })}

        {/* You node */}
        <g>
          <circle cx={youPosition.x} cy={youPosition.y} r="24" className="fill-primary" />
          <text
            x={youPosition.x}
            y={youPosition.y + 4}
            textAnchor="middle"
            className="fill-primary-foreground text-xs font-semibold"
          >
            You
          </text>
          <text
            x={youPosition.x}
            y={youPosition.y + 45}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            Founder
          </text>
        </g>

        {/* Connector nodes */}
        {connectorPositions.map((person) => {
          const colors = getFirmColor(person.firm)
          return (
            <g key={person.id}>
              <circle cx={person.x} cy={person.y} r="22" className={cn("fill-current opacity-20", colors.text)} />
              <clipPath id={`clip-${person.id}`}>
                <circle cx={person.x} cy={person.y} r="20" />
              </clipPath>
              <image
                href={person.avatar}
                x={person.x - 20}
                y={person.y - 20}
                width="40"
                height="40"
                clipPath={`url(#clip-${person.id})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle
                cx={person.x}
                cy={person.y}
                r="20"
                fill="none"
                strokeWidth="2"
                className={colors.border.replace("border-", "stroke-")}
              />
              <text
                x={person.x}
                y={person.y + 35}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-medium"
              >
                {person.name.split(" ")[0]}
              </text>
              <text
                x={person.x}
                y={person.y + 47}
                textAnchor="middle"
                className={cn("text-[9px] fill-current", colors.text)}
              >
                {person.firm || "SPC"}
              </text>
            </g>
          )
        })}

        {/* Target nodes */}
        {targetPositions.map((person) => {
          const colors = getFirmColor(person.firm)
          return (
            <g key={person.id}>
              <clipPath id={`clip-${person.id}`}>
                <circle cx={person.x} cy={person.y} r="18" />
              </clipPath>
              <image
                href={person.avatar}
                x={person.x - 18}
                y={person.y - 18}
                width="36"
                height="36"
                clipPath={`url(#clip-${person.id})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle
                cx={person.x}
                cy={person.y}
                r="18"
                fill="none"
                strokeWidth="2"
                className={colors.border.replace("border-", "stroke-")}
              />
              <text x={person.x + 30} y={person.y - 2} className="fill-foreground text-[10px] font-medium">
                {person.name}
              </text>
              <text x={person.x + 30} y={person.y + 10} className="fill-muted-foreground text-[9px]">
                {person.role}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
