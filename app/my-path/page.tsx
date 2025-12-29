"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle2, AlertCircle, Send, Mail, UserCheck } from "lucide-react"

interface IntroRequest {
  id: string
  investorName: string
  investorRole: string
  vcFirm: string
  connectorName: string
  status:
    | "draft"
    | "requested_to_spc"
    | "awaiting_connector_approval"
    | "awaiting_investor_response"
    | "intro_made"
    | "meeting_scheduled"
  requestedDate: string
  lastUpdated: string
  avatar: string
}

const introRequests: IntroRequest[] = [
  {
    id: "1",
    investorName: "Sarah Chen",
    investorRole: "Partner",
    vcFirm: "Sequoia Capital",
    connectorName: "Marion Doyle",
    status: "awaiting_investor_response",
    requestedDate: "2024-01-15",
    lastUpdated: "2024-01-18",
    avatar: "/professional-asian-woman.png",
  },
  {
    id: "2",
    investorName: "Michael Zhang",
    investorRole: "General Partner",
    vcFirm: "a16z",
    connectorName: "Jessica Park",
    status: "requested_to_spc",
    requestedDate: "2024-01-20",
    lastUpdated: "2024-01-20",
    avatar: "/professional-asian-man-headshot.png",
  },
  {
    id: "3",
    investorName: "Emily Rodriguez",
    investorRole: "Partner",
    vcFirm: "Founders Fund",
    connectorName: "David Kim",
    status: "intro_made",
    requestedDate: "2024-01-10",
    lastUpdated: "2024-01-17",
    avatar: "/professional-asian-woman-vc-partner.jpg",
  },
  {
    id: "4",
    investorName: "James Wilson",
    investorRole: "Managing Partner",
    vcFirm: "Benchmark",
    connectorName: "Sarah Thompson",
    status: "meeting_scheduled",
    requestedDate: "2024-01-05",
    lastUpdated: "2024-01-19",
    avatar: "/professional-man-sequoia-partner.jpg",
  },
  {
    id: "5",
    investorName: "Lisa Park",
    investorRole: "Partner",
    vcFirm: "Greylock",
    connectorName: "Alex Chen",
    status: "awaiting_connector_approval",
    requestedDate: "2024-01-22",
    lastUpdated: "2024-01-22",
    avatar: "/professional-chinese-woman-executive.jpg",
  },
  {
    id: "6",
    investorName: "Robert Kim",
    investorRole: "General Partner",
    vcFirm: "Sequoia Capital",
    connectorName: "Marion Doyle",
    status: "draft",
    requestedDate: "2024-01-23",
    lastUpdated: "2024-01-23",
    avatar: "/professional-korean-man-startup.jpg",
  },
]

const statusConfig = {
  draft: {
    label: "Draft",
    icon: AlertCircle,
    color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    progressColor: "bg-gray-500",
    progress: 10,
  },
  requested_to_spc: {
    label: "Requested to SPC Partner",
    icon: Send,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    progressColor: "bg-blue-500",
    progress: 25,
  },
  awaiting_connector_approval: {
    label: "Awaiting Connector Approval",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    progressColor: "bg-yellow-500",
    progress: 50,
  },
  awaiting_investor_response: {
    label: "Awaiting Investor Response",
    icon: Mail,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    progressColor: "bg-orange-500",
    progress: 75,
  },
  intro_made: {
    label: "Intro Made",
    icon: UserCheck,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    progressColor: "bg-purple-500",
    progress: 90,
  },
  meeting_scheduled: {
    label: "Meeting Scheduled",
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    progressColor: "bg-green-500",
    progress: 100,
  },
}

export default function MyPathPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-semibold text-foreground">My Path</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your introduction requests and their progress</p>
        </div>
      </header>

      <main className="flex-1 px-8 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {introRequests.map((request) => {
            const config = statusConfig[request.status]
            const StatusIcon = config.icon

            return (
              <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.investorName} />
                    <AvatarFallback>{request.investorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{request.investorName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {request.investorRole} at {request.vcFirm}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          via <span className="font-medium text-foreground">{request.connectorName}</span> (SPC)
                        </p>
                      </div>
                      <Badge variant="outline" className={`${config.color} gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{config.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.progressColor} transition-all duration-500`}
                          style={{ width: `${config.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">Requested:</span>{" "}
                        {new Date(request.requestedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Last Updated:</span>{" "}
                        {new Date(request.lastUpdated).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
