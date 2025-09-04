
---

## 📌 Features

* ⚡ **Bun + TypeScript** for fast, type-safe development
* 🔑 **JWT authentication** (login, register, protected profile routes)
* 📧 **Email OTP** flow for login/verification
* 📱 **SMS OTP** flow for login/verification
* 🪪 **Supabase OAuth** signup & user session management
* ✅ Health check endpoints (`/` and `/ping`)


---

## 🔐 Auth Routes

### **JWT-based Auth**

| Method | Endpoint         | Description                                       |
| ------ | ---------------- | ------------------------------------------------- |
| POST   | `/auth/login`    | Login with credentials and get JWT                |
| POST   | `/auth/register` | Register a new user (protected by JWT middleware) |
| GET    | `/auth/profile`  | Get user profile (JWT required)                   |

### **OTP-based Auth**

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| POST   | `/auth/send-otp-email` | Send OTP to email                |
| POST   | `/auth/send-otp-sms`   | Send OTP to SMS                  |
| POST   | `/auth/verify-otp`     | Verify OTP and authenticate user |

| Method | Endpoint       | Description                                            |
| ------ | -------------- | ------------------------------------------------------ |
| POST   | `/auth/signup` | Signup with Supabase OAuth (requires Supabase session) |
| GET    | `/auth/me`     | Get current user profile (Supabase auth required)      |

---

## ⚙️ Setup & Run

### 1. Clone repo & install dependencies

```bash
git clone <repo-url>
cd <project>
bun install
```

### 2. Configure environment

Create `.env` file:

```env
Follow .env.example
```

### 3. Run in dev mode

```bash
bun run dev
```

### 4. Build & run

```bash
bun run build
bun run start
```

---

## 🧪 Health Check

* `GET /health` → `"🚀 Express running on Bun + TypeScript!"`

---

## 🛠️ Tech Stack

* **Bun** → Runtime
* **Express** → HTTP server
* **TypeScript** → Type safety
* **JWT** → Authentication
* **Supabase** → OAuth / session management

---