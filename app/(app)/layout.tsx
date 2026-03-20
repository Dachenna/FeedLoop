import { AppSidebar } from "@/components/web/app-sidebar"
import { SiteHeader } from "@/components/web/site-header"
import { SurveySuccessDialog } from "@/components/web/survey-success-dialog"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SurveyProvider } from "@/lib/contexts/survey-context"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SurveyProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
        <SurveySuccessDialog />
      </SidebarProvider>
    </SurveyProvider>
  );
}