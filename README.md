# Innovalte AI

Innovalte AI is a modern AI-powered web app built with a **Vite + React + TypeScript** stack, styled with **Tailwind CSS** and **shadcn/ui**, and backed by **Supabase** for auth, database, and edge functions.  
Deployed on **Vercel** for fast, global delivery.

> A sleek, production-ready foundation for shipping AI products and experiments quickly.

---

## 🚀 Live Demo

<!-- Replace this with your actual deployed URL -->
**Live site:** https://idea-engine-pro.vercel.app/

---

## ✨ Features

- ⚡ **Blazing-fast frontend** with Vite + React + TypeScript  
- 🎨 **Modern UI** using Tailwind CSS + shadcn/ui components  
- 🔐 **Authentication & user management** via Supabase  
- 🧠 **AI-ready architecture** – easy to plug in OpenAI / other LLM APIs  
- 🌩 **Supabase Edge Functions** for serverless backend logic  
- ☁️ **One-click deployment** on Vercel, optimized for static + serverless  
- 🧱 Clean, modular folder structure for easy scaling and collaboration  

---

## 🧱 Tech Stack

- **Frontend:** Vite, React, TypeScript
- **UI:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase (Database, Auth, Edge Functions)
- **Deployment:** Vercel
- **Package Manager:** Bun or npm / pnpm / yarn (choose one and stick to it)

---

## 📂 Project Structure

```bash
.
├─ public/              # Static assets
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/ or routes/ # App routes/views
│  ├─ lib/
│  │  └─ supabaseClient.ts  # Supabase client config
│  ├─ hooks/            # Custom React hooks
│  ├─ styles/           # Global styles (if any)
│  └─ main.tsx          # App entry
├─ supabase/
│  ├─ functions/        # Supabase Edge Functions
│  └─ migrations/       # SQL migrations (if used)
├─ .env                 # Local environment variables (not committed)
├─ index.html
├─ package.json
└─ README.md
