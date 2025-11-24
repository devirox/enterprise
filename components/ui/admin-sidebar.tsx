"use client";

import { memo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Activity,
  Database,
  Shield,
  Zap,
  Bell,
  Settings,
  Moon,
  Sun,
  User,
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/admin' },
  { title: 'Users', icon: Users, href: '/dashboard/admin/users' },
  { title: 'Audit Logs', icon: Activity, href: '/dashboard/admin/audit-logs' },
  { title: 'Feature Flags', icon: Zap, href: '/dashboard/admin/feature-flags' },
  { title: 'Marketplace', icon: FileText, href: '/dashboard/admin/marketplace/products' },
  { title: 'Real Estate', icon: BarChart3, href: '/dashboard/admin/real-estate/listings' },
  { title: 'Uploads', icon: Database, href: '/dashboard/admin/uploads' },
  { title: 'Settings', icon: Settings, href: '/dashboard/admin/settings' },
];

export const AdminSidebar = memo(({ onNavigate }:{ onNavigate?: (href: string) => void }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch={false} href="#dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DeviroxN</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      {onNavigate ? (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(item.href);
                          }}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <Link prefetch={false} href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {mounted ? (theme === 'dark' ? <Sun /> : <Moon />) : <span className="w-5 h-5 inline-block" />}
              <span>{mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Theme'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {onNavigate ? (
                <a
                  href="#profile"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#profile');
                  }}
                >
                  <User />
                  <span>Admin Profile</span>
                </a>
              ) : (
                <Link prefetch={false} href="#profile">
                  <User />
                  <span>Admin Profile</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});

AdminSidebar.displayName = 'AdminSidebar';
