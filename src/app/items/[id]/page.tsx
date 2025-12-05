"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, MapPin, Search, Bot } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import type { Item, Claim } from "@/lib/data"
import { items as allItems } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase"
import { collection } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const { user } = useUser()
  const firestore = useFirestore()
  const { toast } = useToast()
  const router = useRouter()
  
  const [claimDetails, setClaimDetails] = useState("")

  const [item] = useState<Item | undefined>(allItems.find(i => i.id === params.id));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitClaim = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You must be logged in to submit a claim.",
      });
      return;
    }
    if (!item) {
      toast({
        variant: "destructive",
        title: "Item not found",
        description: "Cannot submit a claim for a non-existent item.",
      });
      return;
    }

    if(user.uid === item.userId) {
       toast({
        variant: "destructive",
        title: "Cannot Claim Own Item",
        description: "You cannot submit a claim for an item you posted.",
      });
      return;
    }

    const claimsColRef = collection(firestore, 'users', item.userId, 'items', item.id, 'claims');
    const newClaim: Omit<Claim, 'id' | 'itemId'> = {
      itemName: item.name,
      claimerId: user.uid,
      claimantName: user.displayName || "Anonymous",
      status: 'pending',
      claimDate: new Date().toISOString(),
    };
    
    await addDocumentNonBlocking(claimsColRef, newClaim);
    
    toast({
      title: "Claim Submitted",
      description: "Your claim has been submitted for review.",
    });

    router.push(`/items`);
  };


  if (isLoading) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Item not found</h1>
        <p className="text-muted-foreground">
          The item you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/items">Go Back to Items</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image
              src={item.imageUrl}
              alt={item.name}
              data-ai-hint={item.imageHint}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Badge
            variant={item.status === "lost" ? "destructive" : "secondary"}
            className="capitalize w-fit"
          >
            {item.status}
          </Badge>
          <h1 className="text-4xl font-headline font-bold">{item.name}</h1>
          <p className="text-lg text-muted-foreground">{item.description}</p>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-muted-foreground">{item.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Category</p>
                <p className="text-muted-foreground">{item.category}</p>
              </div>
            </div>
             <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">AI Smart Match</p>
                <p className="text-muted-foreground">Check for potential matches</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="flex-1" disabled={!user || user.uid === item.userId}>
                  Claim This Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-headline">
                    Submit Your Claim
                  </DialogTitle>
                  <DialogDescription>
                    To verify your ownership, please provide a detailed
                    description of the item. Our AI will help evaluate your claim.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="claim-details">
                      Identifying Details
                    </Label>
                    <Textarea
                      id="claim-details"
                      placeholder="e.g., 'The wallet has a scratch on the front logo', 'The phone background is a picture of a cat.'"
                      className="min-h-32"
                      value={claimDetails}
                      onChange={(e) => setClaimDetails(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" onClick={handleSubmitClaim}>
                    Submit Claim
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                Find Potential Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
