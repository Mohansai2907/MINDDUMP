'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { 
  Sparkles, 
  Brain, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Cloud,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Welcome to MindDump",
    description: "Your journey to mental clarity starts here. We use AI to help you categorize and process your thoughts.",
    icon: Brain,
    color: "bg-primary/20 text-primary"
  },
  {
    id: 2,
    title: "The Core System",
    description: "Every thought is classified as a Task, Idea, Worry, Goal, or Reminder. Just dump, we handle the rest.",
    icon: Sparkles,
    color: "bg-secondary/20 text-secondary"
  },
  {
    id: 3,
    title: "Secure & Private",
    description: "Your mind is your own. All dumps are encrypted and local-first by default. You control your data.",
    icon: CheckCircle2,
    color: "bg-green-500/20 text-green-500"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <Card className="max-w-2xl w-full p-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
          <motion.div 
            className="h-full bg-primary"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8"
          >
            <div className={`w-24 h-24 rounded-3xl ${steps[currentStep].color} mx-auto flex items-center justify-center shadow-2xl`}>
              <StepIcon className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight">{steps[currentStep].title}</h1>
              <p className="text-foreground/60 text-xl leading-relaxed max-w-lg mx-auto">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="pt-8">
              <Button size="lg" className="w-full sm:w-auto px-12 h-16 text-lg" onClick={handleNext}>
                {currentStep === steps.length - 1 ? (
                  <>Enter Dashboard <LayoutDashboard className="ml-2 w-6 h-6" /></>
                ) : (
                  <>Next Step <ArrowRight className="ml-2 w-6 h-6" /></>
                )}
              </Button>
            </div>

            <div className="flex justify-center gap-2 pt-4">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'w-8 bg-primary' : 'bg-white/10'}`} 
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}
