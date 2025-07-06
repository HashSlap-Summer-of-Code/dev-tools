import { useState } from 'react'
import { PomodoroSession } from '../../types'

export default function TimerPage() {
  const [sessions] = useState<PomodoroSession[]>([])
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentSession, setCurrentSession] = useState<'focus' | 'short_break' | 'long_break'>('focus')

  // TODO: Implement session completion logic
  // const handleSessionComplete = (session: PomodoroSession) => {
  //   setSessions(prev => [session, ...prev])
  // }

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
    setCurrentSession('focus')
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pomodoro Timer</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-6">Current Session</h2>
              
              <div className="mb-8">
                <div className="text-6xl font-mono font-bold text-primary-600 mb-4">
                  {formatTime(timeLeft)}
                </div>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentSession === 'focus' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentSession('focus')
                      setTimeLeft(25 * 60)
                    }}
                  >
                    Focus
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentSession === 'short_break' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentSession('short_break')
                      setTimeLeft(5 * 60)
                    }}
                  >
                    Short Break
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentSession === 'long_break' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentSession('long_break')
                      setTimeLeft(15 * 60)
                    }}
                  >
                    Long Break
                  </button>
                </div>
                
                <div className="flex justify-center space-x-4">
                  {!isRunning ? (
                    <button
                      onClick={startTimer}
                      className="btn-primary px-8 py-3 text-lg"
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      onClick={pauseTimer}
                      className="btn-secondary px-8 py-3 text-lg"
                    >
                      Pause
                    </button>
                  )}
                  <button
                    onClick={resetTimer}
                    className="btn-secondary px-8 py-3 text-lg"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Session History</h2>
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No sessions completed yet</p>
              ) : (
                sessions.slice(0, 5).map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        session.type === 'focus' ? 'bg-primary-100 text-primary-800' :
                        session.type === 'short_break' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.floor(session.duration / 60)}m
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-lg font-semibold mb-4">Pomodoro Technique</h2>
            <p className="text-gray-600 mb-3">
              Work for 25 minutes, then take a 5-minute break. After four cycles, take a longer 15-30 minute break.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                <span>Focus Time: 25 min</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Short Break: 5 min</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Long Break: 15 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 