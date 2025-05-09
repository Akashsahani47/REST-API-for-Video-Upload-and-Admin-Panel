# 🎬 Video Streaming Platform REST API

A secure and well-structured REST API backend for a basic video streaming platform.  
This API supports **JWT-based user authentication**, **role management (Admin, Artist, Viewer)**, **video uploads to Cloudinary**, and an **admin approval system** — all without a frontend.

## 📝 Features

- User Registration & Login (JWT Authentication)
- Role-based Access Control (Admin | Artist | Viewer)
- Artist: Upload videos and thumbnails to Cloudinary
- Video Metadata Management (Title, Description, Category, Genre, etc.)
- Admin Panel: Approve or Reject artist-uploaded videos (API-based)
- Secure password storage (bcrypt hashing)
- Simulated database with JSON files (Mocked SQL queries included)

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Cloudinary (Video & Image Upload)
- JSON files for storage (Simulating a database)
- JWT (Authentication)
- bcrypt.js (Password Hashing)

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
Install dependencies

bash
Copy
Edit
npm install
