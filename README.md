# 🧠 ChatGPT Clone – Vue Frontend

This is the **frontend** of a full-featured ChatGPT clone built using **Vue 3**. It replicates and expands on OpenAI's ChatGPT functionality by adding custom features like image generation, profile systems, and chat sharing. It communicates with separate backend services via API (NestJS and Python-based).

> ⚠️ This is the **frontend only**. Backend is maintained in separate repositories and exposed via secure APIs.

---

## 🌐 Live Demo

You can try the frontend here (for demo/testing purposes only):

🔗 [chat-gpt-clone-frontend.vercel.app](https://image-generator-woad-five.vercel.app/)

> Note: This is a **demo** version of the frontend. Backend APIs are hosted separately and may have limited availability or rate limits.


🔗 Project Repository: [chat-gpt-clone-frontend](https://github.com/deniSSTK/chat-gpt-clone-frontend)


## ✨ Features

### 💬 AI Chat
- Streamed AI responses via DeepSeek/GPT API.
- Typing simulation with smooth UI rendering.
- Message separation for better UX.

### 🧠 AI Personality Presets
- Change the assistant’s tone and behavior via predefined styles (e.g., friendly, strict, villain, etc.).
- Applied instantly per session.

### 🖼️ Image Generation
- Generate AI images directly from prompts.
- Saved images are stored automatically in a **user gallery**.

### 📁 Persistent Chat History
- All chats and messages are saved per account.
- Continue any conversation from where it left off.

### 🔗 Shareable Chats
- Public sharing via unique links: anyone can view without logging in.
- Example: `https://yourdomain.com/c/:chatId-timestamp`

### 🧾 Export to PDF
- Download any chat session as a beautifully formatted **PDF**.

### 👤 User Profiles
- Login system with profile management.
- Public and private images.
- Avatar customization and visible profile page.

### ⚙️ Settings & Controls
- Change assistant behavior (style).
- Logout.
- Delete all chats in one click.
- View application version and changelog info.

---

## 🧱 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **State Management:** Pinia
- **Routing:** Vue Router
- **UI & Styling:** Tailwind CSS
- **Animation & UX:** Smooth typing animations, transition effects
- **PDF Generation:** jsPDF
- **HTTP Client:** Fetch + centralized error handling

---

## 🔌 API Integration

The app communicates with multiple backend APIs:
- Chat API (text generation)
- Image generation API
- Auth/session management
- Chat & image history storage

> 💡 All APIs are handled via a secure backend (NestJS + Python) **not included in this repository**.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/deniSSTK/chat-gpt-clone-frontend.git
cd chat-gpt-clone-frontend
```
2. Install dependencies
```bash
npm install
```
3. Create .env file
```bash
VITE_API_BASE_URL=https://your-backend-api.com
```
4. Start development server
```bash
npm run dev
```
App will be available at http://localhost:5173.

## 📁 Project Structure

```bash
src/
├── components/            # UI components (chat, images, settings, etc.)
├── config/                # Configuration files (e.g. presets, constants)
├── css/                   # Global and utility styles
├── fonts/                 # Custom fonts (used in PDF export or UI)
├── router/                # Vue Router setup
├── services/              # API interaction logic
├── use/                   # Composables and stores (like Pinia or custom logic)
├── views/                 # Route views (ChatPage, GalleryPage, ProfilePage, etc.)
├── style.css              # Tailwind or custom global styles
├── main.ts                # App entry point
├── vite-env.d.ts          # Vite-specific TypeScript declarations
└── App.vue                # Root Vue component
```

## 📜 License
This project is distributed under the MIT License. Feel free to explore and build on it.

## 🙌 Author
Made with ♥ by [DeniSSTK](https://github.com/deniSSTK)