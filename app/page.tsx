import { SearchBar } from "@/components/search-bar"
import { IntroPathCard } from "@/components/intro-path-card"

const introductions = [
  {
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
  {
    id: 2,
    connector: {
      name: "Emily Zhang",
      avatar: "/professional-chinese-woman-executive.jpg",
      role: "Mutual connection",
    },
    targetVC: {
      name: "Sarah Chen",
      avatar: "/professional-asian-woman.png",
      firm: "Sequoia Capital",
    },
    warmthScore: 88,
    context: "Stanford GSB alumni",
  },
  {
    id: 3,
    connector: {
      name: "Michael Torres",
      avatar: "/professional-latino-man-tech.jpg",
      role: "Former colleague",
    },
    targetVC: {
      name: "Maria Rodriguez",
      avatar: "/professional-asian-woman.png",
      firm: "Andreessen Horowitz",
    },
    warmthScore: 85,
    context: "Co-founded startup together",
  },
  {
    id: 4,
    connector: {
      name: "Jason Park",
      avatar: "/professional-korean-man-startup.jpg",
      role: "Investor network",
    },
    targetVC: {
      name: "Kleiner Perkins Partner",
      avatar: "/professional-man-sequoia-partner.jpg",
      firm: "Kleiner Perkins",
    },
    warmthScore: 82,
    context: "Co-invested in 2 deals",
  },
  {
    id: 5,
    connector: {
      name: "Emily Zhang",
      avatar: "/professional-chinese-woman-executive.jpg",
      role: "University connection",
    },
    targetVC: {
      name: "Lana Damguel",
      avatar: "/professional-asian-woman-vc-partner.jpg",
      firm: "Benchmark",
    },
    warmthScore: 80,
    context: "Tsinghua University classmates",
  },
  {
    id: 6,
    connector: {
      name: "Danh Trang",
      avatar: "/professional-asian-man-headshot.png",
      role: "Startup ecosystem",
    },
    targetVC: {
      name: "David Lee",
      avatar: "/professional-asian-man-venture-capitalist.jpg",
      firm: "Andreessen Horowitz",
    },
    warmthScore: 78,
    context: "Met at TechCrunch Disrupt",
  },
]

export default function PathfinderPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Find Introductions</h1>
        <p className="text-muted-foreground">Discover the warmest paths to your target investors</p>
      </div>

      <SearchBar />

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Available Introductions
          </h2>
          <span className="text-sm text-muted-foreground">{introductions.length} investors reachable</span>
        </div>

        <div className="space-y-4">
          {introductions.map((intro) => (
            <IntroPathCard key={intro.id} introduction={intro} />
          ))}
        </div>
      </div>
    </div>
  )
}
