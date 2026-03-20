import { ChartAreaInteractive } from "@/components/web/chart-area-interactive"
import { DataTable, type Response } from "@/components/web/data-table"
import { SectionCards } from "@/components/web/section-cards"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { mockResponses } from "./data"
import { CreateSurveyButton } from "@/components/web/create-survey-button"

export default async function Page() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }
  const hasData = mockResponses.length > 0
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {hasData ? (
              <DataTable data={mockResponses as Response[]} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">No responses yet</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Create your first survey to start collecting real user feedback.
                </p>
                <CreateSurveyButton open={false} onOpenChange={function (open: boolean): void {
                    throw new Error("Function not implemented.")
                  } } />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
