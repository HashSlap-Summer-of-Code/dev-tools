
# ⏱️ Dev-Tools

![License](https://img.shields.io/badge/license-MIT-brightgreen)
![GitHub stars](https://img.shields.io/github/stars/HashSlap-Summer-of-Code/dev-dash)
![GitHub issues](https://img.shields.io/github/issues/HashSlap-Summer-of-Code/dev-dash)

A modern productivity suite to organize your tasks and time — featuring a to-do list, markdown notes editor, and Pomodoro time tracker. Built with **React**, **Supabase**, and **Clerk.dev**, styled using **Tailwind CSS + ShadCN UI**. Deploy it easily on **Netlify**.

---

## 🚀 Features

- 🔐 Login with Clerk (GitHub/email)
- ✅ Manage to-dos with priority & deadlines
- 🗒️ Markdown notes editor with preview
- ⏱️ Pomodoro timer with session tracking
- 🔄 Real-time sync via Supabase
- 📱 Responsive design, mobile-ready
- 🔔 Notification support for Pomodoro alerts

---

## 🧱 Tech Stack

| Layer         | Tech                              |
|---------------|------------------------------------|
| Framework     | React (Vite)                      |
| Styling       | Tailwind CSS + ShadCN UI           |
| Auth          | Clerk.dev                          |
| DB & Sync     | Supabase (PostgreSQL + Realtime)   |
| Editor        | `react-markdown`, textarea fallback|
| Hosting       | Netlify                            |

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/HashSlap-Summer-of-Code/dev-dash.git
cd dev-dash

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# Fill in the required keys in .env:
# VITE_CLERK_PUBLISHABLE_KEY=
# CLERK_SECRET_KEY=
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=

# 4. Run the app
npm run dev

# Open in browser:
# http://localhost:5173
````

---

## 📁 Project Structure

```bash
dev-dash/
├── public/                 # Static assets
├── src/
│   ├── auth/               # Clerk setup
│   ├── components/         # UI components
│   ├── pages/              # App views: ToDo, Notes, Timer
│   ├── services/           # Supabase client, storage handlers
│   ├── utils/              # Timer logic, formatters
│   ├── App.jsx             # Root component
│   └── main.jsx            # Vite entrypoint
├── .env                    # Environment variables
├── index.html              # Base HTML
└── tailwind.config.js      # Tailwind CSS config
```

---

## 🛠 Contributing

We welcome contributors of all levels! You can:

* 🐞 Report or fix bugs
* ✨ Add new features or widgets
* 🎨 Improve UI/UX or add themes

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup and PR process.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Built by the **HashSlap Summer of Code** community — with ❤️ and open source spirit.

