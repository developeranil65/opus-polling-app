# 📊 Opus polling Backend

A **real-time poll creation and voting system** backend built with **Node.js, Express, MongoDB, and WebSockets**.  
This service supports **QR-based voting**, **role-based access control**, and **live vote updates** via WebSockets.

---

## 🚀 Features

- **JWT Authentication** (with refresh tokens)
- **Create Polls** with:
  - Title & options
  - Multiple choice toggle
  - Public/Private results toggle
  - Expiration date
  - Auto-generated short poll code
  - QR code upload to Cloudinary
- **Vote System**:
  - Prevent duplicate voting via IP tracking
  - Real-time vote updates via WebSockets
  - QR code & poll code-based voting
- **Poll Management**:
  - View polls you created
  - Delete polls
  - Toggle result visibility
- **Live Results API** (with percentage calculation)
- **Secure APIs** with authentication middleware
- **Environment-based config** for production readiness

---

## 🛠 Tech Stack

**Backend**:
- Node.js
- Express.js
- MongoDB with Mongoose
- WebSocket (`ws`)

**Other Libraries**:
- `jsonwebtoken` – JWT auth
- `bcryptjs` – Password hashing
- `qrcode` – QR code generation
- `cloudinary` – Image storage
- `dotenv` – Environment variables
- `zod` – Input validation

---

## 📂 Repository

[GitHub Repository](https://github.com/developeranil65/opus-polling-app.git)

---

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/developeranil65/opus-polling-app.git
cd opus-polling-app
```
2. **Install Dependencies**
```bash
npm install
```
3. **Check for env.sample File and create your env file**
```bash
PORT={port_number}
MONGODB_URI={mongodb_connection_string}
CORS_ORIGIN={frontend_url}

ACCESS_TOKEN_SECRET={access_token_secret_key}
ACCESS_TOKEN_EXPIRY={access_token_expiry_time}
REFRESH_TOKEN_SECRET={refresh_token_secret_key}
REFRESH_TOKEN_EXPIRY={refresh_token_expiry_time}

CLOUDINARY_NAME={cloudinary_name}
CLOUDINARY_API_KEY={cloudinary_api_key}
CLOUDINARY_API_SECRET={cloudinary_api_secret}
```
4. **Run in development mode**
```bash
npm run dev
```
5. **The backend will start**
```bash
`http://localhost:{port_number_in_env}`
```

📜 License
MIT License © 2025 developeranil65
