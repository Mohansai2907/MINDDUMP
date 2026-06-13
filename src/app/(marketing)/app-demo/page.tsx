'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { analyzeThought } from '@/lib/ai-engine';

export default function TrialDumpPage() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('trialCount');
    if (stored) {
      setCount(Number(stored));
    }
  }, []);

  const handleProcess = async () => {
    if (!text.trim()) {
      alert('Please enter your thoughts');
      return;
    }

    // 5-use trial limit
    if (count >= 5) {
      alert('Free trial limit reached. Please login to continue.');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const aiResult = await analyzeThought(text);

      if (aiResult) {
        setResult(aiResult);

        const newCount = count + 1;
        localStorage.setItem('trialCount', newCount.toString());
        setCount(newCount);
      }
    } catch (err) {
      console.log(err);
      alert('AI processing failed');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-10">

      {/* Heading */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Experience MindDump
        </h1>

        <p className="text-foreground/60">
          See how easy it is to declutter your mind in under 60 seconds.
        </p>
      </div>

      {/* Demo Video */}
      <Card className="overflow-hidden border-primary/20 shadow-2xl">
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/8jPQjjsBbIc"
            title="MindDump Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6 text-left">
          <h3 className="text-xl font-bold">
            Full Platform Walkthrough
          </h3>

          <p className="text-foreground/60 text-sm">
            Watch how MindDump turns messy thoughts into clarity.
          </p>
        </div>
      </Card>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: 'Step 1',
            title: 'Dump',
            desc: 'Speak or type your raw thoughts.',
          },
          {
            label: 'Step 2',
            title: 'AI Organize',
            desc: 'MindDump categorizes everything automatically.',
          },
          {
            label: 'Step 3',
            title: 'Reflect',
            desc: 'Get clarity, tasks and useful insights.',
          },
        ].map((step, i) => (
          <Card key={i} className="p-6 text-left space-y-2">
            <span className="text-xs font-bold text-primary uppercase">
              {step.label}
            </span>

            <h4 className="font-bold">
              {step.title}
            </h4>

            <p className="text-xs text-foreground/40">
              {step.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Trial Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">
          Try MindDump Free
        </h2>

        <p className="text-foreground/60">
          Free Trial Remaining:
          <span className="font-semibold">
            {' '}
            {Math.max(0, 5 - count)} / 5
          </span>
        </p>
      </div>

      {/* Input */}
      <Card className="p-6 space-y-6 border-primary/20 shadow-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I'm feeling overwhelmed today... I need to finish work, call someone, and I have an idea for a project..."
          className="w-full min-h-[260px] bg-transparent outline-none text-lg resize-none"
        />

        <Button
          onClick={handleProcess}
          disabled={loading}
          className="w-full h-14 text-lg"
        >
          {loading ? 'AI Thinking...' : 'Process with AI'}
        </Button>
      </Card>

      {/* AI Results */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6">

          {result.tasks?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-3">
                Tasks
              </h3>

              <ul className="space-y-2">
                {result.tasks.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          )}

          {result.ideas?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-3">
                Ideas
              </h3>

              <ul className="space-y-2">
                {result.ideas.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          )}

          {result.worries?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-3">
                Worries
              </h3>

              <ul className="space-y-2">
                {result.worries.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          )}

          {result.goals?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-3">
                Goals
              </h3>

              <ul className="space-y-2">
                {result.goals.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          )}

          {result.reminders?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-bold text-lg mb-3">
                Reminders
              </h3>

              <ul className="space-y-2">
                {result.reminders.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          )}

        </div>
      )}
    </div>
  );
}
