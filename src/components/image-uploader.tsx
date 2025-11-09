"use client"

import { useState, type ChangeEvent } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Note: Client-side resizing can be implemented here using the Canvas API
// before the file is passed to the upload service. This is an advanced
// optimization and is omitted for brevity.

export function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    setFileName(null)
    // Also reset the file input
    const fileInput = document.getElementById("image-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        {preview ? (
          <div className="relative group w-full aspect-video">
            <Image
              src={preview}
              alt="Image preview"
              fill
              className="object-contain rounded-md"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <Input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
        {fileName && !preview && (
          <p className="mt-2 text-sm text-muted-foreground">
            Loading preview for {fileName}...
          </p>
        )}
      </CardContent>
    </Card>
  )
}
