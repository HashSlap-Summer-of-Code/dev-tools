# Dev-Dash Setup Guide

This guide will help you set up the Dev-Dash project with all necessary configurations and dependencies.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp env.example .env
   ```

3. **Configure Environment Variables**
   Edit `.env` and add your API keys:
   ```env
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here

   # Supabase Database
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # Optional: Notification settings
   VITE_NOTIFICATION_TIMEOUT=30000
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173`

## Setting Up External Services

### 1. Clerk Authentication

1. Go to [Clerk.dev](https://clerk.dev) and create an account
2. Create a new application
3. Configure authentication methods (GitHub, email, etc.)
4. Add your development URL to "Allowed Redirect URLs":
   - `http://localhost:5173/*`
   - `http://localhost:5173/sign-in/*`
   - `http://localhost:5173/sign-up/*`
5. Copy your publishable key and secret key to `.env`

### 2. Supabase Database

1. Go to [Supabase.io](https://supabase.io) and create an account
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Create the following database tables:

#### Todos Table
```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy for user access
CREATE POLICY "Users can view own todos" ON todos
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own todos" ON todos
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own todos" ON todos
  FOR DELETE USING (auth.uid()::text = user_id);
```

#### Notes Table
```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policy for user access
CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid()::text = user_id);
```

#### Pomodoro Sessions Table
```sql
CREATE TABLE pomodoro_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  duration INTEGER NOT NULL,
  type TEXT CHECK (type IN ('focus', 'short_break', 'long_break')) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  user_id TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for user access
CREATE POLICY "Users can view own sessions" ON pomodoro_sessions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own sessions" ON pomodoro_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own sessions" ON pomodoro_sessions
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own sessions" ON pomodoro_sessions
  FOR DELETE USING (auth.uid()::text = user_id);
```

5. Copy your project URL and anon key to `.env`

## Project Structure

```
dev-dash/
├── public/                 # Static assets
├── src/
│   ├── auth/               # Clerk authentication setup
│   ├── components/         # UI components
│   │   ├── pages/          # Page components
│   │   └── ui/             # Reusable UI components
│   ├── services/           # Supabase client
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Vite entrypoint
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── env.example             # Environment variables template
├── index.html              # Base HTML
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- 🔐 **Authentication**: Secure login with Clerk
- ✅ **Task Management**: Create, edit, and track todos with priorities
- 🗒️ **Markdown Notes**: Write and preview notes in Markdown
- ⏱️ **Pomodoro Timer**: Focus timer with session tracking
- 🔄 **Real-time Sync**: Data syncs across devices via Supabase
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔔 **Notifications**: Browser notifications for timer alerts

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL + Realtime)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **UI Components**: Custom components with class-variance-authority

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify settings
4. Deploy

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Make sure all dependencies are installed
2. **Environment Variables**: Ensure all required keys are set in `.env`
3. **Clerk Integration**: Check that your publishable key is correct
4. **Supabase Connection**: Verify your project URL and anon key

### Getting Help

- Check the [Clerk documentation](https://clerk.com/docs)
- Review the [Supabase documentation](https://supabase.com/docs)
- Open an issue in the repository

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to the project. 