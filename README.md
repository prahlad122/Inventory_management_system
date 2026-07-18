# 📦 Inventory Management & Billing System
live link - https://inventoryhub1.netlify.app
A full-stack **Inventory Management & Billing System** built using the **MERN Stack**. The application helps businesses efficiently manage inventory, categories, taxes, items, and transactions while providing secure authentication and a responsive user experience.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based Authentication
- Secure Login System
- Protected Routes
- Role-based Authorization (Admin)

### 📂 Master Module
The Master module is designed to manage all essential inventory data.

- Category Management
- Subcategory Management
- Tax Management  ------ udner the development
- Item Management

Each module supports:
- Create
- Update
- Delete (Soft Delete)
- List & Search

### 💳 Transaction Module

The Transaction module manages inventory and billing operations.

- Create Transactions
- Manage Item Details
- Tax Calculation
- Inventory Updates
- Billing Management

### 📊 Dashboard
- Overview of inventory
- Easy navigation
- Responsive Admin Interface

### 📱 Responsive Design
- Desktop
- Tablet
- Mobile Friendly

---

# 🛠️ Tech Stack

## Frontend
- React.js
- JavaScript (ES6+)
- Bootstrap 5
- React Router DOM
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

## Database
- MongoDB Atlas

## Tools
- Git
- GitHub
- Postman

---

# 📁 Project Structure

```
Inventory-Management-System
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# 🔑 Main Modules

## Master

- Category Master
- Subcategory Master
- Tax Master
- Item Master

## Transactions

- Billing
- Inventory Transactions
- Item Handling

---

# 🔒 Authentication

- JWT Token Authentication
- Password Hashing using bcrypt
- Protected REST APIs
- Role-based Access Control

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/inventory-management-system.git
```

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm start
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📸 Screenshots

Add screenshots here.

Example:

- Login Page
- Dashboard
- Category Master
- Subcategory Master
- Tax Master
- Item Master
- Billing Module

---

# 📡 API Features

- User Authentication
- Category CRUD
- Subcategory CRUD
- Tax CRUD
- Item CRUD
- Transaction APIs

---

# ⭐ Best Practices Implemented

- Clean Folder Structure
- RESTful API Design
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Soft Delete
- Centralized Error Handling
- Reusable Components
- Responsive UI
- Secure Password Hashing
- Environment Variables

---

# 🔮 Future Improvements

- Customer Management
- Supplier Management
- Sales Reports
- Purchase Reports
- Invoice PDF Generation
- Barcode Scanner Integration
- Export to Excel/PDF
- Email Notifications

---

# 👨‍💻 Author

**Prahlad Nishad**

- GitHub: https://github.com/prahlad122
- LinkedIn: *(Add your LinkedIn profile)*

---

# 📄 License

This project is developed for educational and portfolio purposes.
