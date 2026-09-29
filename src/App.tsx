import { useEffect, useReducer } from 'react'
import { FinishedPage } from './components/FinishedPage'
import { InterviewPage } from './components/InterviewPage'
import { SetupPage } from './components/SetupPage'
import {
  appReducer,
  canStart,
  formatTimer,
  initialState,
  resumeFromFile,
} from './state/appReducer'

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    if (state.phase !== 'interview') return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => window.clearInterval(id)
  }, [state.phase])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (state.phase !== 'interview') return
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        dispatch({ type: 'SUBMIT_AND_NEXT' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [state.phase])

  if (state.phase === 'setup') {
    return (
      <SetupPage
        resume={state.resume}
        jobDescription={state.jobDescription}
        canStart={canStart(state)}
        onResumeSelected={(file) =>
          dispatch({ type: 'SET_RESUME', resume: resumeFromFile(file) })
        }
        onClearResume={() => dispatch({ type: 'CLEAR_RESUME' })}
        onJobDescriptionChange={(value) =>
          dispatch({ type: 'SET_JOB_DESCRIPTION', value })
        }
        onStart={() => dispatch({ type: 'START_INTERVIEW' })}
      />
    )
  }

  if (state.phase === 'interview') {
    return (
      <InterviewPage
        roleTitle={state.roleTitle}
        questions={state.questions}
        currentIndex={state.currentIndex}
        notes={state.draftNotes}
        answer={state.draftAnswer}
        timerLabel={formatTimer(state.elapsedSeconds)}
        onNotesChange={(value) => dispatch({ type: 'SET_NOTES', value })}
        onAnswerChange={(value) => dispatch({ type: 'SET_ANSWER', value })}
        onClearNotes={() => dispatch({ type: 'CLEAR_NOTES' })}
        onClearAnswer={() => dispatch({ type: 'CLEAR_ANSWER' })}
        onSubmit={() => dispatch({ type: 'SUBMIT_AND_NEXT' })}
        onSkip={() => dispatch({ type: 'SKIP_QUESTION' })}
        onEnd={() => dispatch({ type: 'END_INTERVIEW' })}
      />
    )
  }

  return (
    <FinishedPage
      answeredCount={Object.keys(state.answers).length}
      totalCount={state.questions.length}
      onRestart={() => dispatch({ type: 'RESTART' })}
    />
  )
}
