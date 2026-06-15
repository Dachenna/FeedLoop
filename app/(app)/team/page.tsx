// app/(app)/team/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, User, Shield, Crown } from 'lucide-react';
import InviteTeamMemberSheet from './invite-sheet';

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  // Fetch real team members
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select(`
      id,
      role,
      joined_at,
      user:auth.users!user_id (email)
    `)
    .eq('workspace_id', /* TODO: Add workspace_id logic later */)
    .order('joined_at', { ascending: false });

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage who has access to your workspace
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Invite
          </Button>
          <InviteTeamMemberSheet />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({teamMembers?.length || 1})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers?.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between py-4 border-b last:border-none">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{member.user?.email}</p>
                    <div className="flex items-center gap-2">
                      {member.role === 'owner' && <Crown className="h-4 w-4 text-yellow-500" />}
                      {member.role === 'admin' && <Shield className="h-4 w-4 text-sky-500" />}
                      <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Active
                  </div>

                  {member.role !== 'owner' && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            )) || (
              <div className="text-center py-12 text-muted-foreground">
                No team members yet. Invite your first teammate!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}