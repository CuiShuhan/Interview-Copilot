import { MOCK_QUESTIONS } from '../data/mockQuestions'
import type { AnswerRecord, AppState, ResumeFile } from '../types'

export const initialState: AppState = {
  phase: 'setup',
  resume: null,
  jobDescription: '',
  roleTitle: 'Software Engineer',
  questions: MOCK_QUESTIONS,
  currentIndex: 0,
  answers: {},
  draftNotes: '',
  draftAnswer: '',
  elapsedSeconds: 0,
}

export type AppAction =
  | { type: 'SET_RESUME'; resume: ResumeFile }
  | { type: 'CLEAR_RESUME' }
  | { type: 'SET_JOB_DESCRIPTION'; value: string }
  | { type: 'START_INTERVIEW' }
  | { type: 'SET_NOTES'; value: string }
  | { type: 'SET_ANSWER'; value: string }
  | { type: 'CLEAR_NOTES' }
  | { type: 'CLEAR_ANSWER' }
  | { type: 'SUBMIT_AND_NEXT' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'END_INTERVIEW' }
  | { type: 'TICK' }
  | { type: 'RESTART' }

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function resumeFromFile(file: File): ResumeFile {
  return {
    name: file.name,
    sizeLabel: formatSize(file.size),
  }
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_RESUME':
      return { ...state, resume: action.resume }
    case 'CLEAR_RESUME':
      return { ...state, resume: null }
    case 'SET_JOB_DESCRIPTION':
      return { ...state, jobDescription: action.value.slice(0, 5000) }
    case 'START_INTERVIEW': {
      if (!state.resume || !state.jobDescription.trim()) return state
      return {
        ...state,
        phase: 'interview',
        currentIndex: 0,
        answers: {},
        draftNotes: '',
        draftAnswer: '',
        elapsedSeconds: 0,
      }
    }
    case 'SET_NOTES':
      return { ...state, draftNotes: action.value.slice(0, 2000) }
    case 'SET_ANSWER':
      return { ...state, draftAnswer: action.value.slice(0, 5000) }
    case 'CLEAR_NOTES':
      return { ...state, draftNotes: '' }
    case 'CLEAR_ANSWER':
      return { ...state, draftAnswer: '' }
    case 'SUBMIT_AND_NEXT':
    case 'SKIP_QUESTION': {
      if (state.phase !== 'interview') return state
      const question = state.questions[state.currentIndex]
      if (!question) return state
      if (action.type === 'SUBMIT_AND_NEXT' && !state.draftAnswer.trim()) {
        return state
      }

      const record: AnswerRecord = {
        questionId: question.id,
        notes: state.draftNotes.trim(),
        answer: state.draftAnswer.trim(),
        skipped: action.type === 'SKIP_QUESTION',
      }

      const answers = { ...state.answers, [question.id]: record }
      const nextIndex = state.currentIndex + 1

      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          phase: 'finished',
          answers,
          draftNotes: '',
          draftAnswer: '',
        }
      }

      return {
        ...state,
        answers,
        currentIndex: nextIndex,
        draftNotes: '',
        draftAnswer: '',
      }
    }
    case 'END_INTERVIEW':
      return { ...state, phase: 'finished' }
    case 'TICK':
      return state.phase === 'interview'
        ? { ...state, elapsedSeconds: state.elapsedSeconds + 1 }
        : state
    case 'RESTART':
      return {
        ...initialState,
        resume: state.resume,
        jobDescription: state.jobDescription,
        roleTitle: state.roleTitle,
      }
    default:
      return state
  }
}

export function canStart(state: AppState): boolean {
  return Boolean(state.resume && state.jobDescription.trim())
}

export function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
