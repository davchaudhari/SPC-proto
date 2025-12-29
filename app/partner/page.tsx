import { InvestorManager } from "@/components/investor-manager"

export default function PartnerPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Partner Portal</h1>
        <p className="text-muted-foreground">
          Manage your investor connections to help founders find warm introductions
        </p>
      </div>

      <InvestorManager />
    </div>
  )
}
