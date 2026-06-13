'use client';

import React from 'react';
import { Card, Button, Input } from '@/components/ui';
import { Mail, MessageSquare, Globe, ArrowRight, Twitter, Github } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="text-foreground/60 text-xl leading-relaxed">
            Have questions about MindDump? We're here to help you achieve total mental clarity.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-primary/50 transition-colors">
            <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Email Us</h4>
              <p className="text-foreground/40">support@minddump.ai</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-secondary/50 transition-colors">
            <div className="p-4 rounded-2xl bg-secondary/20 text-secondary group-hover:scale-110 transition-transform">
              <Twitter className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Twitter</h4>
              <p className="text-foreground/40">@MindDumpAI</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-10 space-y-6 shadow-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/60 px-1">Your Name</label>
            <Input placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/60 px-1">Email Address</label>
            <Input placeholder="john@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/60 px-1">Message</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/40 h-32 resize-none"
              placeholder="How can we help?"
            />
          </div>
        </div>
        <Button className="w-full h-14 text-lg">
          Send Message <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Card>
    </div>
  );
}
