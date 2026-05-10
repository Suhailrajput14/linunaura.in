'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Order status updated');
    loadData();
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No orders yet</div>
      ) : (
        <div className="rounded-lg border">
          <div className="grid grid-cols-[1fr_1fr_100px_120px_140px] gap-4 border-b p-4 text-xs font-medium text-muted-foreground">
            <span>Order ID</span>
            <span>Date</span>
            <span>Total</span>
            <span>Status</span>
            <span>Update</span>
          </div>
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-[1fr_1fr_100px_120px_140px] items-center gap-4 border-b p-4 last:border-0">
              <span className="truncate text-sm font-medium">{order.id.substring(0, 8)}...</span>
              <span className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</span>
              <span className="text-sm font-medium">{formatINR(order.total)}</span>
              <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
