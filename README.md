# AuraMail AI — Intelligent Email Management Dashboard for Personal Assistants & Clients

> **AI Full-Stack Engineer Intern Assignment** for **Humanity Founders**  
> *Developed with React, Node.js, Express, Tailwind CSS, and MongoDB.*

[![Deployment Status](https://img.shields.io/badge/status-production--ready-emerald.svg)](#)
[![Stack](https://img.shields.io/badge/stack-MERN-blue.svg)](#)
[![AI Integration](https://img.shields.io/badge/AI-NLP%20Triage%20%26%20Classification-purple.svg)](#)

---

## 🎯 Executive Summary & Product Vision

Personal assistants often manage multiple responsibilities and a large volume of emails on behalf of high-profile executives, founders, and partners. 

A primary friction point in daily operations is **determining reply responsibility**:
- Does the assistant handle it (scheduling, standard follow-ups, logistics, document dispatch)?
- Does the client need to review and sign off personally (fiduciary authorizations, board votes, sensitive term sheets, VIP personal invitations)?
- Is it purely informational with zero response needed (invoices, automated security notices, newsletters)?

**AuraMail AI** solves this with an intelligent dual-view experience:
1. **Assistant Command Center**: A comprehensive workspace with multi-client switching, automatic AI classification, reasoning explanations, 1-click classification manual overrides, action item extraction, meeting detection, and an AI Reply Studio.
2. **Minimalist Client Portal ("Executive Glance")**: A clean, distraction-free VIP interface showing **only** the emails requiring the client's personal attention, with 1-click "Approve / Handled" and "Delegate to Assistant" actions with custom instructions.

---

## ✨ Core Features & Capabilities

### 1. 🤖 Automatic AI Classification & Reply Responsibility
Every incoming conversation thread is analyzed by our NLP & AI engine and assigned one of three core statuses:
- ⚡ **Assistant to Reply**: Routine scheduling, calendar reschedules, travel/hotel bookings, compliance/DPA document dispatch, customer inquiry follow-ups.
- 👤 **Client to Reply**: Board resolutions, Series B term sheet sign-offs, wire authorizations, VIP keynote speaking invitations, sensitive partnership offers.
- 💤 **No Reply Needed**: Automated Stripe receipts, cloud infrastructure billing, GitHub alerts, newsletters, resolved threads.

*Each classification provides confidence scores (e.g., 98%), highlighted urgency tags (`Urgent`, `High`, `Med`), and a clear explanation of **why** the email was assigned.*

### 2. 🎛️ Assistant Manual Override
AI assists, but human assistants maintain full authority. With a single click on any classification badge, the assistant can override the status between `Assistant to Reply`, `Client to Reply`, and `No Reply Needed`. Changes sync instantly across the entire platform.

### 3. 👤 Minimalist Client VIP Portal
Clients are spared the noise of a 500-email inbox. The client portal features:
- Greeting and concise count of items requiring their personal decision.
- High-visibility **"Why your input is needed"** callout box.
- Executive summary & extracted bullet points.
- **One-Click "Mark Handled"**: Solves the problem where clients read an email but forget to confirm.
- **"Delegate to Assistant"**: Client types a quick note (e.g., *"Tell them Friday works and ask for the deck"*) which immediately hands it back to the assistant.
- Collapsible original thread view if they want to inspect full details.

### 4. ✍️ AI Reply Studio
- Tone Selector: `Professional`, `Executive Brief`, `Scheduling Confirmation`, `Polite Decline`.
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

### 7. 🔗 Onboarding & Email Account Connection
- Step-by-step onboarding modal introducing the product.
- Simulated OAuth2 authorization flow for Google Workspace (Gmail) and Microsoft 365 (Outlook).
- Connected accounts manager with real-time sync timestamps, total email counters, and a manual "Sync Now" button.
- **Live Inflow Simulator**: "Simulate Inflow" dropdown in the top navbar to inject new incoming emails live and observe real-time AI classification and badge updates!

---

## 🛠️ Technology Stack (MERN)

- **Frontend**:
  - React 18+
  - Tailwind CSS (with custom color palette, smooth transitions, custom scrollbars)
  - Lucide React (modern icon suite)
  - Canvas Confetti (delightful micro-interactions upon task completion)
  - Vite (lightning-fast bundling)
- **Backend**:
  - Node.js & Express.js
  - RESTful architecture with modular controllers, services, and routes
  - Mongoose & MongoDB (full MERN compliance with automatic graceful fallback to high-performance in-memory datastore so it runs out-of-the-box anywhere)
- **AI & NLP Pipeline**:
  - Modular AI service supporting LLM APIs (OpenAI / Gemini / Groq) via `.env` with a built-in semantic inference classifier for instant zero-latency responses.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Quick Start (Run Both Server & Client)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pjha91275/Personal-Assistant.git
   cd Personal-Assistant
   ```

2. **Install dependencies**:
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   cd ..
   ```

3. **Start the development servers**:
   - In terminal 1 (Backend API):
     ```bash
     cd server
     npm run dev
     ```
     *Server runs on `http://localhost:5000`*

   - In terminal 2 (Frontend React):
     ```bash
     cd client
     npm run dev
     ```
     *Frontend runs on `http://localhost:3000`*

4. **Production Build**:
   ```bash
   npm run build:client
   npm start
   ```

---

## 🎬 Recommended Demo Walkthrough Video Script

When recording your 3–5 minute walkthrough video for Humanity Founders:
1. **Introduction (30s)**: Introduce yourself and explain the problem: personal assistants handling client communication often lose track of who needs to reply, and clients get overwhelmed by email clutter.
2. **Assistant Dashboard Overview (1m)**:
   - Walk through the metrics strip (Total Inflow, Assistant to Reply, Client to Reply, No Reply Needed, Waiting on Other).
   - Demonstrate client workspace switching (Sarah Jenkins vs. David Chen vs. All Clients).
   - Demonstrate segment navigation and filter chips (Urgent, High).
3. **AI Classification & Triage (1m)**:
   - Select the *"Series B Term Sheet"* email: show why AI assigned it to `Client to Reply` with confidence rating.
   - Select the *"Reschedule Board Strategy Session"* email: show `Assistant to Reply`, meeting extraction details, and action item checklist.
   - Show how the assistant can **manually override** any classification in 1 click.
4. **Client VIP Portal (1m)**:
   - Switch to **Client Portal** using the toggle in the top bar.
   - Show the clean executive view with only emails requiring the client's decision.
   - Demonstrate the client clicking **"Mark Handled"** (confetti plays!) or **"Delegate to Assistant"** with a quick instruction.
   - Switch back to Assistant View to show immediate synchronization.
5. **AI Reply Studio & Copilot Chat (1m)**:
   - Show the AI Reply Studio: toggle tone to *Scheduling Confirmation*, type custom instruction, and generate reply.
   - Click **Send Reply Now**: show how the reply is appended to the message thread.
   - Open **Ask Copilot**: ask *"Show me emails that need my attention"* and click on the generated conversation pill to jump directly to the email.
6. **Live Inflow Simulation (30s)**:
   - Click **Simulate Inflow** in the navbar -> select *"Acquisition Offer ($85M)"* -> show the live arrival and real-time AI classification.

---

## 📄 License
MIT © 2026 Humanity Founders AI Full-Stack Intern Candidate
