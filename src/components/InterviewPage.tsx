import {
  ArrowRight,
  Bold,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Italic,
  Lightbulb,
  Link2,
  List,
  ListOrdered,
  Lock,
  MessageSquare,
  Mic,
  NotebookPen,
  Play,
  Settings,
  Sparkles,
  Underline,
} from 'lucide-react'
import type { MockQuestion } from '../types'

interface InterviewPageProps {
  roleTitle: string
  questions: MockQuestion[]
  currentIndex: number
  notes: string
  answer: string
  timerLabel: string
  onNotesChange: (value: string) => void
  onAnswerChange: (value: string) => void
  onClearNotes: () => void
  onClearAnswer: () => void
  onSubmit: () => void
  onSkip: () => void
  onEnd: () => void
}

export function InterviewPage({
  roleTitle,
  questions,
  currentIndex,
  notes,
  answer,
  timerLabel,
  onNotesChange,
  onAnswerChange,
  onClearNotes,
  onClearAnswer,
  onSubmit,
  onSkip,
  onEnd,
}: InterviewPageProps) {
  const question = questions[currentIndex]
  const total = questions.length
  const roundLabel = `Round ${currentIndex + 1} of ${total}`

  if (!question) return null

  return (
    <div className="flex min-h-svh flex-col bg-[#f8fafc]">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-slate-900">
            Mock Interview – {roleTitle}
          </h1>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            {roundLabel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-sm text-slate-700">
            {timerLabel}
          </span>
          <button
            type="button"
            onClick={onEnd}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            End Interview
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-500"
            aria-label="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-5 p-5 lg:grid-cols-2">
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              {questions.map((q, index) => {
                const locked = index > currentIndex
                const active = index === currentIndex
                return (
                  <button
                    key={q.id}
                    type="button"
                    disabled={locked}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${
                      active
                        ? 'bg-violet-50 font-medium text-violet-700'
                        : locked
                          ? 'text-slate-400'
                          : 'text-slate-600'
                    }`}
                  >
                    {locked && <Lock size={12} />}
                    Question {index + 1}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>
                {currentIndex + 1} / {total}
              </span>
              <ChevronLeft size={16} className="opacity-40" />
              <ChevronRight size={16} className="opacity-40" />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />
              <h2 className="font-semibold text-slate-900">{question.title}</h2>
              <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                {question.type}
              </span>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-slate-900">
              {question.prompt}
            </h3>

            <div className="mt-5">
              <p className="text-sm font-medium text-slate-700">
                What the interviewer wants to know:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {question.wantsToKnow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-3 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-900">
              <Lightbulb size={18} className="mt-0.5 shrink-0" />
              <p>
                <span className="font-semibold">Tip: </span>
                {question.tip}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
              >
                <Play size={14} />
                Play Question
              </button>
              <span className="text-sm text-slate-400">
                ~{question.estimatedMinutes} min
              </span>
            </div>

            <div className="mt-auto space-y-3 pt-8">
              <button
                type="button"
                onClick={onSubmit}
                disabled={!answer.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Submit Answer & Next Question
                <span className="text-xs font-normal opacity-80">⌘ Enter</span>
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 bg-white px-4 py-3 text-sm font-medium text-violet-700"
              >
                I’d like to skip this question
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex min-h-[640px] flex-col gap-5">
          <div className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <NotebookPen size={16} className="text-violet-600" />
                Notes
              </div>
              <button
                type="button"
                onClick={onClearNotes}
                className="text-sm text-slate-400 hover:text-slate-700"
              >
                Clear Notes
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Jot down key points, frameworks, or things you want to mention..."
              className="min-h-[180px] flex-1 border-0 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2 text-slate-400">
              <div className="flex items-center gap-3">
                <Bold size={14} />
                <Italic size={14} />
                <Underline size={14} />
                <List size={14} />
                <ListOrdered size={14} />
                <Code2 size={14} />
                <Link2 size={14} />
              </div>
              <span className="text-xs">{notes.length} / 2000</span>
            </div>
          </div>

          <div className="flex flex-[1.2] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <MessageSquare size={16} className="text-violet-600" />
                Your Answer
              </div>
              <button
                type="button"
                onClick={onClearAnswer}
                className="text-sm text-slate-400 hover:text-slate-700"
              >
                Clear Answer
              </button>
            </div>
            <textarea
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[220px] flex-1 border-0 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600"
              >
                <Mic size={14} />
                Voice Input
              </button>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{answer.length} / 5000</span>
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <Check size={12} />
                  Auto-save on
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
