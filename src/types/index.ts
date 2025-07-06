export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface PomodoroSession {
  id: string;
  duration: number;
  type: 'focus' | 'short_break' | 'long_break';
  completed: boolean;
  started_at: string;
  ended_at?: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
} 