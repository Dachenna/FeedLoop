import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import SettingsList from "./SettingsList"

function SettingsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, workspace, and other settings.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
          <nav className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="justify-start px-3 font-semibold text-primary"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-3 text-muted-foreground hover:text-primary"
            >
              Workspace
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-3 text-muted-foreground hover:text-primary"
            >
              Billing
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-3 text-muted-foreground hover:text-primary"
            >
              API Keys
            </Button>
          </nav>
          <div className="md:col-span-3">
            <SettingsList />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SettingsPage
