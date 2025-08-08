# 🗳️ Opus Polling App

Opus Polling App is a backend service for creating, managing, and voting in polls with live result tracking.  
Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features
- Create polls with multiple options  
- Single-choice or multiple-choice voting  
- Set poll expiry dates  
- Prevent duplicate voting by IP  
- View poll details without revealing votes  
- Live results with absolute numbers & percentages  
- Auto-generated QR codes for polls  

---

## 📦 Tech Stack
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Cloudinary** (QR code uploads)
- **Postman** (API testing)

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
http://localhost:3000
```

📜 License
MIT License © 2025 developeranil65