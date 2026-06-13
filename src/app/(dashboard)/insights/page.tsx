'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { 
  Sparkles, 
  Brain, 
  Target, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Zap,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    title: "The Sunday Scaries Pattern",
    description: "We've noticed your worry levels spike by 40% every Sunday evening. Most of these revolve around work-related tasks for the upcoming week.",
    recommendation: "Try a 'Pre-Week Dump' at 4 PM on Sundays to offload these thoughts early.",
    icon: ShieldCheck,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    title: "Idea Overload",
    description: "You've recorded 15+ new project ideas this week. While creative, none have been moved to the 'Goal' stage yet.",
    recommendation: "Pick one idea (e.g., 'Gardening App') and break it into 3 small tasks today.",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    title: "Consistency Peak",
    description: "You've completed a mind dump 5 days in a row! Your clarity score has increased by 22% compared to last week.",
    recommendation: "Keep this streak going to unlock the 'Zen Master' badge.",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Task Saturation",
    description: "Your 'Tasks' category is growing faster than you can complete them. You currently have 42 active items.",
    recommendation: "Use the 'Eisenhower Matrix' tool to prioritize the top 3 high-impact tasks.",
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  }
];

export default function InsightsPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-foreground/60 text-lg mt-1">Deep patterns discovered by MindDump AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 fill-primary" /> Pro Insights Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col p-8 hover:bg-white/5 transition-all border-white/5 hover:border-white/10 group">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${insight.bg} ${insight.color}`}>
                  <insight.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">{insight.title}</h3>
              </div>
              
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                {insight.description}
              </p>
              
              <div className="mt-auto p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> AI Recommendation
                </div>
                <p className="text-foreground/90 font-medium">
                  {insight.recommendation}
                </p>
                <Button className="w-full mt-2 group">
                  Apply Insight <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-12 text-center overflow-hidden relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <Brain className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-3xl font-extrabold tracking-tight">Need a deeper dive?</h2>
          <p className="text-foreground/60 text-lg">
            Our Platinum AI can analyze your voice patterns and stress levels over the last 6 months to give you a complete mental health audit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">Upgrade to Platinum</Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Learn More</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
