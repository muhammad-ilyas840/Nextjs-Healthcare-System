# Next.js Healthcare Management System

A full-stack Healthcare Management System built with **Next.js**, **MongoDB**, and **Stripe**. The application provides separate experiences for patients and doctors, allowing patients to book appointments and make payments while doctors manage appointments and track their activity.

## 🔗 Links

- **GitHub Repository:** [Nextjs-Healthcare-System](https://github.com/muhammad-ilyas840/Nextjs-Healthcare-System)
- **GitHub Profile:** [muhammad-ilyas840](https://github.com/muhammad-ilyas840)

## 🚀 Features

### Authentication & Authorization
- Patient and Doctor registration and login.
- JWT-based authentication using HttpOnly cookies.
- Role-based authorization for patients and doctors.
- Protected routes using `proxy.js`.
- Server-side authentication checks in API route handlers.

### Patient Features
- Patient dashboard.
- View available doctors and their profiles.
- Book appointments with doctors.
- View appointment details and statuses.
- Make payments for completed appointments through Stripe.
- View payment records.

### Doctor Features
- Doctor dashboard.
- View and manage patient appointments.
- Update appointment statuses, including Pending, Confirmed, Completed, and Cancelled.
- View appointment statistics.
- Track pending and paid payments.
- View payment records.

### Payment Integration
- Stripe Checkout integration.
- Secure payment processing.
- Stripe webhook signature verification.
- Payment records saved in MongoDB after successful payment.
- Payment validation to prevent duplicate payments.

## 🛠️ Tech Stack

**Frontend & Framework**
- Next.js
- React
- JavaScript
- Tailwind CSS

**Backend**
- Next.js App Router
- Route Handlers
- Node.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- HttpOnly Cookies
- Role-Based Authorization

**Payment**
- Stripe Checkout
- Stripe Webhooks

**Tools**
- Git
- GitHub
- Stripe CLI

## 📂 Project Structure

The project follows the Next.js App Router structure. Its main directories include:

- `app/` – Application pages, layouts, dashboards, and API routes.
- `app/api/` – Backend API route handlers.
- `models/` – Mongoose database models.
- `lib/` – Database connection and authentication helpers.
- `public/` – Static assets.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/muhammad-ilyas840/Nextjs-Healthcare-System.git
```

### 2. Navigate to the Project Directory

```bash
cd Nextjs-Healthcare-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
Mongo_Url=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Stripe_secret_key=your_stripe_secret_key
Stripe_webhook_secret=your_stripe_webhook_secret
```

Replace the placeholder values with your own credentials.

**Important:** Never share your secret keys or commit `.env.local` to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💳 Stripe Webhook Setup

For local webhook testing, install and configure the Stripe CLI.

Run the Stripe listener and forward events to your application's actual webhook endpoint:

```bash
stripe listen --forward-to localhost:3000/your-webhook-route
```

Use the webhook signing secret provided