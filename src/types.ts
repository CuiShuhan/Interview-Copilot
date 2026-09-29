export type AppPhase = 'setup' | 'interview' | 'finished'

export interface ResumeFile {
  name: string
  sizeLabel: string
}

export interface MockQuestion {
  id: string
  title: string
  type: 'Behavioral' | 'Technical' | 'System Design'
  prompt: string
  wantsToKnow: string[]
  tip: string
  estimatedMinutes: number
}

export interface AnswerRecord {
  questionId: string
  notes: string
  answer: string
  skipped?: boolean
}

export interface AppState {
  phase: AppPhase
  resume: ResumeFile | null
  jobDescription: string
  roleTitle: string
  questions: MockQuestion[]
  currentIndex: number
  answers: Record<string, AnswerRecord>
  draftNotes: string
  draftAnswer: string
  elapsedSeconds: number
}
