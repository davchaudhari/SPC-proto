"use client"
import { useState } from "react"
import { IntroPathCard } from "@/components/intro-path-card"
import { Search } from "lucide-react"

interface Investor {
  id: number
  name: string
  avatar: string
  firm: string
  warmthScore: number
  connections: number
  introData: {
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
}

const firmColors: Record<string, string> = {
  "Sequoia Capital": "#10b981",
  "Andreessen Horowitz": "#ef4444",
  "Kleiner Perkins": "#10b981",
  Benchmark: "#3b82f6",
  Greylock: "#06b6d4",
}

const investorsByFirm: Record<string, Investor[]> = {
  "Sequoia Capital": [
    {
      id: 1,
      name: "David Lee",
      avatar: "/professional-asian-man-headshot.png",
      firm: "Sequoia Capital",
      warmthScore: 92,
      connections: 8,
      introData: {
        id: 1,
        connector: {
          name: "Sarah Chen",
          avatar: "/professional-asian-woman.png",
          role: "Former colleague",
        },
        targetVC: {
          name: "David Lee",
          avatar: "/professional-asian-man-headshot.png",
          firm: "Sequoia Capital",
        },
        warmthScore: 92,
        context: "Former colleagues at Google",
      },
    },
    {
      id: 2,
      name: "Alfred Lin",
      avatar: "/professional-man-sequoia-partner.jpg",
      firm: "Sequoia Capital",
      warmthScore: 75,
      connections: 5,
      introData: {
        id: 2,
        connector: {
          name: "Emily Zhang",
          avatar: "/professional-chinese-woman-executive.jpg",
          role: "Mutual connection",
        },
        targetVC: {
          name: "Alfred Lin",
          avatar: "/professional-man-sequoia-partner.jpg",
          firm: "Sequoia Capital",
        },
        warmthScore: 75,
        context: "Stanford GSB alumni",
      },
    },
    {
      id: 3,
      name: "Roelof Botha",
      avatar: "/professional-asian-man-venture-capitalist.jpg",
      firm: "Sequoia Capital",
      warmthScore: 68,
      connections: 6,
      introData: {
        id: 3,
        connector: {
          name: "Jason Park",
          avatar: "/professional-korean-man-startup.jpg",
          role: "Investor network",
        },
        targetVC: {
          name: "Roelof Botha",
          avatar: "/professional-asian-man-venture-capitalist.jpg",
          firm: "Sequoia Capital",
        },
        warmthScore: 68,
        context: "Co-invested in 2 deals",
      },
    },
  ],
  "Andreessen Horowitz": [
    {
      id: 4,
      name: "Marc Andreessen",
      avatar: "/professional-latino-man-tech.jpg",
      firm: "Andreessen Horowitz",
      warmthScore: 88,
      connections: 12,
      introData: {
        id: 4,
        connector: {
          name: "Michael Torres",
          avatar: "/professional-latino-man-tech.jpg",
          role: "Former colleague",
        },
        targetVC: {
          name: "Marc Andreessen",
          avatar: "/professional-latino-man-tech.jpg",
          firm: "Andreessen Horowitz",
        },
        warmthScore: 88,
        context: "Co-founded startup together",
      },
    },
    {
      id: 5,
      name: "Andrew Chen",
      avatar: "/professional-asian-man-venture-capitalist.jpg",
      firm: "Andreessen Horowitz",
      warmthScore: 85,
      connections: 9,
      introData: {
        id: 5,
        connector: {
          name: "Sarah Chen",
          avatar: "/professional-asian-woman.png",
          role: "Professional network",
        },
        targetVC: {
          name: "Andrew Chen",
          avatar: "/professional-asian-man-venture-capitalist.jpg",
          firm: "Andreessen Horowitz",
        },
        warmthScore: 85,
        context: "Attended same tech conferences",
      },
    },
    {
      id: 6,
      name: "Sriram Krishnan",
      avatar: "/professional-headshot.png",
      firm: "Andreessen Horowitz",
      warmthScore: 72,
      connections: 7,
      introData: {
        id: 6,
        connector: {
          name: "Danh Trang",
          avatar: "/professional-asian-man-headshot.png",
          role: "Twitter connection",
        },
        targetVC: {
          name: "Sriram Krishnan",
          avatar: "/professional-headshot.png",
          firm: "Andreessen Horowitz",
        },
        warmthScore: 72,
        context: "Active on tech Twitter",
      },
    },
  ],
  Benchmark: [
    {
      id: 7,
      name: "Sarah Tavel",
      avatar: "/professional-asian-woman-vc-partner.jpg",
      firm: "Benchmark",
      warmthScore: 90,
      connections: 8,
      introData: {
        id: 7,
        connector: {
          name: "Emily Zhang",
          avatar: "/professional-chinese-woman-executive.jpg",
          role: "University connection",
        },
        targetVC: {
          name: "Sarah Tavel",
          avatar: "/professional-asian-woman-vc-partner.jpg",
          firm: "Benchmark",
        },
        warmthScore: 90,
        context: "Harvard Business School classmates",
      },
    },
    {
      id: 8,
      name: "Eric Vishria",
      avatar: "/professional-asian-man-venture-capitalist.jpg",
      firm: "Benchmark",
      warmthScore: 78,
      connections: 6,
      introData: {
        id: 8,
        connector: {
          name: "Michael Torres",
          avatar: "/professional-latino-man-tech.jpg",
          role: "Startup ecosystem",
        },
        targetVC: {
          name: "Eric Vishria",
          avatar: "/professional-asian-man-venture-capitalist.jpg",
          firm: "Benchmark",
        },
        warmthScore: 78,
        context: "Met at TechCrunch Disrupt",
      },
    },
  ],
  Greylock: [
    {
      id: 9,
      name: "Reid Hoffman",
      avatar: "/professional-man-sequoia-partner.jpg",
      firm: "Greylock",
      warmthScore: 82,
      connections: 10,
      introData: {
        id: 9,
        connector: {
          name: "Jason Park",
          avatar: "/professional-korean-man-startup.jpg",
          role: "LinkedIn network",
        },
        targetVC: {
          name: "Reid Hoffman",
          avatar: "/professional-man-sequoia-partner.jpg",
          firm: "Greylock",
        },
        warmthScore: 82,
        context: "Connected via LinkedIn",
      },
    },
    {
      id: 10,
      name: "Josh Elman",
      avatar: "/professional-headshot.png",
      firm: "Greylock",
      warmthScore: 76,
      connections: 7,
      introData: {
        id: 10,
        connector: {
          name: "Danh Trang",
          avatar: "/professional-asian-man-headshot.png",
          role: "Product community",
        },
        targetVC: {
          name: "Josh Elman",
          avatar: "/professional-headshot.png",
          firm: "Greylock",
        },
        warmthScore: 76,
        context: "Product management circles",
      },
    },
    {
      id: 11,
      name: "Emily Zhang",
      avatar: "/professional-chinese-woman-executive.jpg",
      firm: "Greylock",
      warmthScore: 70,
      connections: 5,
      introData: {
        id: 11,
        connector: {
          name: "Sarah Chen",
          avatar: "/professional-asian-woman.png",
          role: "Mentorship",
        },
        targetVC: {
          name: "Emily Zhang",
          avatar: "/professional-chinese-woman-executive.jpg",
          firm: "Greylock",
        },
        warmthScore: 70,
        context: "Women in VC group",
      },
    },
  ],
  "Kleiner Perkins": [
    {
      id: 12,
      name: "Ilya Fushman",
      avatar: "/professional-asian-man-venture-capitalist.jpg",
      firm: "Kleiner Perkins",
      warmthScore: 80,
      connections: 6,
      introData: {
        id: 12,
        connector: {
          name: "Michael Torres",
          avatar: "/professional-latino-man-tech.jpg",
          role: "Former colleague",
        },
        targetVC: {
          name: "Ilya Fushman",
          avatar: "/professional-asian-man-venture-capitalist.jpg",
          firm: "Kleiner Perkins",
        },
        warmthScore: 80,
        context: "Worked together at Dropbox",
      },
    },
  ],
}

export default function GraphViewPage() {
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const getWarmthColor = (score: number) => {
    if (score >= 85) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-gray-500"
  }

  const filteredFirms = Object.entries(investorsByFirm).filter(([firm, investors]) => {
    if (!searchQuery) return true
    return (
      firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investors.some((inv) => inv.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Network Overview</h1>
        <p className="text-muted-foreground mb-4">
          Browse your investor network organized by firm. Click any investor to view introduction paths.
        </p>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search investors or firms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8">
          {filteredFirms.map(([firmName, investors]) => (
            <div key={firmName} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: firmColors[firmName] }} />
                <h2 className="text-lg font-semibold text-foreground">{firmName}</h2>
                <span className="text-sm text-muted-foreground">({investors.length} investors)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investors.map((investor) => (
                  <button
                    key={investor.id}
                    onClick={() => setSelectedInvestor(investor)}
                    className="flex items-center gap-4 p-4 bg-background/50 border border-border rounded-lg hover:border-ring hover:bg-background transition-all text-left"
                  >
                    <img
                      src={investor.avatar || "/placeholder.svg"}
                      alt={investor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      style={{ borderColor: firmColors[firmName], borderWidth: 2 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{investor.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className={`font-semibold ${getWarmthColor(investor.warmthScore)}`}>
                          {investor.warmthScore}% warm
                        </span>
                        <span>•</span>
                        <span>{investor.connections} connections</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedInvestor && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Introduction Path to {selectedInvestor.name}
            </h2>
            <button
              onClick={() => setSelectedInvestor(null)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </div>
          <IntroPathCard introduction={selectedInvestor.introData} />
        </div>
      )}
    </div>
  )
}
