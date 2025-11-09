import { claims } from "@/lib/data"
import { ClaimsTable } from "@/components/admin/claims-table"

export default function AdminClaimsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Manage Claims</h1>
      <ClaimsTable claims={claims} />
    </div>
  )
}
