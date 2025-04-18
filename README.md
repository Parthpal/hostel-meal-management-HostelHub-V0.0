# 🏠 PH HostelHub

**Live Website:** [https://hostelhub-28dec.web.app](https://hostelhub-28dec.web.app)

## 📌 Overview

**PH HostelHub** is a complete hostel meal and membership management system. It allows users to explore meal options, make requests, give feedback, and purchase memberships. Admins can efficiently manage users, meals, and feedback through a dedicated dashboard.

---

## ✨ Features

### 👥 User Features

- Browse different **meal categories**
- View **upcoming meals**
- **Request custom meals**
- **Submit reviews**
- Purchase **Gold**, **Silver**, or **Platinum** memberships
- **Search** meals
- **Google Sign-In** or registration via form
- Track **your reviews** and **meal requests**
- Personal dashboard with order history

### 🛠️ Admin Features

- Assign **admin roles** to other users
- **Add, update, or delete** meals
- View and manage **all reviews**
- Handle **membership packages**
- Access full **user database**
- Review **payment histories**

---

## 🧪 Core Backend Collections

- `meal`
- `upComingMeal`
- `membershipPackage`
- `user`
- `payments`
- `foodRequest`
- `reviews`
- `upcomingMealLikeStore`

---

## 📮 Key API Endpoints

| Method | Endpoint                   | Description                     |
|--------|----------------------------|---------------------------------|
| GET    | `/meal`                   | Get all meals                   |
| GET    | `/upcomingMeal`          | Get upcoming meals              |
| POST   | `/meal`                  | Add a new meal                  |
| DELETE | `/menuItemDel/:id`       | Delete a meal                   |
| PUT    | `/mealUpdate/:id`        | Update meal info                |
| POST   | `/create-payment-intent` | Stripe payment intent           |
| POST   | `/payments`              | Store payment information       |
| GET    | `/userInput`             | Search user by name or email    |

---

## 🛡️ Admin & User Credentials

### 🔐 Admin Login
- **Email:** `a@g.com`
- **Password:** `A@123456`

### 👤 Test User Login
- **Email:** `b@g.com`
- **Password:** `A@123456`

> ✅ Users can also sign in using **Google** or our **registration form**.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ph-hostelhub.git
   cd ph-hostelhub
