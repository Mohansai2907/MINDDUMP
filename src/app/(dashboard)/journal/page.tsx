'use client';

import React, { useState } from 'react';
import { useDumpStore } from '@/store/useDumpStore';
import { Card, Button, Input } from '@/components/ui';
import { 
  Search, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Filter, 
  BrainCircuit, 
  Trash2,
  Clock,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JournalPage() {
  const { history, clearHistory } = useDumpStore();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredHistory = history.filter(item => 
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Mind Journal</h1>
          <p className="text-foreground/60 text-lg mt-1">A history of your evolving thoughts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/40 hover:text-foreground'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/40 hover:text-foreground'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
          <Button variant="glass" size="icon" className="text-red-500 hover:bg-red-500/10" onClick={() => {
            if(confirm('Are you sure you want to clear your entire history?')) clearHistory();
          }}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <Input 
            placeholder="Search through your thoughts..." 
            className="pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {filteredHistory.length > 0 ? (
        <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((dump, idx) => (
              <motion.div
                key={dump.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`group hover:border-primary/30 h-full flex flex-col ${view === 'list' ? 'flex-row items-center gap-6 p-4' : ''}`}>
                  <div className={`${view === 'list' ? 'w-32 flex-shrink-0' : 'mb-4'} space-y-1`}>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <Clock className="w-3 h-3" />
                      {new Date(dump.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/40 text-xs">
                      <CalendarIcon className="w-3 h-3" />
                      {new Date(dump.timestamp).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className={`text-foreground/80 leading-relaxed ${view === 'grid' ? 'line-clamp-3' : 'line-clamp-1'}`}>
                      {dump.text}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(dump.categorized).map(([key, items]) => (
                        items.length > 0 && (
                          <span key={key} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-foreground/60 uppercase font-bold">
                            {items.length} {key}
                          </span>
                        )
                      ))}
                    </div>
                  </div>

                  <div className={view === 'list' ? '' : 'pt-4 mt-auto'}>
                    <Button variant="ghost" size="sm" className="w-full justify-between group/btn">
                      View Analysis <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-full">
            <BrainCircuit className="w-20 h-20 text-foreground/10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground/40">No entries found</h3>
            <p className="text-foreground/30">Try adjusting your search or create a new dump.</p>
          </div>
          <Button onClick={() => setSearch('')}>Clear Search</Button>
        </div>
      )}
    </div>
  );
}
