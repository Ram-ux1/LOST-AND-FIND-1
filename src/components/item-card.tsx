import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"

import type { Item } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ItemCardProps = {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <CardHeader className="p-0">
        <Link href={`/items/${item.id}`} className="block">
          <div className="aspect-video relative">
            <Image
              src={item.imageUrl}
              alt={item.name}
              data-ai-hint={item.imageHint}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex items-start justify-between">
           <CardTitle className="font-headline text-xl mb-2 leading-tight">
            <Link href={`/items/${item.id}`}>{item.name}</Link>
          </CardTitle>
          <Badge variant={item.status === 'lost' ? 'destructive' : 'secondary'} className="capitalize shrink-0">
            {item.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground p-4 pt-0">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{item.date}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
