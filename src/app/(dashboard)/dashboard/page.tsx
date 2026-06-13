'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useDumpStore } from '@/store/useDumpStore';
import { Card, Button } from '@/components/ui';
import { 
  BrainCircuit, 
  Plus, 
  TrendingUp, 
  Smile, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  History
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mockChartData = [
  { day: 'Mon', clarity: 45 },
  { day: 'Tue', clarity: 52 },
  { day: 'Wed', clarity: 48 },
  { day: 'Thu', clarity: 61 },
  { day: 'Fri', clarity: 55 },
  { day: 'Sat', clarity: 67 },
  { day: 'Sun', clarity: 72 },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { history } = useDumpStore();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            Good Morning, <span className="text-primary">{user?.name}</span> 👋
          </motion.h1>
          <p className="text-foreground/60 text-lg mt-1">Ready to declutter your mind today?</p>
        </div>
        <Link href="/dump">
          <Button size="lg" className="shadow-xl shadow-primary/30 group">
            <Plus className="mr-2 group-hover:rotate-90 transition-transform" /> New Mind Dump
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16" />
          </div>
          <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Clarity Score</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="text-4xl font-bold">72%</h3>
            <span className="text-green-500 text-sm font-medium flex items-center mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +12%
            </span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '72%' }} />
          </div>
        </Card>

        <Card className="group">
          <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Mind Dumps</p>
          <h3 className="text-4xl font-bold mt-2">{history.length}</h3>
          <p className="text-sm text-foreground/40 mt-1">Total thoughts processed</p>
          <div className="flex -space-x-2 mt-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border border-white/20 flex items-center justify-center text-[10px] font-bold">MD</div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Premium Status</p>
          <div className="flex items-center gap-3 mt-2">
            <h3 className="text-xl font-bold">Explorer Plan</h3>
            <Sparkles className="text-yellow-500 w-5 h-5 fill-yellow-500" />
          </div>
          <Link href="/pricing" className="text-primary text-sm font-semibold hover:underline flex items-center mt-4">
            Upgrade to Pro <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analytics Preview */}
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Clarity Trend
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#ffffff60', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clarity" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorClarity)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Dumps */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-secondary" /> Recent Dumps
            </h3>
            <Link href="/journal">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[300px] p-6 space-y-4">
            {history.length > 0 ? history.slice(0, 3).map((dump) => (
              <div key={dump.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-foreground/40">{new Date(dump.timestamp).toLocaleDateString()}</span>
                  <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm line-clamp-2 text-foreground/80">{dump.text}</p>
                <div className="mt-3 flex gap-2">
                  {Object.entries(dump.categorized).map(([key, items]) => (
                    items.length > 0 && (
                      <span key={key} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-bold tracking-wider">
                        {items.length} {key}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-3 py-8">
                <BrainCircuit className="w-12 h-12" />
                <p>No mind dumps yet. Ready to start?</p>
                <Link href="/dump">
                  <Button variant="outline" size="sm">Create First Dump</Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Mood Tracker */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Smile className="w-5 h-5 text-yellow-500" /> How are you feeling?
          </h3>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {['😔', '😐', '😊', '🤩', '🔥'].map((emoji, i) => (
            <button 
              key={i} 
              className="p-4 rounded-2xl bg-white/5 hover:bg-primary/20 hover:scale-105 transition-all text-2xl border border-white/5"
            >
              {emoji}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
