import { items } from "@/lib/data"
import { ItemsTable } from "@/components/admin/items-table"

export default function AdminItemsPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-headline font-bold">Manage Items</h1>
      <ItemsTable items={items} />
    </div>
  )
}
