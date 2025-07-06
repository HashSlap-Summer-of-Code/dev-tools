import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Boost Your Developer Productivity
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          A modern productivity suite to organize your tasks and time — featuring a to-do list, markdown notes editor, and Pomodoro time tracker.
        </p>
      </div>
      
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="card">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Task Management</h3>
          <p className="text-gray-600">
            Prioritize tasks, set deadlines, and track progress with our intuitive to-do system.
          </p>
        </div>
        
        <div className="card">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Markdown Notes</h3>
          <p className="text-gray-600">
            Write and preview notes in Markdown format with real-time syncing across devices.
          </p>
        </div>
        
        <div className="card">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Pomodoro Timer</h3>
          <p className="text-gray-600">
            Stay focused with timed work sessions and track your productivity over time.
          </p>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <Link to="/sign-in">
          <button className="btn-primary text-lg px-8 py-3">Get Started</button>
        </Link>
        <p className="mt-4 text-gray-500">
          Already have an account? <Link to="/sign-in" className="text-primary-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
} 