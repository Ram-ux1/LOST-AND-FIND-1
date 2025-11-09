import { Suspense } from "react"
import { items } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ItemsPage({
  searchParams,
}: {
  searchParams: { type?: "lost" | "found" | "all" }
}) {
  const type = searchParams.type || "all"

  const lostItems = items.filter((item) => item.status === "lost")
  const foundItems = items.filter((item) => item.status === "found")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container py-12">
        <Tabs defaultValue={type} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              {type === "lost"
                ? "Lost Items"
                : type === "found"
                ? "Found Items"
                : "All Items"}
            </h1>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lost">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lostItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="found">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foundItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  )
}
