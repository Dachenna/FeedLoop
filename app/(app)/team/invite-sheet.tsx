// app/(app)/team/invite-sheet.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function InviteTeamMemberSheet() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), role }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Invitation sent to ${email}`);
        setEmail('');
        setOpen(false);
      } else {
        toast.error(data.error || "Failed to send invitation");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite Team Member</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <div className="flex gap-3">
              <Button
                variant={role === 'admin' ? 'default' : 'outline'}
                onClick={() => setRole('admin')}
              >
                Admin
              </Button>
              <Button
                variant={role === 'member' ? 'default' : 'outline'}
                onClick={() => setRole('member')}
              >
                Member
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={handleInvite} className="w-full" disabled={loading || !email}>
          {loading ? 'Sending Invitation...' : 'Send Invitation'}
        </Button>
      </SheetContent>
    </Sheet>
  );
}