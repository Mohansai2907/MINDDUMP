'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button, Card } from '@/components/ui';
import { 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-12">
      {/* Hero Section */}
      <div className="text-center space-y-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light font-bold text-sm uppercase tracking-widest backdrop-blur-xl">
            <Sparkles className="w-4 h-4 fill-primary-light" /> The Future of Mental Clarity
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            DUMP YOUR MIND.<br/>
            <span className="text-gradient">FIND YOUR FOCUS.</span>
          </h1>
          <p className="text-foreground/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            MindDump is the ultimate AI second brain. Capture thoughts, tasks, and worries in seconds. Let our AI organize the chaos.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/signup">
            <Button size="lg" className="h-20 px-12 text-2xl font-bold rounded-[2rem] shadow-2xl shadow-primary/40 group">
              Get Started Free <ArrowRight className="ml-2 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Link href="/app-demo">
            <Button variant="glass" size="lg" className="h-20 px-10 text-xl rounded-[2rem] border-white/20">
              <Play className="mr-3 w-6 h-6 fill-current" /> Watch Demo
            </Button>
          </Link>
        </motion.div>

        {/* Feature Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[
            { title: "AI Categorization", icon: BrainCircuit, color: "text-primary" },
            { title: "Voice-to-Task", icon: Zap, color: "text-yellow-500" },
            { title: "Private & Local", icon: Shield, color: "text-green-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              <Card className="p-8 border-white/5 hover:border-primary/20 transition-all cursor-default group">
                <item.icon className={`w-12 h-12 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-foreground/40 mt-2 leading-relaxed">
                  Advanced algorithms ensure your data is processed with extreme precision and speed.
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Elements Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/10 blur-[150px] rounded-full animate-pulse-slow delay-1000" />
      </div>
    </div>
  );
}
