'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Save, Loader as Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('store_settings').select('*');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s: any) => { map[s.key] = s.value; });
      setSettings(map);
    }
    setLoading(false);
  };

  const saveSetting = async (key: string) => {
    setSaving(key);
    const { error } = await supabase
      .from('store_settings')
      .update({ value: settings[key], updated_at: new Date().toISOString() })
      .eq('key', key);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Setting saved');
    }
    setSaving(null);
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-24 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your store settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Update your store details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input
                value={settings.store_name || ''}
                onChange={(e) => updateSetting('store_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input
                value={settings.contact_email || ''}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={settings.phone || ''}
                onChange={(e) => updateSetting('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={settings.address || ''}
                onChange={(e) => updateSetting('address', e.target.value)}
              />
            </div>
          </div>
          <Button
            className="gap-2 rounded-full"
            onClick={() => { saveSetting('store_name'); saveSetting('contact_email'); saveSetting('phone'); saveSetting('address'); }}
            disabled={saving !== null}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Settings</CardTitle>
          <CardDescription>Configure shipping rates and options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Free Shipping Threshold (INR)</Label>
              <Input
                type="number"
                value={settings.free_shipping_threshold || ''}
                onChange={(e) => updateSetting('free_shipping_threshold', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Standard Shipping Rate (INR)</Label>
              <Input
                type="number"
                value={settings.standard_shipping_rate || ''}
                onChange={(e) => updateSetting('standard_shipping_rate', e.target.value)}
              />
            </div>
          </div>
          <Button
            className="gap-2 rounded-full"
            onClick={() => { saveSetting('free_shipping_threshold'); saveSetting('standard_shipping_rate'); }}
            disabled={saving !== null}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Shipping Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
