'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Brain, 
  ShieldCheck, 
  ArrowRight,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Explorer",
    price: "$0",
    description: "Perfect for getting started with mental clarity.",
    features: [
      "5 Mind Dumps per month",
      "Basic AI Categorization",
      "7-day history retention",
      "Mobile App access",
      "Community support"
    ],
    button: "Current Plan",
    variant: "glass",
    popular: false
  },
  {
    name: "Thinker",
    price: "$12",
    description: "For those serious about their productivity.",
    features: [
      "Unlimited Mind Dumps",
      "Advanced AI Insights",
      "Lifetime history retention",
      "Notion & Slack Integration",
      "Priority AI processing",
      "Voice simulation Pro"
    ],
    button: "Get Started",
    variant: "primary",
    popular: true
  },
  {
    name: "Visionary",
    price: "$29",
    description: "Complete mental ecosystem for high achievers.",
    features: [
      "Everything in Thinker",
      "Custom AI Models",
      "Mental Health Audit (Bi-weekly)",
      "Dedicated Human Coach",
      "Early access to new features",
      "White-glove data migration"
    ],
    button: "Go Pro",
    variant: "secondary",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="space-y-16 py-12 pb-24">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-4 h-4 fill-primary" /> Transparent Pricing
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Invest in Your Clarity</h1>
        <p className="text-foreground/60 text-xl">Choose the plan that fits your mental processing needs. No hidden fees, cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-widest shadow-xl">
                Most Popular
              </div>
            )}
            
            <Card className={`h-full flex flex-col p-8 border-white/10 relative overflow-hidden ${plan.popular ? 'border-primary/50 ring-2 ring-primary/20 scale-105 shadow-2xl' : ''}`}>
              {plan.popular && <div className="absolute top-0 right-0 p-4 opacity-5"><Star className="w-24 h-24" /></div>}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-foreground/40 font-medium">/month</span>
                </div>
                <p className="text-foreground/60 mt-4 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant={plan.variant as any} size="lg" className="w-full">
                {plan.button}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table for Mobile/Desktop */}
      <Card className="p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
          <p className="text-foreground/50">Need MindDump for your entire team? Get custom security and billing.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xs font-bold">JD</div>
            ))}
          </div>
          <div className="text-center md:text-left">
            <p className="font-bold">Trusted by 500+ teams</p>
            <p className="text-sm text-foreground/40">From startups to Fortune 500 companies.</p>
          </div>
          <Button variant="outline" size="lg" className="md:ml-auto">Contact Sales</Button>
        </div>
      </Card>
    </div>
  );
}
