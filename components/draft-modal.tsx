"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Introduction {
  connector: {
    name: string
    role: string
  }
  targetVC: {
    name: string
    firm: string
  }
  context: string
}

interface DraftModalProps {
  isOpen: boolean
  onClose: () => void
  introduction: Introduction
}

export function DraftModal({ isOpen, onClose, introduction }: DraftModalProps) {
  const { connector, targetVC, context } = introduction

  const emailDraft = `Subject: Quick intro request to ${targetVC.name}

Hi ${connector.name.split(" ")[0]},

Hope you're doing well! I noticed from your network that you and ${targetVC.name} were ${context.toLowerCase()}. I'm currently raising our seed round and ${targetVC.firm} would be a dream partner given their track record.

Would you be open to making a warm introduction? Here's a quick blurb you could forward:

---

"${connector.name.split(" ")[0]} suggested I reach out. I'm building [Company Name], 
a [one-liner description]. We're currently at [traction metrics] 
and raising a $[X]M seed round.

Would love 20 minutes to share what we're working on."

---

Totally understand if now isn't the right time. Either way, really appreciate you being part of the network.

Best,
[Your Name]`

  const handleCopy = () => {
    navigator.clipboard.writeText(emailDraft)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">AI-Generated Intro Request</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Requesting intro to <span className="text-foreground font-medium">{targetVC.name}</span> ({targetVC.firm})
            via <span className="text-foreground font-medium">{connector.name}</span>
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="bg-secondary/50 rounded-lg p-5 border border-border">
            <pre className="font-mono text-xs md:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {emailDraft}
            </pre>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground flex-1">
              ✨ Personalized using relationship context: <span className="italic">{context}</span>
            </p>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 flex-1 md:flex-none bg-transparent"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button size="sm" className="flex-1 md:flex-none">
                Send via Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
