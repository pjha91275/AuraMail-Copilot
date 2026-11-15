<div align="center">

  <img src="client/public/logo.svg" alt="AuraMail AI Logo" width="380" />

  <p align="center">
    <strong>An Intelligent Email Management & Autonomous Triage Dashboard for Personal Assistants & Executives</strong>
  </p>

  <p align="center">
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google_Gemini_LLM-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini LLM" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Evaluation-Humanity%20Founders-orange?style=flat-square" alt="Humanity Founders" />
    <img src="https://img.shields.io/badge/Role-AI%20Full--Stack%20Intern-blue?style=flat-square" alt="Role" />
    <img src="https://img.shields.io/badge/Author-Prince%20Jha-purple?style=flat-square" alt="Author" />
    <img src="https://img.shields.io/badge/Status-10%2F10%20Production%20Ready-emerald?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="License" />
  </p>

  <p align="center">
    <a href="https://auramail-ai.vercel.app">
      <img src="https://img.shields.io/badge/🚀%20Live%20Prototype-auramail--ai.vercel.app-blueviolet?style=for-the-badge&logo=vercel" alt="Live Deployed Link" />
    </a>
    &nbsp;
    <a href="https://www.loom.com/share/your-loom-demo-id">
      <img src="https://img.shields.io/badge/🎥%20Demo%20Video-Watch%20Walkthrough-ff4b4b?style=for-the-badge&logo=loom" alt="Loom Demo Video" />
    </a>
  </p>

  <div align="center">
    <table>
      <tr>
        <td align="center">🌐 <strong>Live Deployed Link:</strong> <a href="https://auramail-ai.vercel.app">https://auramail-ai.vercel.app</a></td>
        <td align="center">🎬 <strong>Demo Walkthrough Video:</strong> <a href="https://www.loom.com/share/your-loom-demo-id">https://www.loom.com/share/your-loom-demo-id</a></td>
      </tr>
    </table>
  </div>

</div>

---

### 📌 Project Context & Assignment Submission
> **AuraMail AI** was engineered and designed by **Prince Jha** specifically as the candidate prototype submission for the **AI Full-Stack Engineer Intern** evaluation at **Humanity Founders** (*Task: Personal Assistant – AI-Powered Email Management Dashboard*).
> 
> The objective of this assignment is to solve one of the most persistent bottlenecks in executive assistance: **automatically determining email reply responsibility**, providing assistants with full triage authority, and offering clients an ultra-minimalist, distraction-free VIP experience.

---

## 🎯 Executive Summary & Core Product Vision

Personal assistants often manage a heavy inflow of correspondence across multiple high-profile clients (CEOs, venture partners, scientists). 

In traditional email clients, a recurring friction occurs when a client reads an email on mobile but provides no signal on whether they intend to handle it personally or expect their assistant to draft the response. 

**AuraMail AI** eliminates this friction through a dual-experience architecture:
1. **Assistant Command Center**: A comprehensive workspace featuring multi-client switching, automatic AI classification, confidence scores, reasoning explanations, 1-click classification manual overrides, extracted action items, calendar meeting detection, and an AI Reply Studio.
2. **Minimalist Client Portal ("Executive Glance")**: A dedicated VIP interface showing **only** emails requiring the client's personal attention, with 1-click "Approve / Handled" (with confetti feedback) and "Delegate to Assistant" with custom note forwarding.

---

## ✨ Feature Breakdown

### 1. 🤖 Automatic AI Reply Responsibility Classification
Every conversation is continuously evaluated by the AI engine and classified into one of three core responsibilities:
- ⚡ **Assistant to Reply**: Routine scheduling, calendar reschedules, travel/hotel bookings, compliance/DPA document dispatch, vendor coordination.
- 👤 **Client to Reply**: Board resolutions, Series B term sheet sign-offs, wire authorizations, VIP keynote invitations, sensitive partnership negotiations.
- 💤 **No Reply Needed**: Automated Stripe receipts, cloud infrastructure billing, GitHub security alerts, Substack newsletters, resolved threads.

*Each classification provides confidence scores (e.g., `98%`), urgency indicators (`Urgent`, `High`, `Med`), and an explicit reason explaining **why** the email was assigned.*

### 2. 🎛️ Assistant 1-Click Manual Override
AI assists, but human assistants maintain full authority. With a single click on any classification badge, the assistant can override the status between `Assistant to Reply`, `Client to Reply`, and `No Reply Needed`. Changes sync instantly across the entire platform.

### 3. 👤 Minimalist Client VIP Portal
Clients are spared the noise of a 500-email inbox:
- Greets the client (e.g., *"Welcome back, Sarah"*).
- Shows **only** emails classified as `Client to Reply`.
- High-visibility **"Why your input is needed"** callout box.
- **1-Click "Mark Handled"**: Solves the problem where clients read an email but forget to confirm.
- **"Delegate to Assistant"**: The client types a quick note (e.g., *"Tell them Friday works and ask for the deck"*) which immediately hands it back to the assistant.
- Collapsible original thread view if they want to inspect full details.

### 4. ✍️ AI Reply Studio
- 4 Tone Selectors: `Professional`, `Executive Brief`, `Scheduling Confirmation`, `Polite Decline`.
- Custom Assistant Prompt input for specific instructions.
- Real-time AI draft generation and editable reply textarea.
- One-click `Send Reply Now` (which optimistically appends the response into the conversation thread) or `Save as Draft`.

### 5. 💬 Interactive Inbox AI Copilot
A slide-over drawer enabling natural language inbox queries:
- *"Show me emails that need my attention"*
- *"Which emails require the client's attention?"*
- *"What am I waiting for a response on?"*
- *"Why was this email assigned to the client?"*
- *"Summarize top conversations"*
- Returns rich natural language responses with clickable conversation pills that open the exact thread directly!

### 6. 📅 Intelligent Meeting & Action Item Extraction
- Automatically parses dates, times, and locations (e.g., *"Friday 10:00 AM - 11:30 AM EST via Zoom"*, *"Buck's of Woodside on Thursday 8:00 AM"*).
- Generates interactive action item checklists that assistants can check off.

### 7. 🔔 Notification Center, Profile & Keyboard Shortcuts
- **Live Notification Center**: Bell icon in navbar with an unread counter showing live updates (client approvals, reschedules, auto-triage alerts).
- **Assistant Profile Menu**: Shows active auto-triage status, client count (3), and AI accuracy rating (96.8%).
- **Superhuman-Style Keyboard Navigation**: Press `?` anytime to view the shortcuts cheat sheet (`j`/`k` for navigation, `s` to star, `e` to archive, `c` for copilot, `1` for assistant view, `2` for client view, `Esc` to close).

### 8. ⚡ Live Inflow Simulator
Top navbar button allowing the user or reviewer to click **"Simulate Inflow"** to see new emails arrive live (`Meeting Request`, `Acquisition Term Sheet`, or `Automated Security Notice`) and watch the AI classify them in real-time!

---

## 🛠️ Technology Stack & AI Architecture

- **AI Engine & LLM**:
  - **Google Gemini LLM** (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, `gemini-flash-latest` via Google AI Studio API)
  - Autonomous responsibility classification (`Assistant to Reply`, `Client to Reply`, `No Reply Needed`)
  - Executive TL;DR summarization, tone-tailored draft replies, and interactive Inbox Copilot
  - Built-in Zero-Latency NLP heuristic engine (providing automatic offline fallback for 100% uptime)
- **Frontend**:
  - React 18+ (Vite)
  - Tailwind CSS (ambient deep navy glassmorphism, responsive drawers & floating island navbar)
  - Lucide React (modern icons)
  - Canvas Confetti (delightful micro-interactions)
- **Backend (Node / Express / MongoDB)**:
  - Node.js & Express.js
  - RESTful architecture with modular controllers, services, and routes
  - Mongoose & MongoDB Atlas support (with automated in-memory JSON sync fallback if Atlas IP whitelist is not configured)
- **Deployment**:
  - 1-Click Serverless setup for **Vercel** (`vercel.json` + `api/index.js`) and **Render** (`render.yaml`).

---

## ⚙️ Environment Variables & Live Integrations

AuraMail AI is engineered with **Dual-Mode Fault-Tolerant Architecture**: it connects to live production services (MongoDB Atlas & Google Gemini API) when keys are provided, while gracefully maintaining a zero-latency fallback mode if credentials or networks are restricted.

Create a `.env` file in the root directory (or `server/.env`):

```env
# Server Port & Mode
PORT=5000
NODE_ENV=development

# 1. MongoDB Atlas Connection URI
# Example: mongodb+srv://<username>:<password>@cluster0.kof6tuh.mongodb.net/auramail?retryWrites=true&w=majority
MONGODB_URI=your_mongodb_connection_string

# 2. Google Gemini LLM API Key (from Google AI Studio: https://aistudio.google.com/app/apikey)
# Enables live autonomous email classification, executive summaries, AI draft replies, and Inbox Copilot
AI_API_KEY=your_gemini_api_key
```

### 💡 Why Both Features Run Reliably:
1. **Google Gemini LLM Integration**:
   - When `AI_API_KEY` (or `GEMINI_API_KEY`) is provided, AuraMail AI directly invokes Google Gemini's latest flash models (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, `gemini-flash-latest`) via REST endpoints with structured JSON schemas.
   - If the API key is not present, hits temporary rate-limits (429/503), or network latency occurs, AuraMail seamlessly falls back to its built-in heuristic NLP engine, ensuring the assistant experience is never interrupted.
2. **MongoDB Atlas Database**:
   - When `MONGODB_URI` is provided, AuraMail connects to your live MongoDB Atlas cluster and seeds the initial email threads, client profiles, and connected accounts.
   - **Important Atlas Tip**: In MongoDB Atlas, ensure your current IP address (or `0.0.0.0/0` - Allow Access From Anywhere) is added under **Security > Network Access**. If Atlas rejects the connection due to an unwhitelisted IP, AuraMail automatically catches the exception and falls back to its in-memory store so the app continues running smoothly.
3. **Smart Path Resolution**:
   - The backend automatically resolves `.env` from both the project root directory and `server/.env`, so running either `npm start` from root or `cd server && npm start` will effortlessly load your configuration.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Method 1: The 1-Command Unified Run (Easiest)
Since the frontend is pre-built, the Express server serves both the frontend UI and backend API together:
```bash
npm start
```
Open your browser to: **`http://localhost:5000`**

---

### Method 2: Development Mode (Hot-Reloading)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pjha91275/AuraMail-AI.git
   cd AuraMail-AI
   ```

2. **Start Backend (Terminal 1)**:
   ```bash
   cd server
   npm run dev
   ```
   *(API runs on `http://localhost:5000`)*

3. **Start Frontend (Terminal 2)**:
   ```bash
   cd client
   npm run dev
   ```
   *(Frontend runs on `http://localhost:3000`)*


---

## 👨‍💻 Author & Developer

**Prince Jha**
- **GitHub**: [@pjha91275](https://github.com/pjha91275)
- **Project**: **AuraMail AI** — Personal Assistant Email Management Dashboard
- **Submission for**: **Humanity Founders** AI Full-Stack Engineer Internship Selection
- **License**: MIT
