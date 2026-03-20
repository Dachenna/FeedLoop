'use client'

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-3 text-center pb-2">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <p className="text-muted-foreground">
            We encountered an issue verifying your identity.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 text-center">
          <p className="text-sm text-muted-foreground">
            This usually happens due to an expired session or an invalid link. Please try refreshing the page or signing in again.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">
              Back to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
