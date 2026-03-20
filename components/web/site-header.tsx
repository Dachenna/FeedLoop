// components/web/site-header.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, PlusCircle } from 'lucide-react' // or tabler icons
import { CreateSurveySheet } from './create-survey-sheet'
import { createClient } from '@/lib/supabase/client'
import { ModeToggle } from './mode-toggle'
import { useSurvey } from '@/lib/contexts/survey-context'

export function SiteHeader() {
  const [user, setUser] = useState<{ full_name?: string; avatar_url?: string } | null>(null)
  const { open, setOpen } = useSurvey()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => setUser(profile))
      }
    })
  }, [])

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <h1 className="text-xl font-semibold">FeedLoop</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Survey
          </Button>
          <CreateSurveySheet open={open} onOpenChange={setOpen} />
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
            <AvatarFallback>
              {user?.full_name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
      
    </header>
  )
}