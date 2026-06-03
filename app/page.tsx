import { SignupForm } from "@/components/signup-form"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="pt-12 pb-10 px-10 text-center">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Daniel DeVore
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Be the first to know.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            New music, tour dates, and things I only share with the list.
          </p>

          <SignupForm />

          <p className="text-xs text-muted-foreground mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
