'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { Sparkles, Star, Zap, Shield, Crown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PremiumPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex p-3 rounded-2xl bg-yellow-500/20 text-yellow-500">
          <Crown className="w-12 h-12 fill-current" />
        </motion.div>
        <h1 className="text-5xl font-black tracking-tight">MindDump Platinum</h1>
        <p className="text-foreground/60 text-xl max-w-2xl mx-auto">The ultimate mental processing power for high-performance individuals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-12 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Crown className="w-32 h-32" /></div>
          <h2 className="text-3xl font-bold mb-6">Platinum Features</h2>
          <div className="space-y-4">
            {[
              "Unlimited AI Processing",
              "Bi-weekly Mental Audits",
              "Voice Stress Analysis",
              "Custom Integration APIs",
              "Dedicated Mind Coach",
              "Family Sharing (Up to 5 members)"
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-medium">{f}</span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-12 bg-yellow-500 hover:bg-yellow-600 text-[#0f172a] font-bold text-xl h-16 rounded-2xl">
            Upgrade for $49/mo
          </Button>
        </Card>

        <div className="space-y-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-2">Why go Platinum?</h3>
            <p className="text-foreground/50">Our most advanced users report a 40% increase in focus within the first 30 days of using Platinum features.</p>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-2xl">99.9%</h4>
              <p className="text-xs text-foreground/40">AI Accuracy</p>
            </Card>
            <Card className="p-6 text-center">
              <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h4 className="font-bold text-2xl">&lt;0.5s</h4>
              <p className="text-xs text-foreground/40">Response Time</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
