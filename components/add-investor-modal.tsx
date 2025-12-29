"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface AddInvestorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (investor: {
    name: string
    avatar: string
    firm: string
    role: string
    warmthScore: number
    context: string
  }) => void
}

export function AddInvestorModal({ isOpen, onClose, onAdd }: AddInvestorModalProps) {
  const [name, setName] = useState("")
  const [firm, setFirm] = useState("")
  const [role, setRole] = useState("")
  const [warmthScore, setWarmthScore] = useState(50)
  const [context, setContext] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      avatar: "/professional-headshot.png",
      firm,
      role,
      warmthScore,
      context,
    })
    // Reset form
    setName("")
    setFirm("")
    setRole("")
    setWarmthScore(50)
    setContext("")
    onClose()
  }

  const getWarmthColor = (score: number) => {
    if (score >= 90) return "text-emerald-400"
    if (score >= 60) return "text-yellow-400"
    return "text-zinc-400"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Add New Investor</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Investor Name</Label>
              <Input
                id="name"
                placeholder="e.g., John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="e.g., Partner"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="bg-muted/50 border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="firm">VC Firm</Label>
            <Input
              id="firm"
              placeholder="e.g., Sequoia Capital"
              value={firm}
              onChange={(e) => setFirm(e.target.value)}
              required
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Relationship Context</Label>
            <Input
              id="context"
              placeholder="e.g., Former colleagues at Google"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Warmth Score</Label>
              <span className={cn("text-sm font-medium", getWarmthColor(warmthScore))}>{warmthScore}%</span>
            </div>
            <Slider
              value={[warmthScore]}
              onValueChange={(value) => setWarmthScore(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">How strong is your relationship with this investor?</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Investor</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
