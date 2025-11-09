"use client"

import { MoreHorizontal } from "lucide-react"

import type { Claim } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ClaimsTableProps = {
  claims: Claim[]
}

export function ClaimsTable({ claims }: ClaimsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims</CardTitle>
        <CardDescription>A list of all claims made on items.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Claimant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.itemName}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      claim.status === "pending"
                        ? "outline"
                        : claim.status === "approved"
                        ? "default"
                        : "destructive"
                    }
                     className={cn("capitalize", claim.status === 'approved' && 'bg-green-600' )}
                  >
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell>{claim.claimantName}</TableCell>
                <TableCell>{claim.claimDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>_
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Claim</DropdownMenuItem>
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-3</strong> of <strong>{claims.length}</strong> claims
        </div>
      </CardFooter>
    </Card>
  )
}
