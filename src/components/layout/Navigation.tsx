'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button, cn } from '@/components/ui';
import {
  LayoutDashboard,
  BrainCircuit,
  BarChart3,
  BookOpen,
  Settings,
  User,
  LogOut,
  Bell,
  Sparkles,
  Search
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Dump', href: '/dump', icon: BrainCircuit },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'Insights', href: '/insights', icon: Sparkles },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated && !['/login', '/signup', '/'].includes(pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">MindDump</span>
        </Link>

        {isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={cn(
                      "px-4 py-2 rounded-xl flex items-center gap-2 transition-all",
                      isActive ? "bg-primary/20 text-primary font-semibold" : "hover:bg-white/10 text-foreground/70"
                    )}>
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <Link href="/profile">
                <div className="flex items-center gap-3 pl-2">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs text-foreground/50">{user?.email}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border border-white/20 flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export const MobileNav = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4">
      <div className="glass rounded-2xl flex items-center justify-around py-3 px-4 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative group">
              <div className={cn(
                "p-3 rounded-xl transition-all",
                isActive ? "bg-primary text-white scale-110 shadow-lg shadow-primary/40" : "text-foreground/50"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
