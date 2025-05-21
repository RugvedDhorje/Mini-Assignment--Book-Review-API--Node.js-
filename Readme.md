## 📚 Book Review API

# A minimal Book Review RESTful API built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

# Folder Structure Of the Project :

BookReview/
│
├── routes/ # All route handlers (books, users, reviews, search)
│ ├── books.js
│ ├── reviews.js
│ ├── user.js
│ ├── index.js
│ └── search.js
│
├── models/ # Mongoose models
│ ├── Book.js
│ ├── Review.js
│ └── User.js
│
├── middleware/ # Middleware like auth
│ └── auth.js
│
├── config/ # DB config
│ └── connectDB.js
│
├── .env # Environment variables
├── .gitignore
├── server.js # Entry point
├── README.md
└── package.json

---

## 🔧 Project Setup Instruction:

# 📦 Prerequisites

- Node.js (v14+)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

# 📁 Clone the Repository

git clone https://github.com/RugvedDhorje/Mini-Assignment--Book-Review-API--Node.js-.git
cd Mini-Assignment--Book-Review-API--Node.js-
npm install //To install node_module (Dependencies for all the packages required for your project)

# Create a .env file in the root directory:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Books
JWT_SECRET=Secret@25
PORT=1100

# How to Run Locally

npm start //Runs the server at http://localhost:1100/

---

## 📬 Example API Requests

# 📝 Signup

curl -X POST http://localhost:1100/signup \
 -H "Content-Type: application/json" \
 -d '{"username": "john@gmail.com", "password": "secret","firstName":"John" , "lastName":"Dome"}'

# 📚 Create Book

curl -X POST http://localhost:1100/books/create \
 -H "Authorization: Bearer <your_token>" \
 -H "Content-Type: application/json" \
 -d '{"name": "Book Title", "author": "Author Name", "genre":"Genre of the Book", "rating":4}'

# 💬 Add Review

curl -X POST http://localhost:1100/books/<book_id>/reviews \
 -H "Authorization: Bearer <your_token>" \
 -H "Content-Type: application/json" \
 -d '{"rating": 5, "comment": "Great read!"}'

# 🔍 Search Books

curl "http://localhost:1100/search?q=book"

---

## 🗃️ Database Schema

# 📘 Book

{
name: String,
author: String,
genre: String,
reviews: [ObjectId] // References to Review
}

---

# 👤 User

{
username: String,
password: String ,// Hashed
firstName: String,
lastName: String
}

---

# ✍️ Review

{
user: ObjectId, // References User
book: ObjectId, // References Book
rating: Number,
comment: String
}
