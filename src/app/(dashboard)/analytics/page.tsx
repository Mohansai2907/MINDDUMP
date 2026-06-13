'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Smile,
  Frown,
  Zap,
  Brain,
  Calendar,
  ChevronDown
} from 'lucide-react';

import { motion } from 'framer-motion';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const productivityData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const moodData = [
  { name: 'Happy', value: 45, color: '#8b5cf6' },
  { name: 'Stressed', value: 25, color: '#ef4444' },
  { name: 'Calm', value: 30, color: '#3b82f6' },
];

const categoryDistribution = [
  { category: 'Tasks', count: 42, fill: '#8b5cf6' },
  { category: 'Ideas', count: 28, fill: '#ec4899' },
  { category: 'Worries', count: 15, fill: '#f59e0b' },
  { category: 'Goals', count: 12, fill: '#10b981' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-foreground/60 text-lg mt-1">Deep dive into your mental patterns.</p>
        </div>
        <Button variant="glass" className="gap-2">
          <Calendar className="w-4 h-4" /> Last 30 Days <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* High-level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Thoughts', value: '1,284', change: '+12%', up: true, icon: Brain, color: 'text-primary' },
          { label: 'Avg. Clarity', value: '68%', change: '+5%', up: true, icon: Zap, color: 'text-yellow-500' },
          { label: 'Stress Level', value: 'Low', change: '-18%', up: false, icon: TrendingDown, color: 'text-green-500' },
          { label: 'Journal Streak', value: '12 Days', change: 'Personal Best', up: true, icon: TrendingUp, color: 'text-secondary' },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                {stat.change}
              </span>
            </div>
            <h4 className="text-sm font-medium text-foreground/40 uppercase tracking-wider">{stat.label}</h4>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Over Time */}
        <Card className="p-8 h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Mental Processing Activity</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-foreground/50">Last Week</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#ffffff40', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-8 h-[450px] flex flex-col">
          <h3 className="text-xl font-bold mb-8">Thought Distribution</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#ffffff60', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={40}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 p-8">
          <h3 className="text-xl font-bold mb-6">Mental Clarity Forecast</h3>
          <div className="space-y-6">
            {[
              { label: 'Morning Energy', value: 85, color: 'bg-primary' },
              { label: 'Mid-day Focus', value: 42, color: 'bg-secondary' },
              { label: 'Evening Creativity', value: 65, color: 'bg-accent' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-white/10">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <h4 className="text-xl font-bold">Optimization Suggestion</h4>
          <p className="text-sm text-foreground/50">Your clarity peaks at 10 AM. Schedule your deep mind dumps then for 25% better results.</p>
          <Button variant="glass" className="w-full">Set Reminder</Button>
        </Card>
      </div>
    </div>
  );
}
