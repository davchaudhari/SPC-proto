"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IntroGraph } from "@/components/intro-graph"
import { DraftModal } from "@/components/draft-modal"

interface Introduction {
  id: number
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

interface IntroPathCardProps {
  introduction: Introduction
}

export function IntroPathCard({ introduction }: IntroPathCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card className="p-6 bg-card border-border hover:border-ring/50 transition-colors">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <IntroGraph introduction={introduction} />
          </div>

          <div className="flex-shrink-0">
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Draft Warm Intro Request (AI)
            </Button>
          </div>
        </div>
      </Card>

      <DraftModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} introduction={introduction} />
    </>
  )
}
