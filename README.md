# 🍽️ The Ever House

A modern, full-stack MERN restaurant website featuring online table reservations, menu browsing, reservation status tracking, and a secure admin dashboard for reservation management.

---

## ✨ Features

### 👨‍🍳 Customer Features

- Beautiful modern restaurant UI
- Responsive design for all devices
- Browse restaurant menu
- Book a table online
- Reservation reference ID generation
- Check reservation status
- Dietary preference selection
- Seating preference selection
- Special request notes
- Smooth animations and transitions

---

### 🔐 Admin Features

- Secure JWT authentication
- Protected admin dashboard
- View all reservations
- Approve reservations
- Reject reservations
- Live reservation updates
- Dashboard statistics

> **Note:** Admin credentials are private and are intentionally not included in this repository.

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Security

- Helmet
- Express Rate Limit
- CORS
- Environment Variables

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📂 Project Structure

```
The-Ever-House
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/HARSHILL2023/the-ever-house.git

cd the-ever-house
```

---

### Install Frontend

```bash
cd frontend

npm install
```

---

### Install Backend

```bash
cd ../backend

npm install
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Run Locally

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 🌐 Live Demo

**Website**
[
https://your-frontend-url.vercel.app](https://restaurant-webiste-xag4.vercel.app/)

---



## 🔒 Security

- Passwords are securely hashed using bcrypt.
- Authentication uses JWT tokens.
- Sensitive credentials are stored using environment variables.
- Admin credentials are never exposed in this repository.

---

## 🚀 Future Improvements

- Email notifications
- Payment integration
- Online ordering
- Table availability calendar
- Customer accounts
- Analytics dashboard
- Reservation search & filters
- Reservation deletion

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Harshil Patel**

GitHub: [https://github.com/yourusername](https://github.com/HARSHILL2023)

LinkedIn:https://www.linkedin.com/in/harshil-patel-b00063395/

---

⭐ If you like this project, don't forget to give it a Star!
