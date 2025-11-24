"use client";
import logo from "../../../images/logo.png";
import Image from "next/image";

// "use client";

import { useState, useId } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/components/navbar-components/logo";
import NotificationMenu from "@/components/components/notification-menu";
import UserMenu from "@/components/components/user-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/components/ui/navigation-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/components/ui/popover";

// Top-level nav groups based on your routes
const navGroups = [
  {
    type: "link",
    label: "Home",
    href: "/",
  },
  {
    type: "menu",
    label: "Solutions",
    items: [
      {
        label: "Finance Suite",
        href: "/finance",
        description:
          "Digital microfinance: savings, loans, disbursements & customer dashboards.",
      },
      {
        label: "Marketplace Suite",
        href: "/marketplace",
        description:
          "Multi-vendor marketplace for products, ads and catalog-style commerce.",
      },
      {
        label: "Real Estate Suite",
        href: "/real-estate",
        description:
          "Property listings, rentals, sales and lead capture for agents & brokers.",
      },
    ],
  },
  {
    type: "menu",
    label: "Dashboards",
    items: [
      {
        label: "Customer Portal",
        href: "/dashboard/customer",
        description: "Single place for customers to manage finance, marketplace & real estate.",
      },
      {
        label: "Admin Console",
        href: "/dashboard/admin",
        description: "Central control for approvals, uploads and cross-vertical settings.",
      },
      {
        label: "Finance Ops",
        href: "/dashboard/finance",
        description: "Ops view for savings, loans and disbursements.",
      },
      {
        label: "Marketplace Ops",
        href: "/dashboard/marketplace",
        description: "Manage products, vendors and marketplace activity.",
      },
      {
        label: "Real Estate Ops",
        href: "/dashboard/real-estate",
        description: "Track listings, inquiries and property performance.",
      },
    ],
  },
  {
    type: "menu",
    label: "Resources",
    items: [
      {
        label: "About DeviroxN Enterprise",
        href: "/about",
        description: "Learn more about the platform and how the 3 suites connect.",
      },
      {
        label: "Design System",
        href: "/design-system",
        description: "Internal UI kit and components powering all dashboards.",
      },
      {
        label: "Status & Security",
        href: "/#status",
        description: "Reliability, uptime and compliance information.",
      },
    ],
  },
];

export default function HeroHeader() {
  const pathname = usePathname();
  const id = useId();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-40 px-4 md:px-6 shadow-sm">
      {/* TOP BAR */}
      <div className="flex h-16 items-center justify-between gap-4">
        {/* LEFT: Mobile menu + Logo */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden group size-9"
              >
                {mobileOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-64 p-3 md:hidden"
              sideOffset={8}
            >
              <nav className="space-y-3 text-sm">
                {navGroups.map((group) =>
                  group.type === "link" ? (
                    <a
                      key={group.href}
                      href={group.href}
                      className={`block rounded-md px-3 py-2 font-medium ${
                        isActive(group.href!)
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {group.label}
                    </a>
                  ) : (
                    <div key={group.label}>
                      <div className="px-3 text-xs font-semibold uppercase text-muted-foreground">
                        {group.label}
                      </div>
                      <div className="mt-1 space-y-1">
                        {group.items?.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className={`block rounded-md px-3 py-1.5 ${
                              isActive(item.href)
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className="font-medium">{item.label}</div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                )}

                {/* Mobile auth actions */}
                <div className="mt-3 border-t pt-3 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                    asChild
                  >
                    <a href="/login">Login</a>
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                    asChild
                  >
                    <a href="/register">Sign Up</a>
                  </Button>
                </div>
              </nav>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Image src={logo} alt="DeviroxN Enterprise" width={30} height={30} />
          </a>
        </div>

        {/* CENTER: Search (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-sm">
            <Input
              id={id}
              placeholder="Search products, properties or clients..."
              className="pl-9"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* RIGHT: Notification + User menu */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:block border-t py-2">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {navGroups.map((group) =>
              group.type === "link" ? (
                <NavigationMenuItem key={group.href}>
                  <NavigationMenuLink
                    href={group.href}
                    active={isActive(group.href!)}
                    className={`px-3 py-1.5 text-sm font-medium ${
                      isActive(group.href!)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {group.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="grid gap-3 md:w-[480px] lg:w-[560px] md:grid-cols-2">
                      {group.items?.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className={`group flex flex-col rounded-lg border bg-background p-3 hover:border-primary/40 hover:bg-muted/50 ${
                            isActive(item.href)
                              ? "border-primary/60"
                              : "border-border"
                          }`}
                        >
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-1 text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
