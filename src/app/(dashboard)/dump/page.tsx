'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeThought } from '@/lib/ai-engine';
import { useDumpStore } from '@/store/useDumpStore';
import { Button, Card } from '@/components/ui';
import { 
  BrainCircuit, 
  Mic, 
  Send, 
  Sparkles, 
  X, 
  Loader2,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DumpPage() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const addDump = useDumpStore((state) => state.addDump);
  const router = useRouter();

  const handleProcess = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    try {
      const categorized = await analyzeThought(text);
      if (categorized) {
        const result = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          text,
          categorized,
        };
        addDump(result);
        router.push('/results');
      }
    } catch (error) {
      console.error('Processing failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setText("I need to finish the project proposal by Friday. Also, I'm worried about the client meeting. I should call Sarah about the design. Maybe we can use a purple theme for the app? Don't forget to buy coffee.");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-2">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/30 mb-6"
        >
          <BrainCircuit className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight">The Mind Dump</h1>
        <p className="text-foreground/60 text-lg">Speak your mind, raw and unfiltered. AI will do the rest.</p>
      </div>

      <Card className="relative p-0 overflow-hidden border-primary/20 shadow-2xl shadow-primary/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        <textarea
          className="w-full h-64 p-8 bg-transparent text-xl outline-none resize-none placeholder:text-foreground/20 leading-relaxed"
          placeholder="I'm feeling a bit overwhelmed today... I have so many tasks like finishing the report and calling the bank. Also, I have this cool idea for a new gardening app. I keep worrying about the weather for the weekend trip..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <Button 
              variant={isListening ? 'secondary' : 'glass'} 
              size="icon" 
              className={cn("w-12 h-12 rounded-full", isListening && "animate-pulse")}
              onClick={toggleListening}
            >
              {isListening ? <Volume2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            {text && (
              <Button variant="ghost" size="icon" onClick={() => setText('')}>
                <X className="w-6 h-6" />
              </Button>
            )}
          </div>

          <Button 
            size="lg" 
            className="px-8" 
            disabled={!text.trim() || isProcessing}
            onClick={handleProcess}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Process with AI <Sparkles className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-center gap-3 text-primary"
          >
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [10, 30, 10] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-primary rounded-full"
                />
              ))}
            </div>
            <span className="font-medium">Listening to your thoughts...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-primary/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Privacy First</h4>
            <p className="text-sm text-foreground/50">Your dumps are never shared with anyone. Local-first processing for your peace of mind.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-secondary/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-bold">Smart Classification</h4>
            <p className="text-sm text-foreground/50">Our AI identifies tasks, goals, and even subtle worries to give you total clarity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/components/ui';
