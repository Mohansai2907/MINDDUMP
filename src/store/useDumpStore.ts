import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface DumpResult {
  id: string;
  timestamp: string;
  text: string;
  categorized: {
    tasks: string[];
    ideas: string[];
    worries: string[];
    goals: string[];
    reminders: string[];
  };
}

interface DumpState {
  history: DumpResult[];
  lastResult: DumpResult | null;
  addDump: (result: DumpResult) => void;
  clearHistory: () => void;
}

export const useDumpStore = create<DumpState>()(
  persist(
    (set) => ({
      history: [],
      lastResult: null,
      addDump: (result) => {
        set((state) => ({
          history: [result, ...state.history],
          lastResult: result,
        }));
      },
      clearHistory: () => set({ history: [], lastResult: null }),
    }),
    {
      name: 'minddump-data',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
