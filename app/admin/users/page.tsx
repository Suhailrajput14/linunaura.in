'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setUsers((data as Profile[]) || []);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">{users.length} registered users</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No users yet</div>
      ) : (
        <div className="rounded-lg border">
          <div className="grid grid-cols-[1fr_1fr_100px_120px] gap-4 border-b p-4 text-xs font-medium text-muted-foreground">
            <span>Name</span>
            <span>ID</span>
            <span>Role</span>
            <span>Joined</span>
          </div>
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-[1fr_1fr_100px_120px] items-center gap-4 border-b p-4 last:border-0">
              <div>
                <p className="text-sm font-medium">{user.full_name || 'Unnamed'}</p>
                <p className="text-xs text-muted-foreground">{user.phone || 'No phone'}</p>
              </div>
              <span className="truncate text-xs text-muted-foreground">{user.id.substring(0, 12)}...</span>
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
              <span className="text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
