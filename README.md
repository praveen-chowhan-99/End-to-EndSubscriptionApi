# 🔔 End-to-End SubscriptionApi

**Subscription Tracker** is a full-stack web application that helps users manage their subscriptions efficiently. It includes features like authentication, subscription CRUD operations, email renewal reminders, bot protection, and a clean responsive interface.

---

## 🚀 Features

- ✅ **User Authentication** (Sign-up, Sign-in, Sign-out)
- 📋 **Subscription Management** (Create, View, Update, Delete)
- 📧 **Email Reminders** for upcoming subscription renewals
- 🔁 **Workflow-based Reminder Scheduling** using Upstash
- 🛡️ **Middleware** for error handling, authentication, and bot detection
- 💻 **Responsive Frontend** using HTML, CSS, and JavaScript

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Authentication**: JWT (JSON Web Tokens)  
- **Email Service**: Nodemailer  
- **Workflow Automation**: Upstash Workflows  
- **Frontend**: HTML, CSS, JavaScript  
- **Other Libraries**: Day.js (for date handling), Arcjet (for bot protection)

---

## 📁 Folder Structure

subscription-tracker/
├── server/ # Express server and API routes

│ ├── controllers/ # Route logic

│ ├── models/ # Mongoose models

│ ├── middleware/ # Auth, error, and bot-detection middleware

│ ├── routes/ # Route definitions

│ ├── utils/ # Helper functions (email, JWT, etc.)

│ └── index.js # Server entry point

├── public/ # Frontend files (HTML, CSS, JS)

├── .env.development.local # Development environment variables

├── .env.production.local # Production environment variables

├── package.json # Project metadata and dependencies

└── README.md # Project documentation

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praveen-chowhan-99/End-to-EndSubscriptionApi.git

Install dependencies

npm install
Set up environment variables

Create .env.development.local and .env.production.local in the root directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
BASE_URL=http://localhost:5000
Start the server

npm start
Open the frontend in your browser
Navigate to public/index.html or open it directly in your browser.

## 🔌 API Endpoints
## 🔐 Authentication
Method	Endpoint	Description

POST	/api/v1/auth/sign-up	Register a new user

POST	/api/v1/auth/sign-in	Log in a user

POST	/api/v1/auth/sign-out	Log out a user

## 📦 Subscriptions
Method	Endpoint	Description
GET	/api/v1/subscriptions	Get all subscriptions

POST	/api/v1/subscriptions	Create a new subscription

GET	/api/v1/subscriptions/user/:id	Get subscriptions for a specific user

## 👤 Users
Method	Endpoint	Description

GET	/api/v1/users	Get all users

GET	/api/v1/users/:id	Get a specific user

## 🔁 Workflows
Method	Endpoint	Description

POST	/api/v1/workflows/subscription/reminder	Trigger subscription reminders

## 🧪 Usage
Start the server using:


npm start
Open your browser and navigate to:

public/index.html

## 🤝 Contributions
Contributions, issues, and feature requests are welcome!

Feel free to fork the repo, submit a pull request, or open an issue.

## 📫 Contact
If you have any questions or suggestions, feel free to reach out via GitHub.

Happy Tracking! 🚀











