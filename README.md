---

## 📂 Project Structure

```bash
mediquery-frontend/
│
├── src/
│   ├── components/        # Reusable UI components
│   │   └── upload/
│   │       └── UploadBox.jsx
│   ├── features/
│   │   └── chat/
│   │       └── chatSlice.js
│   ├── services/
│   │   └── api.js         # RTK Query API service
│   ├── pages/             # Route-level pages
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/ravinder-raj/mediquery-frontend.git
cd mediquery-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```

Add your backend URL to `.env`:
```env
VITE_API_URL=https://mediquery-z0wd.onrender.com
```

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment

Frontend is deployed on **Netlify**.
Backend is deployed on **Render**.

> ⚠️ The backend runs on Render's free tier — it may take **20-30 seconds** to wake up on first request.

---

## 🔗 Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 👨‍💻 Author

Built as part of a 30-day AI Engineering learning journey.
Demonstrates full-stack RAG architecture with a production-grade frontend.