interface FinishedPageProps {
  answeredCount: number
  totalCount: number
  onRestart: () => void
}

export function FinishedPage({
  answeredCount,
  totalCount,
  onRestart,
}: FinishedPageProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f8fafc] px-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Interview complete</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          You finished {answeredCount} of {totalCount} questions. AI feedback
          will show up here once the model is connected. For now this is a
          frontend-only mock flow.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-6 rounded-xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to setup
        </button>
      </div>
    </div>
  )
}
