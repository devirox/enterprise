'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Users, Activity, DollarSign, Eye, RefreshCw, Download, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserForm from '@/components/dashboard/admin/UserForm'
import UsersAdminClient from '@/components/dashboard/admin/UsersAdminClient';
import UsersListClient from '@/components/dashboard/admin/UsersListClient';
import AuditLogsClient from '@/components/dashboard/admin/AuditLogsClient';
import FeatureFlagsClient from '@/components/dashboard/admin/FeatureFlagsClient';
import ProductsAdminClient from '@/components/dashboard/admin/ProductsAdminClient';
import ListingsAdminClient from '@/components/dashboard/admin/ListingsAdminClient';
import ContactMessagesClient from '@/components/dashboard/admin/ContactMessagesClient';
import { AdminSidebar } from '../ui/admin-sidebar';
import { DashboardCard } from '../ui/dashboard-card';
import { RevenueChart } from '../ui/revenue-chart';
import { UsersTable } from '../ui/users-table';
import { QuickActions } from '../ui/quick-actions';
import { SystemStatus } from '../ui/system-status';
import { RecentActivity } from '../ui/recent-activity';
import { DashboardHeader } from '../ui/dashboard-header';

const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Active Sessions',
    value: '2,456',
    change: '+15%',
    changeType: 'positive' as const,
    icon: Activity,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Page Views',
    value: '34,567',
    change: '-2.4%',
    changeType: 'negative' as const,
    icon: Eye,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

export default function AdminDashboard() {
  const [active, setActive] = useState<'home' | 'users' | 'audit' | 'flags' | 'marketplace' | 'real-estate' | 'contact'>('home');
  const router = useRouter();
  const pathname = usePathname() || '';

  // derive active tab from current path so buttons reflect route
  useEffect(() => {
    if (pathname.startsWith('/dashboard/admin/users')) setActive('users')
    else if (pathname.startsWith('/dashboard/admin/audit-logs')) setActive('audit')
    else if (pathname.startsWith('/dashboard/admin/feature-flags')) setActive('flags')
    else if (pathname.startsWith('/dashboard/admin/marketplace')) setActive('marketplace')
    else if (pathname.startsWith('/dashboard/admin/real-estate')) setActive('real-estate')
    else if (pathname.startsWith('/dashboard/admin/contact-messages')) setActive('contact')
    else setActive('home')
  }, [pathname])

  const handleSidebarNavigate = (href: string) => {
    if (!href) return setActive('home')
    if (href.startsWith('/dashboard/admin/users')) setActive('users')
    else if (href.startsWith('/dashboard/admin/audit-logs')) setActive('audit')
    else if (href.startsWith('/dashboard/admin/feature-flags')) setActive('flags')
    else if (href.startsWith('/dashboard/admin/marketplace')) setActive('marketplace')
    else if (href.startsWith('/dashboard/admin/real-estate')) setActive('real-estate')
    else if (href.startsWith('/dashboard/admin/contact-messages')) setActive('contact')
    else setActive('home')
    setShowAddUser(false)
  }
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const handleAddUser = () => {
    // open inline form inside dashboard
    setActive('users')
    setShowAddUser(true)
  };

  const [showAddUser, setShowAddUser] = useState(false)

  return (
    <SidebarProvider>
      <AdminSidebar onNavigate={handleSidebarNavigate} />
      <SidebarInset>

        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={handleExport}
          isRefreshing={isRefreshing}
        />

        {/* Tabs + toolbar moved below header */}
        <div className="mt-4 mb-6">
          <div className="text-sm text-muted-foreground mb-2">{pathname || '/dashboard/admin'}</div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActive('home')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'home'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActive('users')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'users'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActive('audit')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'audit'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Audit Logs
              </button>
              <button
                onClick={() => setActive('flags')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'flags'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Feature Flags
              </button>
              <button
                onClick={() => setActive('marketplace')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'marketplace'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActive('real-estate')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'real-estate'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Real Estate
              </button>
              <button
                onClick={() => setActive('contact')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  active === 'contact'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-2 pt-0 sm:gap-4 sm:p-4">
          <div className="min-h-[calc(100vh-4rem)] flex-1 rounded-lg p-3 sm:rounded-xl sm:p-4 md:p-6">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
              {/* Home / Overview */}
              {active === 'home' && (
                <>
                  <div className="px-2 sm:px-0">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      Welcome Admin
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Here&apos;s what&apos;s happening with your platform today.
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                      <DashboardCard key={stat.title} stat={stat} index={index} />
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
                    {/* Charts Section */}
                    <div className="space-y-4 sm:space-y-6 xl:col-span-2">
                      <RevenueChart />
                      <UsersTable onAddUser={handleAddUser} />
                    </div>

                    {/* Sidebar Section */}
                    <div className="space-y-4 sm:space-y-6">
                      <QuickActions
                        onAddUser={handleAddUser}
                        onExport={handleExport}
                      />
                      <SystemStatus />
                      <RecentActivity />
                    </div>
                  </div>
                </>
              )}

              {/* Inline Admin Views */}
              {active === 'users' && <UsersListClient />}
              {active === 'audit' && <AuditLogsClient />}
              {active === 'flags' && <FeatureFlagsClient />}
              {active === 'marketplace' && <ProductsAdminClient />}
              {active === 'real-estate' && <ListingsAdminClient />}
              {active === 'contact' && <ContactMessagesClient />}

            </div>
          </div>
        </div>
      </SidebarInset>

      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddUser(false)} />
          <div className="relative w-full max-w-xl bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add User</h3>
              <button aria-label="Close" className="text-muted-foreground" onClick={() => setShowAddUser(false)}>Close</button>
            </div>
            <UserForm />
          </div>
        </div>
      )}

    </SidebarProvider>
  );
}
