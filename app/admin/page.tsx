'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { formatINR } from '@/lib/utils';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

interface RecentOrder {
  id: string;
  total: number;
  status: string;
  created_at: string;
  user_id: string;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [ordersRes, productsRes, profilesRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('id, name, price, rating, review_count'),
      supabase.from('profiles').select('id'),
    ]);

    const orders = ordersRes.data || [];
    const products = productsRes.data || [];
    const profiles = profilesRes.data || [];

    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalCustomers: profiles.length,
    });

    setRecentOrders(orders.slice(0, 5) as RecentOrder[]);

    const topProds = products
      .map((p: any) => ({
        name: p.name,
        sales: p.review_count || 0,
        revenue: (p.price || 0) * (p.review_count || 0),
      }))
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);
    setTopProducts(topProds);

    setLoading(false);
  };

  const statCards = [
    { title: 'Total Revenue', value: formatINR(stats.totalRevenue), icon: DollarSign },
    { title: 'Total Orders', value: stats.totalOrders.toString(), icon: ShoppingCart },
    { title: 'Total Products', value: stats.totalProducts.toString(), icon: Package },
    { title: 'Total Customers', value: stats.totalCustomers.toString(), icon: Users },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your store performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No orders yet</p>
            ) : (
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium">{order.id.substring(0, 8)}...</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatINR(order.total)}</p>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No product data</p>
            ) : (
              <div className="divide-y">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} reviews</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{formatINR(product.revenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
