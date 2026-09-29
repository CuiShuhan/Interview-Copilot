import {
  CheckCircle2,
  FileText,
  Lock,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import type { ResumeFile } from '../types'

interface SetupPageProps {
  resume: ResumeFile | null
  jobDescription: string
  canStart: boolean
  onResumeSelected: (file: File) => void
  onClearResume: () => void
  onJobDescriptionChange: (value: string) => void
  onStart: () => void
}

export function SetupPage({
  resume,
  jobDescription,
  canStart,
  onResumeSelected,
  onClearResume,
  onJobDescriptionChange,
  onStart,
}: SetupPageProps) {
  return (
    <div className="min-h-svh bg-[#f8fafc] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            New Interview
          </h1>
          <p className="mt-2 text-slate-500">
            Upload your resume and paste the job description to get started
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                <FileText size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">
                  1. Upload Your Resume
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            </div>

            <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-violet-400 hover:bg-violet-50/40">
              <div className="mb-3 rounded-full bg-violet-100 p-3 text-violet-700">
                <Upload size={22} />
              </div>
              <p className="text-sm text-slate-600">
                Drag and drop your resume here or
              </p>
              <span className="mt-3 inline-flex rounded-lg border border-violet-300 bg-white px-4 py-2 text-sm font-medium text-violet-700">
                Choose File
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onResumeSelected(file)
                }}
              />
            </label>

            {resume && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <div className="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {resume.name}
                  </p>
                  <p className="text-xs text-slate-500">{resume.sizeLabel}</p>
                </div>
                <CheckCircle2 className="text-emerald-500" size={18} />
                <button
                  type="button"
                  onClick={onClearResume}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Remove resume"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                <FileText size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">
                  2. Add Job Description
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Paste the JD text for this mock interview
                </p>
              </div>
            </div>

            <div className="mb-3 flex gap-4 border-b border-slate-200 text-sm">
              <button
                type="button"
                className="border-b-2 border-violet-600 pb-2 font-medium text-violet-700"
              >
                Paste Text
              </button>
              <button
                type="button"
                className="pb-2 text-slate-400"
                disabled
              >
                Upload File
              </button>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[220px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <p>
                Tips: Include requirements, responsibilities, and preferred
                qualifications.
              </p>
              <p>{jobDescription.length} / 5000 characters</p>
            </div>
          </section>
        </div>

        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Ready to start
              </h3>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Once your resume and job description are added, start a mock
                interview with practice questions.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <button
              type="button"
              onClick={onStart}
              disabled={!canStart}
              className="inline-flex items-center rounded-xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Start Mock Interview →
            </button>
            <p className="mt-2 flex items-center justify-end gap-1.5 text-xs text-slate-400">
              <Lock size={12} />
              Your data stays in this browser for now
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
