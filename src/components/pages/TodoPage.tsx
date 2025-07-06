import { useState, useEffect } from 'react'
import { useClerkSupabase } from '../../auth/ClerkProvider'
import { Todo } from '../../types'

export default function TodoPage() {
  const supabase = useClerkSupabase()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) {
        setTodos(data || [])
      }
      setLoading(false)
    }
    
    fetchTodos()
  }, [supabase])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
            {loading ? (
              <div className="text-center py-8">
                <p>Loading tasks...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todos.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task!</p>
                ) : (
                  todos.map((todo) => (
                    <div key={todo.id} className="flex items-center p-4 border rounded-lg">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        className="mr-3"
                        readOnly
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {todo.priority}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select className="input-field">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                Add Task
              </button>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-lg font-semibold mb-4">Task Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Tasks</span>
                <span className="font-medium">{todos.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-medium">
                  {todos.filter(todo => todo.completed).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>High Priority</span>
                <span className="font-medium">
                  {todos.filter(todo => todo.priority === 'high').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 