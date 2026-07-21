# Customer Web Builds

A full-stack web application that enables customers to plan, book, and manage custom website development services. The application includes a customer-facing website and a secure admin portal for managing website plans, bookings, appointment slots, and customer communications.

---

## Project Overview

Customer Web Builds simplifies the process of requesting a custom website by allowing customers to:

- Plan their website requirements
- Book consultation appointments
- Receive confirmation emails
- Track a professional booking workflow

Administrators can securely log in to manage website plans, bookings, available slots, and customer requests through a dedicated dashboard.

---

## Features

### Customer Portal

- Responsive landing page
- Website planning form
- Consultation booking form
- Booking validation
- Prevent duplicate bookings
- Available slot selection
- Confirmation page
- Email confirmation after booking

### Admin Portal

- Secure JWT Authentication
- Admin Login
- Protected Routes
- Dashboard
- Manage Website Plans
- Manage Bookings
- Manage Appointment Slots
- Booking Status Management
- Customer & Admin Email Notifications

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Nodemailer
- Zod Validation

### Database

- PostgreSQL
- Prisma

---

## Project Structure

```
customer-web-builds
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── templates
│   │   ├── types
│   │   ├── utils
│   │   └── validations
│   ├── package.json
│   └── tsconfig.json
│
├── public
│
├── src
│   ├── api
│   ├── components
│   ├── context
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── types
│   └── utils
│
├── package.json
└── README.md
```

---

## Application Workflow

### Customer Workflow

1. Visit the website.
2. Fill in the Website Planning Form.
3. Submit website requirements.
4. Book an available consultation slot.
5. Receive booking confirmation.
6. Receive confirmation email.

---

### Admin Workflow

1. Login using admin credentials.
2. View dashboard.
3. Manage website plans.
4. Manage bookings.
5. Confirm or cancel bookings.
6. Manage available slots.
7. Receive notifications for new bookings.

---

## Authentication

The application uses JWT Authentication.

Features include:

- Secure Login
- Password Hashing using bcrypt
- Protected Routes
- Token Validation
- Authorization Middleware

---

## Database Models

### WebsitePlan

Stores customer website requirements.

### Booking

Stores consultation booking details.

### Slot

Stores available appointment slots.

### Admin

Stores administrator credentials.

---

## Email Notifications

The application sends automated emails using Nodemailer.

### Customer

- Booking Confirmation

### Admin

- New Booking Notification

---

## API Modules

### Authentication

- Login
- Current User

### Website Plans

- Create Website Plan
- View Website Plans

### Booking

- Create Booking
- Update Status
- View Bookings

### Slots

- Create Slot
- Update Slot
- Delete Slot
- List Available Slots

### Admin

- Dashboard
- Booking Management
- Website Plan Management

---

## Validation

The backend validates requests using Zod.

Validation includes:

- Required Fields
- Email Format
- Phone Number
- Date & Time
- Booking Rules

---

## Security Features

- JWT Authentication
- Password Hashing
- Input Validation
- Error Handling
- Protected Admin Routes

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/customer-web-builds.git
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=

JWT_SECRET=

SMTP_HOST=

SMTP_PORT=

SMTP_USER=

SMTP_PASS=
```

---

## Future Improvements

- Payment Integration
- Google Calendar Integration
- SMS Notifications
- File Uploads
- Analytics Dashboard
- Customer Dashboard
- Multi-admin Support


## Learning Outcomes

Through this project, I gained hands-on experience in:

- Full Stack Development
- React & TypeScript
- REST API Development
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Express.js
- Node.js
- Email Integration
- Database Relationships
- Form Validation
- Responsive UI Design
- Secure Backend Development



## Author

R Priyadharshini
