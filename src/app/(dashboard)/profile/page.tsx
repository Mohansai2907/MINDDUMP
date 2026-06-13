'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, Button, Input } from '@/components/ui';
import { 
  User, 
  Mail, 
  Shield, 
  CreditCard, 
  LogOut, 
  Camera, 
  CheckCircle2,
  Settings as SettingsIcon,
  Bell,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
        
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden relative">
              <User className="w-16 h-16 text-primary" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-[#0f172a] rounded-full" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{user?.name}</h1>
          <p className="text-foreground/60 text-lg">{user?.email}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">Explorer Plan</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-foreground/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Account
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="glass" className="gap-2">
            Edit Profile
          </Button>
          <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 gap-2" onClick={logout}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" /> Account Settings
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground/40 px-1">Display Name</label>
              <Input value={user?.name || ''} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/40 px-1">Email Address</label>
              <Input value={user?.email || ''} readOnly />
            </div>
            <Button variant="outline" className="w-full">Update Information</Button>
          </div>
        </Card>

        <Card className="p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" /> Privacy & Security
          </h3>
          <div className="space-y-3">
            {[
              { icon: Lock, label: 'Two-Factor Authentication', enabled: true },
              { icon: Globe, label: 'Public Profile Visibility', enabled: false },
              { icon: Bell, label: 'Email Notifications', enabled: true },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <setting.icon className="w-4 h-4 text-foreground/40" />
                  <span className="text-sm font-medium">{setting.label}</span>
                </div>
                <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-all ${setting.enabled ? 'bg-primary' : 'bg-white/10'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full transition-all ${setting.enabled ? 'ml-5' : 'ml-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-accent/20 text-accent">
            <CreditCard className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Billing & Subscription</h4>
            <p className="text-sm text-foreground/40">You are currently on the free Explorer plan.</p>
          </div>
        </div>
        <Button className="bg-accent hover:bg-accent/80">Manage Subscription</Button>
      </Card>
    </div>
  );
}
