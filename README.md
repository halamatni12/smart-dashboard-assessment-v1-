# 🌦️ Smart Dashboard Assessment v1
[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-Click%20Here-brightgreen?style=for-the-badge)](https://smart-lifestyle-bb812.web.app)

![Playwright Tested](https://img.shields.io/badge/TESTED%20WITH-Playwright-purple?style=for-the-badge)

A full-featured **Angular 17** application combining a real-time **Weather Dashboard** with an integrated **E-Commerce System**, built to demonstrate advanced frontend development using **Firebase**, **Bootstrap 5**, and modern **Angular Signals** state management.

---

## 🚀 Overview

The **Smart Dashboard Assessment v1** offers a modern and interactive user experience featuring:
- Real-time **Weather System** that adapts UI and visuals dynamically.  
- Integrated **E-Commerce module** with Cart, Wishlist, and Checkout.  
- Secure **Firebase Authentication** for user login and registration.  
- Fully tested components with **Unit & E2E tests**.

---

## ✨ Key Features

### 🌤 Weather System
- Fetches live weather data using **Open-Meteo API**.  
- Displays temperature, humidity, and multi-day forecast.  
- Auto-detects user location via **Geolocation API**.  
- Changes UI background and theme based on weather condition.

### 🛍 E-Commerce Module  
*(Product API: Fetch and display products from [FakeStore API](https://fakestoreapi.com/))*  
- Dynamic product catalog with filtering and categories.  
- Add to **Cart** or **Wishlist** instantly.  
- Automatic **price calculations** and live total updates.  
- Product details with images, description, and price.  
- Smooth **Checkout** process with form validation.

### 🔐 Authentication (Firebase)
- User **Login / Signup / Forgot Password** workflows.  
- Persistent authentication state with **Angular Signals**.  
- Auto-redirects and secure logout with confirmation prompt.

### 💡 UI / UX Design
- Fully responsive layout using **Bootstrap 5** + custom CSS variables.  
- Clean glassmorphism interface with light & dark themes.  
- Modular and reusable components (Navbar, Footer, Cards, Modals).  
- Smooth animations and state-driven updates.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | Angular 17 (Standalone Components) |
| **Styling** | Bootstrap 5 + Custom CSS |
| **Auth & Backend** | Firebase Authentication |
| **Weather API** | Open-Meteo API |
| **State Management** | Angular Signals |
| **Testing** | Jasmine + Karma + Playwright |
| **Version Control** | Git / GitHub |

---

## 🧩 How to Run

1- **Clone the repository**
   ```bash
   git clone https://github.com/halamatni12/smart-dashboard-assessment-v1.git
   cd smart-dashboard-assessment-v1

2.Install dependencies
npm install


3.Run the development server
ng serve

4.Open the app in your browser

http://localhost:4200


🧪 Testing

Run unit tests:

ng test


Run end-to-end (Playwright) tests:

Run the test (with visible browser):
npx playwright test --headed


View test report:
npx playwright show-report


🧾Assessment Criteria Alignment

Criteria	Description
UI/UX Design	Clean, responsive, and modern interface
Functionality	Weather system, Firebase Auth, and E-Commerce logic
Code Quality	Modular, reusable, and well-structured
State Management	Angular Signals (no localStorage)
Testing	Full coverage with Jasmine & Playwright
Documentation	Professional README with setup guide

👩‍💻 Author

Hala Almatni
📧 halamatni12@gmail.com

💻 GitHub: halamatni12