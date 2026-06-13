'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { 
  BrainCircuit, 
  Sparkles, 
  LayoutDashboard, 
  ArrowRight,
  Mic,
  PieChart,
  Repeat
} from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Capture",
    desc: "Speak or type your raw, unfiltered thoughts. No need for structure or punctuation.",
    icon: Mic,
    color: "bg-blue-500/20 text-blue-500"
  },
  {
    title: "Process",
    desc: "Our AI engine analyzes the content, splitting sentences and identifying context.",
    icon: BrainCircuit,
    color: "bg-primary/20 text-primary"
  },
  {
    title: "Categorize",
    desc: "Everything is automatically sorted into Tasks, Ideas, Worries, Goals, and Reminders.",
    icon: Sparkles,
    color: "bg-secondary/20 text-secondary"
  },
  {
    title: "Reflect",
    desc: "View long-term analytics and insights to understand your mental patterns.",
    icon: PieChart,
    color: "bg-green-500/20 text-green-500"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-24 pb-32">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black tracking-tight">The Science of Clarity.</h1>
        <p className="text-foreground/60 text-xl max-w-2xl mx-auto">
          MindDump isn't just a notes app. It's a structured cognitive offloading system powered by advanced AI.
        </p>
      </div>

      <div className="relative space-y-32">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 left-[2.5rem] w-1 bg-gradient-to-b from-primary via-secondary to-accent opacity-20 hidden md:block" />

        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col md:flex-row items-start gap-12"
          >
            <div className={`z-10 w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center shadow-2xl flex-shrink-0`}>
              <step.icon className="w-10 h-10" />
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-3xl font-bold">{step.title}</h3>
              <p className="text-foreground/60 text-xl leading-relaxed">
                {step.desc}
              </p>
              <div className="pt-4 flex items-center gap-2 text-primary font-bold cursor-pointer hover:translate-x-2 transition-transform">
                Learn more about {step.title} <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="p-12 text-center space-y-8 bg-white/5 border-white/10">
        <Repeat className="w-16 h-16 text-primary mx-auto animate-spin-slow" />
        <h2 className="text-3xl font-bold">Ready to break the cycle of mental clutter?</h2>
        <Button size="lg" className="px-12 h-16 text-xl rounded-2xl">Start Your First Dump</Button>
      </Card>
    </div>
  );
}
