'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button, Card, Input } from '@/components/ui';
import { BrainCircuit, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    signup(email, name);
    router.push('/onboarding');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-secondary/40 mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">Start Your Journey</h2>
          <p className="mt-2 text-foreground/60 text-lg">Join 10,000+ minds finding clarity.</p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/50">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Free 7-day Premium trial included
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/50">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                End-to-end encrypted dumps
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-lg bg-secondary hover:bg-secondary/80 shadow-secondary/20" isLoading={isLoading}>
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-foreground/60">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

import { Sparkles } from 'lucide-react';
