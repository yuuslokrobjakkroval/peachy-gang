# 🍑 Peachy Dashboard (Frontend)

> A sleek and powerful frontend for managing your **Peachy Discord Bot**. Built with **Next.js**, **TypeScript**, and **shadcn/ui** for a modern UI experience.

![Peachy Banner](https://i.imgur.com/fFqwcK2.gif)

## 🌐 Live Demo

- 🪙 [Dashboard](https://peachy-gang-dashboard.vercel.app)
- 🔗 [Frontend Repo](https://github.com/yuuslokrobjakkroval/peachy-gang)
- 🔗 [Backend Repo](https://github.com/yuuslokrobjakkroval/peachy-dashboard-backend)
- 🤖 [Invite Peachy Bot](https://discord.com/api/oauth2/authorize?client_id=1271693788548436008&permissions=8&integration_type=0&scope=bot+applications.commands)

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- [@next-auth](https://next-auth.js.org/)

---

## 📦 Environment Variables

Create a `.env.local` file based on the following:

```env
# Discord Bot OAuth2 Credentials
BOT_CLIENT_ID="<YOUR_BOT_CLIENT_ID>"
BOT_CLIENT_SECRET="<YOUR_BOT_CLIENT_SECRET>"

# Frontend URL (used for redirects)
APP_URL="http://localhost:3000"

# API Endpoint of your Backend (NestJS)
NEXT_PUBLIC_API_ENDPOINT="/api/v1"
BACKEND_API_BASE="http://localhost:8080" # or your https://api.example.com
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yuuslokrobjakkroval/peachy-gang.git
cd peachy-gang
```

### 2. Install dependencies

```bash
pnpm install
```

> ℹ️ This project uses `pnpm`. Install it globally via `npm install -g pnpm`.

### 3. Setup your environment

Rename `.env.example` to `.env.local` and fill in the values.

### 4. Start the development server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Features

- 🔐 Discord OAuth2 login
- 📊 Dynamic guild dashboard
- 🎛️ Per-server feature toggling
- 🎨 Responsive UI with shadcn components
- 🧠 API-driven logic (auto-responses, config, logs, etc.)
- ☁️ Fully ready for Vercel deployment

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your fork: `git push origin my-feature`
5. Submit a Pull Request

---

## 💬 Support

Need help? Join our [Discord Server](https://discord.gg/BJT4h55hbg)

---

## ✨ Credits

Made with 💖 by [𝐊𝐘𝐔𝐔 🐣💞](https://discord.gg/CmsxPWNEjf)
