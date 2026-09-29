import type { MockQuestion } from '../types'

export const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 'q1',
    title: 'Question 1',
    type: 'Behavioral',
    prompt: 'Tell me about a time you had to work with a difficult teammate.',
    wantsToKnow: [
      'How you handle interpersonal conflict',
      'Whether you stay professional under pressure',
      'If you can collaborate toward shared goals',
    ],
    tip: 'Use the STAR method (Situation – Task – Action – Result) to structure your answer.',
    estimatedMinutes: 2,
  },
  {
    id: 'q2',
    title: 'Question 2',
    type: 'Technical',
    prompt:
      'Walk me through how you would design a URL shortener like bit.ly.',
    wantsToKnow: [
      'How you break down a system into components',
      'Trade-offs around storage, caching, and scale',
      'How you reason about failures and monitoring',
    ],
    tip: 'Start with requirements, then API, data model, and scaling bottlenecks.',
    estimatedMinutes: 3,
  },
  {
    id: 'q3',
    title: 'Question 3',
    type: 'Behavioral',
    prompt:
      'Describe a project where you had to deliver under a tight deadline.',
    wantsToKnow: [
      'How you prioritize when time is limited',
      'How you communicate risk and progress',
      'What you personally owned end to end',
    ],
    tip: 'Focus on decisions you made and measurable outcomes, not just the timeline.',
    estimatedMinutes: 2,
  },
]
