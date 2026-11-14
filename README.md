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

## 🛠️ Technology Stack (MERN)

- **Frontend**:
  - React 18+ (Vite)
  - Tailwind CSS (custom modern palette, subtle glassmorphism, responsive mobile drawers)
  - Lucide React (modern icons)
  - Canvas Confetti (delightful micro-interactions)
- **Backend**:
  - Node.js & Express.js
  - RESTful architecture with modular controllers, services, and routes
  - Mongoose & MongoDB (full MERN compliance with automatic graceful fallback to in-memory datastore so it runs out-of-the-box anywhere)
- **Deployment**:
  - 1-Click Serverless setup for **Vercel** (`vercel.json` + `api/index.js`) and **Render** (`render.yaml`).

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

## 🌐 1-Click Deployment on Vercel

AuraMail AI is pre-configured with a root serverless function adapter (`api/index.js`) and `vercel.json`:
1. Push your code to GitHub.
2. Sign in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository: **`AuraMail-AI`**.
4. Click **Deploy**. Vercel will build the React frontend and deploy the Express API to a live URL in under 2 minutes.

---

## 🎬 Demo Video Walkthrough Script

Use this structured script when recording your Loom walkthrough video:

1. **Introduction (0:00 - 0:35)**:
   > *"Hi everyone! I’m Prince Jha, presenting AuraMail AI, built for the Humanity Founders AI Full-Stack Intern evaluation. The core problem this solves is determining reply responsibility—helping assistants triage heavy email volume while giving clients a distraction-free view of only what needs their personal attention."*
2. **Assistant Dashboard & The Numbers (0:35 - 1:15)**:
   > *"Here in the Assistant Command Center, I can switch between multiple clients like Sarah Jenkins, David Chen, or an aggregated view. The metrics strip gives an instant pulse: how many emails need assistant replies, client decisions, or upcoming meetings."*
3. **AI Classification & Manual Override (1:15 - 2:05)**:
   > *"The Series B Term Sheet is automatically marked 'Client to Reply' (98% confidence) because it requires CEO wire authorization. The Board Meeting reschedule is classified as 'Assistant to Reply' with meeting details extracted. Assistants always maintain final control—I can click the badge to manually reclassify in 1 click."*
4. **Client VIP Portal & Delegation (2:05 - 2:55)**:
   > *"Switching to the Client Portal, Sarah only sees the emails needing her decision, with a clear 'Why your input is needed' banner. She can click 'Mark Handled' to resolve it immediately with celebration confetti, or 'Delegate to Assistant' with a quick note."*
5. **AI Reply Studio & Copilot Chat (2:55 - 3:35)**:
   > *"The AI Reply Studio lets me select a tone like 'Scheduling Confirmation', add notes, and generate a draft. The Inbox AI Copilot allows assistants to ask natural language questions like 'Show emails needing attention' and jump directly to the thread."*
6. **Creative Polish & Inflow Simulator (3:35 - 4:15)**:
   > *"We also built an interactive Notification Center, an Assistant Profile menu, and Superhuman keyboard shortcuts (press '?'). Finally, the Live Inflow Simulator tests real-time AI ingestion on the fly."*

---

## 👨‍💻 Author & Developer

**Prince Jha**
- **GitHub**: [@pjha91275](https://github.com/pjha91275)
- **Project**: **AuraMail AI** — Personal Assistant Email Management Dashboard
- **Submission for**: **Humanity Founders** AI Full-Stack Engineer Internship Selection
- **License**: MIT
