"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music } from "lucide-react"

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      city: formData.get("city") as string,
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Server error")
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <Music className="h-12 w-12 text-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          You&apos;re in.
        </h2>
        <p className="text-muted-foreground">
          Thanks for joining. You&apos;ll hear from me soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="First name"
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Input
          type="text"
          name="city"
          placeholder="City (optional)"
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Joining..." : "Join the list"}
      </Button>
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </form>
  )
}
