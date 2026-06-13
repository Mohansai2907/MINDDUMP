'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { Bell, BellOff, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "Welcome to MindDump", body: "Glad to have you here! Start by creating your first mind dump.", time: "2 hours ago", type: "system" },
    { id: 2, title: "New Feature: Voice Analysis", body: "You can now record your thoughts and we'll analyze your stress levels.", time: "1 day ago", type: "feature" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Notifications</h1>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? notifications.map((n) => (
          <Card key={n.id} className="p-6 flex items-start gap-4 hover:bg-white/5 transition-colors border-white/5">
            <div className={`p-3 rounded-xl ${n.type === 'feature' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-foreground/40'}`}>
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{n.title}</h3>
                <span className="text-xs text-foreground/40">{n.time}</span>
              </div>
              <p className="text-sm text-foreground/60">{n.body}</p>
            </div>
          </Card>
        )) : (
          <div className="text-center py-20 space-y-4 opacity-50">
            <BellOff className="w-16 h-16 mx-auto" />
            <p className="text-xl">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
