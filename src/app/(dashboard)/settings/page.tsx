'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { 
  Bell, 
  Moon, 
  Smartphone, 
  Zap, 
  Shield, 
  Eye, 
  Database,
  Cloud,
  ChevronRight,
  Sun
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-foreground/60 text-lg mt-1">Configure MindDump to fit your workflow.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-widest px-2">Appearance</h3>
          <Card className="p-0 overflow-hidden divide-y divide-white/5">
            <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Dark Mode</h4>
                  <p className="text-sm text-foreground/40">Switch between light and dark themes.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-white/5 rounded-lg p-1">
                  <button className="p-1.5 rounded-md"><Sun className="w-4 h-4 text-foreground/40" /></button>
                  <button className="p-1.5 rounded-md bg-primary text-white shadow-lg"><Moon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Animations</h4>
                  <p className="text-sm text-foreground/40">Enable smooth UI transitions.</p>
                </div>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full p-1 cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full ml-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* Connectivity Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-widest px-2">Integrations</h3>
          <Card className="p-0 overflow-hidden divide-y divide-white/5">
            {[
              { label: 'Notion', icon: Database, color: 'text-white', connected: true },
              { label: 'Google Calendar', icon: Smartphone, color: 'text-blue-500', connected: false },
              { label: 'Cloud Sync', icon: Cloud, color: 'text-accent', connected: true },
            ].map((item, i) => (
              <div key={i} className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.label}</h4>
                    <p className="text-sm text-foreground/40">{item.connected ? 'Connected' : 'Not linked'}</p>
                  </div>
                </div>
                <Button variant={item.connected ? 'glass' : 'outline'} size="sm">
                  {item.connected ? 'Configure' : 'Connect'}
                </Button>
              </div>
            ))}
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4 pt-8">
          <h3 className="text-sm font-bold text-red-500/60 uppercase tracking-widest px-2">Danger Zone</h3>
          <Card className="border-red-500/20 bg-red-500/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-red-500">Delete Account</h4>
              <p className="text-sm text-red-500/60">Permanently remove all your mind dumps and data. This action is irreversible.</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20">Delete Everything</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
