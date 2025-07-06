import { useState, useEffect } from 'react'
import { useClerkSupabase } from '../../auth/ClerkProvider'
import { Note } from '../../types'

export default function NotesPage() {
  const supabase = useClerkSupabase()
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false })
      
      if (!error) {
        setNotes(data || [])
        if (data && data.length > 0 && !activeNote) {
          setActiveNote(data[0])
        }
      }
      setLoading(false)
    }
    
    fetchNotes()
  }, [supabase, activeNote])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Markdown Notes</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
            {loading ? (
              <div className="text-center py-4">
                <p>Loading notes...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No notes yet. Create your first note!</p>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeNote?.id === note.id
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveNote(note)}
                    >
                      <h3 className="font-medium text-sm truncate">{note.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(note.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="card h-full">
            {activeNote ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{activeNote.title}</h2>
                  <button className="btn-secondary text-sm">Save</button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Edit (Markdown)
                    </label>
                    <textarea
                      className="w-full h-full p-4 border rounded-lg font-mono text-sm resize-none"
                      value={activeNote.content}
                      placeholder="Write your markdown here..."
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="w-full h-full p-4 border rounded-lg bg-gray-50 overflow-auto">
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">
                          {activeNote.content}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a note to edit</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 