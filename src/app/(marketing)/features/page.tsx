'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Cloud, 
  Search, 
  Smartphone, 
  Target, 
  Activity,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { title: "AI Mind Analysis", desc: "Our neural engines split your complex thoughts into actionable categories automatically.", icon: BrainCircuit, color: "text-primary" },
  { title: "Voice-to-Text Pro", desc: "Speak naturally. We handle the filler words and focus on the meat of your ideas.", icon: Zap, color: "text-yellow-500" },
  { title: "Privacy First", desc: "End-to-end encryption for every dump. Your thoughts are yours and yours only.", icon: ShieldCheck, color: "text-green-500" },
  { title: "Universal Search", desc: "Find that one idea from 6 months ago in milliseconds with semantic search.", icon: Search, color: "text-blue-500" },
  { title: "Multi-Platform", desc: "Seamless sync between desktop, web, and mobile. Clarity wherever you are.", icon: Smartphone, color: "text-purple-500" },
  { title: "Habit Tracking", desc: "See how your mental clarity correlates with your daily habits and focus.", icon: Activity, color: "text-red-500" },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">Built for Performance.</h1>
        <p className="text-foreground/60 text-xl max-w-3xl mx-auto">
          Every tool you need to master your mental landscape and boost your productivity to 11.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full p-8 border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all group">
              <div className={`p-4 rounded-2xl bg-white/5 ${f.color} mb-6 group-hover:scale-110 transition-transform w-fit`}>
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-foreground/50 leading-relaxed">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center space-y-8">
        <Sparkles className="w-16 h-16 text-primary mx-auto" />
        <h2 className="text-4xl font-bold">Ready to experience it?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="px-12">Get Started Free</Button>
          <Button variant="outline" size="lg" className="px-12">View Documentation</Button>
        </div>
      </Card>
    </div>
  );
}
