'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDumpStore } from '@/store/useDumpStore';
import { Button, Card } from '@/components/ui';
import { 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Target, 
  Bell, 
  ArrowLeft,
  Share2,
  Download,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const categoryConfig = {
  tasks: { icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-500/10', title: 'Tasks to Do' },
  ideas: { icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500/10', title: 'Creative Ideas' },
  worries: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', title: 'Mind Worries' },
  goals: { icon: Target, color: 'text-green-500', bg: 'bg-green-500/10', title: 'Future Goals' },
  reminders: { icon: Bell, color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'Reminders' },
};

export default function ResultsPage() {
  const { lastResult } = useDumpStore();
  const router = useRouter();

  if (!lastResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 bg-white/5 rounded-full">
          <AlertTriangle className="w-16 h-16 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">No Results Found</h2>
        <p className="text-foreground/50 max-w-md">You haven't performed a mind dump yet. Start by clearing your mind on the dump page.</p>
        <Button size="lg" onClick={() => router.push('/dump')}>Go to Dump Page</Button>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push('/dump')}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Dump
        </Button>
        <div className="flex gap-3">
          <Button variant="glass" size="sm">
            <Share2 className="mr-2 w-4 h-4" /> Share
          </Button>
          <Button variant="glass" size="sm">
            <Download className="mr-2 w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest">
          AI Analysis Complete
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Your Mind, Organized</h1>
        <p className="text-foreground/60 max-w-2xl mx-auto italic">
          "{lastResult.text.substring(0, 100)}..."
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(lastResult.categorized).map(([key, list]) => {
          const config = categoryConfig[key as keyof typeof categoryConfig];
          const Icon = config.icon;
          
          return (
            <motion.div key={key} variants={item}>
              <Card className="h-full flex flex-col p-0 overflow-hidden">
                <div className={`p-4 ${config.bg} border-b border-white/5 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/20 ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold">{config.title}</h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-md">
                    {list.length}
                  </span>
                </div>
                
                <div className="p-6 flex-1 space-y-4">
                  {list.length > 0 ? list.map((content, i) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                    </div>
                  )) : (
                    <p className="text-sm text-foreground/30 italic text-center py-4">No {key} detected</p>
                  )}
                </div>

                {list.length > 0 && (
                  <div className="p-4 border-t border-white/5">
                    <Button variant="ghost" size="sm" className="w-full justify-between group">
                      Sync to Notion <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}

        <motion.div variants={item}>
          <Card className="h-full border-dashed border-2 border-white/10 bg-transparent flex flex-col items-center justify-center text-center p-8 space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plus className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h4 className="font-bold">Add Category</h4>
              <p className="text-xs text-foreground/40">Customize your mind organization</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="flex flex-col items-center justify-center space-y-6 pt-12">
        <h3 className="text-2xl font-bold">Feeling better?</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="primary" size="lg" onClick={() => router.push('/dump')}>
            Dump More Thoughts
          </Button>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
