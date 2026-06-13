export const analyzeThought = async (text: string) => {
  // Simulate AI thinking delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const cleanText = text.trim();
  if (!cleanText) return null;

  const result = {
    tasks: [] as string[],
    ideas: [] as string[],
    worries: [] as string[],
    goals: [] as string[],
    reminders: [] as string[],
  };

  // Split gently for mixed thoughts / voice transcript
  const thoughts = cleanText
    .split(/[.!?\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  // Remove duplicate results
  const addUnique = (arr: string[], item: string) => {
    if (item && !arr.includes(item)) {
      arr.push(item);
    }
  };

  thoughts.forEach((thought) => {
    const lower = thought.toLowerCase();

    // ---------- TASKS ----------
    if (
      lower.includes('need to') ||
      lower.includes('have to') ||
      lower.includes('must') ||
      lower.includes('finish') ||
      lower.includes('complete') ||
      lower.includes('submit') ||
      lower.includes('call') ||
      lower.includes('buy') ||
      lower.includes('send') ||
      lower.includes('work on')
    ) {
      let task = thought
        .replace(/i need to|need to|have to|must|should|i should/gi, '')
        .trim();

      task = task.charAt(0).toUpperCase() + task.slice(1);

      addUnique(result.tasks, task);
    }

    // ---------- IDEAS ----------
    if (
      lower.includes('idea') ||
      lower.includes('what if') ||
      lower.includes('maybe') ||
      lower.includes('could') ||
      lower.includes('imagine') ||
      lower.includes('create') ||
      lower.includes('build') ||
      lower.includes('design') ||
      lower.includes('app') ||
      lower.includes('project')
    ) {
      let idea = thought
        .replace(
          /i had an idea for|idea for|what if|maybe|i was thinking about/gi,
          ''
        )
        .trim();

      idea = idea.charAt(0).toUpperCase() + idea.slice(1);

      addUnique(result.ideas, idea);
    }

    // ---------- WORRIES ----------
    if (
      lower.includes('worried') ||
      lower.includes('stress') ||
      lower.includes('stressed') ||
      lower.includes('overwhelmed') ||
      lower.includes('fear') ||
      lower.includes('scared') ||
      lower.includes('anxious') ||
      lower.includes('nervous') ||
      lower.includes('not sure') ||
      lower.includes('concern')
    ) {
      let worry = thought
        .replace(
          /i am|i'm|worried|stressed|overwhelmed|anxious|nervous|about/gi,
          ''
        )
        .trim();

      worry = `Concern about ${worry}`;

      addUnique(result.worries, worry);
    }

    // ---------- GOALS ----------
    if (
      lower.includes('want to') ||
      lower.includes('goal') ||
      lower.includes('dream') ||
      lower.includes('future') ||
      lower.includes('one day') ||
      lower.includes('become') ||
      lower.includes('achieve')
    ) {
      let goal = thought
        .replace(
          /i want to|my goal is to|goal is to|dream to|one day|future/gi,
          ''
        )
        .trim();

      goal = goal.charAt(0).toUpperCase() + goal.slice(1);

      addUnique(result.goals, goal);
    }

    // ---------- REMINDERS ----------
    if (
      lower.includes("don't forget") ||
      lower.includes('remember') ||
      lower.includes('remind me') ||
      lower.includes('tomorrow') ||
      lower.includes('next week')
    ) {
      let reminder = thought
        .replace(
          /don't forget to|don't forget|remember to|remember|remind me to/gi,
          ''
        )
        .trim();

      reminder = reminder.charAt(0).toUpperCase() + reminder.slice(1);

      addUnique(result.reminders, reminder);
    }
  });

  // ---------- SMART AI FALLBACK ----------
  if (
    !result.tasks.length &&
    !result.ideas.length &&
    !result.worries.length &&
    !result.goals.length &&
    !result.reminders.length
  ) {
    if (
      cleanText.toLowerCase().includes('need') ||
      cleanText.toLowerCase().includes('should')
    ) {
      result.tasks.push('Possible pending task detected');
    } else {
      result.ideas.push('General thought or reflection detected');
    }
  }

  return result;
};
