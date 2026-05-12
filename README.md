# NeevAI 🎓

> AI-powered exam notes & revision platform — generate structured, exam-oriented notes on any topic in seconds.

🔗 **Live Demo:** [neevai-five.vercel.app](https://neevai-five.vercel.app)

---

## ✨ Features

- 📝 **AI Note Generation** — Generate structured exam notes on any topic using Google Gemini
- 📊 **Visual Diagrams & Charts** — Auto-generated Mermaid diagrams and Recharts for better understanding
- 📄 **PDF Export** — Download your notes as a formatted PDF
- 💳 **Credit System** — Buy credits via Stripe to generate notes
- 🔐 **Google Authentication** — Secure login with Firebase
- 📚 **Notes History** — Access all your previously generated notes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4, Redux Toolkit |
| Backend | Node.js, Express v5 |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API |
| Payments | Stripe |
| Auth | Firebase (Google OAuth) |
| Deployment | Vercel (client), Render (server) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB
- Google Gemini API key
- Stripe account
- Firebase project

### Clone the repo
```bash
git clone https://github.com/palakagrawal006/ExamNotesAI.git
cd ExamNotesAI
```

### Setup Server
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=8000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### Setup Client
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_APIKEY=
VITE_FIREBASE_AUTHDOMAIN=
VITE_FIREBASE_PROJECTID=
VITE_FIREBASE_STORAGEBUCKET=
VITE_FIREBASE_MESSAGINGSENDERID=
VITE_FIREBASE_APPID=
```

```bash
npm run dev
```

---

## 📁 Project Structure

```
ExamNotesAI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Route pages
│   │   ├── redux/          # State management
│   │   └── services/       # API calls
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── utils/              # Helpers
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/google` | Google login |
| GET | `/api/user/currentUser` | Get logged in user |
| POST | `/api/notes/generate-notes` | Generate AI notes |
| GET | `/api/notes/history` | Get notes history |
| POST | `/api/pdf/generate-pdf` | Download notes as PDF |
| POST | `/api/credit/create-order` | Create Stripe payment |
| POST | `/api/credits/webhook` | Stripe webhook |

---

## 👤 Author

**PalaK Agrawal**  
[GitHub](https://github.com/palakagrawal006)
