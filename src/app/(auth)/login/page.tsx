'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button, Card, Input } from '@/components/ui';
import { BrainCircuit, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate real auth delay
    await new Promise((r) => setTimeout(r, 1000));
    login(email, email.split('@')[0]);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-6">
            <BrainCircuit className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-foreground/60 text-lg">Your mind's second home awaits.</p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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

            <Button type="submit" className="w-full py-4 text-lg" isLoading={isLoading}>
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-foreground/60">
              New to MindDump?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
