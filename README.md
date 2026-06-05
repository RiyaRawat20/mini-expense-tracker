# 💰 Mini Expense Tracker

> *Because every rupee counts* 💸

A full-stack web application that helps you track your daily expenses across categories, visualize your spending patterns, and stay on top of your finances — built as part of the Studio Graphene Full Stack Developer Assessment.

---

## 🌐 Live Demo

| Service | Link |
|--------|------|
| 🖥️ Frontend (Vercel) | [mini-expense-tracker-wine.vercel.app](https://mini-expense-tracker-wine.vercel.app) |
| ⚙️ Backend (Render) | [mini-expense-tracker-q8y6.onrender.com](https://mini-expense-tracker-q8y6.onrender.com) |
| 📁 GitHub Repository | [RiyaRawat20/mini-expense-tracker](https://github.com/RiyaRawat20/mini-expense-tracker) |

> ⚠️ **Note:** The backend is hosted on Render's free tier, which sleeps after 15 minutes of inactivity. The first request may take 30–60 seconds to wake up. Please be patient!

---

## 📋 Exercise Chosen

**Exercise 2 — Mini Expense Tracker**

This project is a full-stack expense tracking application where users can log their daily spending across categories like Food, Transport, Bills, Entertainment, and Other. It includes a summary panel showing monthly totals, a pie chart for visual spending breakdown, category and date-range filters, CSV export, and data persistence via a JSON file. No authentication is required — it assumes a single user.

---

## ✨ Features

### ✅ Must Have (All Implemented)
- ➕ Add expenses with amount, category, date, and optional note
- 📋 View all expenses sorted by date (newest first)
- ✏️ Edit any existing expense
- 🗑️ Delete expenses with a confirmation prompt
- 🔍 Filter by category (Food, Transport, Bills, Entertainment, Other)
- 📅 Filter by date range (All Time, This Month, Last Month, By Month, Custom Range)
- 📊 Summary panel showing total spent this month, total per category, and highest single expense

### ✅ Should Have (All Implemented)
- 🥧 Pie chart showing expenses by category (using Recharts)
- 💵 Indian currency formatting (₹1,234.50)
- ⚠️ Form validation — no negative amounts, no future dates, category required

### 🎁 Bonus Features
- 📥 Export filtered expenses as CSV download
- 💾 Data persistence to a JSON file (survives server restarts)
- 📱 Responsive design (works on mobile)
- 🌟 Empty state UI with friendly messages

---

## 🛠️ Tech Stack

| Layer | Technology | Why I chose it |
|-------|-----------|----------------|
| Frontend | React + Vite | Fast setup, modern React with hooks |
| Backend | Node.js + Express | Simple, lightweight REST API |
| Storage | JSON file | Easy persistence without a database |
| Charts | Recharts | Simple and clean React chart library |
| HTTP Client | Axios | Cleaner API calls than fetch |
| ID Generation | UUID | Unique IDs for each expense |
| Styling | Plain CSS | Full control, no extra dependencies |
| Deployment (FE) | Vercel | Free, fast, perfect for React apps |
| Deployment (BE) | Render | Free Node.js hosting with easy GitHub integration |

---

## 🚀 How to Run Locally

> Assumes you have **Node.js** installed. That's it!

### 1. Clone the repository

```bash
git clone https://github.com/RiyaRawat20/mini-expense-tracker.git
cd mini-expense-tracker
```

### 2. Set up and run the Backend

```bash
cd server
npm install
node index.js
```

Server will start at `http://localhost:5000`

### 3. Set up and run the Frontend

Open a **new terminal window**, then:

```bash
cd client
npm install
npm run dev
```

Frontend will start at `http://localhost:5173`

### 4. Open the app

Go to `http://localhost:5173` in your browser. That's it! 🎉

> No environment variables needed for local development — it defaults to `localhost:5000` automatically.

---

## 📡 API Documentation

**Base URL (local):** `http://localhost:5000/api`  
**Base URL (production):** `https://mini-expense-tracker-q8y6.onrender.com/api`

---

### GET `/api/expenses`
Fetch all expenses.

**Response:**
```json
[
  {
    "id": "uuid-here",
    "amount": 500,
    "category": "Food",
    "date": "2026-06-05",
    "note": "Lunch with friends"
  }
]
```

---

### POST `/api/expenses`
Add a new expense.

**Request Body:**
```json
{
  "amount": 500,
  "category": "Food",
  "date": "2026-06-05",
  "note": "Lunch with friends"
}
```

**Response:** `201 Created`
```json
{
  "id": "generated-uuid",
  "amount": 500,
  "category": "Food",
  "date": "2026-06-05",
  "note": "Lunch with friends"
}
```

**Validation errors:** `400 Bad Request` if amount, category, or date is missing.

---

### PUT `/api/expenses/:id`
Update an existing expense by ID.

**Request Body:** (any fields to update)
```json
{
  "amount": 750,
  "note": "Updated note"
}
```

**Response:** `200 OK` — returns updated expense object.  
**Error:** `404 Not Found` if ID doesn't exist.

---

### DELETE `/api/expenses/:id`
Delete an expense by ID.

**Response:**
```json
{
  "message": "Deleted successfully"
}
```

---

## 📁 Project Structure

```
mini-expense-tracker/
│
├── client/                        # React frontend (Vite)
│   ├── public/                    # Static assets
│   └── src/
│       ├── components/
│       │   ├── ExpenseForm.jsx    # Add/Edit expense form with validation
│       │   ├── ExpenseList.jsx    # Table of all expenses with edit/delete
│       │   ├── ExpenseChart.jsx   # Pie chart by category (Recharts)
│       │   ├── SummaryPanel.jsx   # Monthly summary cards
│       │   └── FilterBar.jsx      # Category + date range filters
│       ├── services/
│       │   └── api.js             # Axios API calls to backend
│       ├── App.jsx                # Main app — state, filtering, layout
│       ├── main.jsx               # React entry point
│       └── index.css              # All styling
│
├── server/                        # Node.js + Express backend
│   ├── index.js                   # Server entry point, middleware setup
│   ├── routes.js                  # All API route handlers (CRUD)
│   ├── expenses.js                # JSON file read/write helper functions
│   ├── expenses.json              # Data storage file (auto-created)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 How Frontend and Backend Connect

```
User (Browser)
      ↓
React Frontend — localhost:5173 (Vercel in production)
      ↓  HTTP requests via Axios
Express Backend — localhost:5000 (Render in production)
      ↓  fs.readFile / fs.writeFile
expenses.json — persistent data storage
```

The frontend never touches the data directly — all reads and writes go through the REST API. This keeps a clean separation between UI logic and data logic.

---

## 🧠 What I Learned Building This

- How to structure a monorepo with separate `/client` and `/server` folders
- How to build a REST API with Express and connect it to a React frontend
- How to handle CORS between frontend and backend
- How to persist data to a JSON file without a database
- How to deploy a full-stack app with separate frontend (Vercel) and backend (Render) hosting
- How to use environment variables to switch between local and production URLs

---

## 🚧 Next Steps

Given more time, here is what I would build next:

- **User Authentication** — login/signup so multiple users can have separate expense data
- **Database** — replace the JSON file with PostgreSQL or MongoDB for better scalability
- **Budget Limits** — set a monthly budget per category with a warning when exceeded
- **Monthly Calendar View** — visualize expenses on a calendar
- **Bar Chart** — add a bar chart alongside the pie chart for better comparison
- **Search** — search expenses by note or category keyword
- **Dark Mode** — toggle between light and dark themes
- **Better Error Handling** — more detailed error messages and retry logic

---

## 🤖 AI Tools Disclosure

I used Claude (Anthropic) as an assistant during development — primarily for guidance on project structure, debugging errors, and code suggestions. I understand every line of code in this project and can walk through it in detail during the technical interview.

---

## 👩‍💻 Built by

**Riya Rawat**  
B.Tech CSE Student  
GitHub: [@RiyaRawat20](https://github.com/RiyaRawat20)

---

*Made with ❤️ and a lot of ☕*
