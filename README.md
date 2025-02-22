# 🗺️ HappyMap

A modern web application for discovering, booking, and managing unique places and experiences.

## ✨ Features

- 🔐 User authentication and role-based access
- 🏠 Place discovery and detailed views
- 📱 Responsive design for all devices
- 🌙 Dark/Light mode support
- 📅 Booking management system
- 👥 Multi-role support (Users & Owners)
- 🔍 Category-based exploration
- 📍 Place management for owners
- 🔑 OAuth 2.0 Authentication with Google
- 🔒 JWT-based authorization

## 🛠️ Tech Stack

- **Frontend:**

  - React.js
  - Redux for state management
  - Tailwind CSS for styling
  - Shadcn UI components
  - React Router for navigation

- **Backend:**

  - Node.js & Express.js
  - PostgreSQL database
  - Passport.js for authentication
  - JWT for authorization

- **Development Tools:**
  - Vite
  - Turbo (Monorepo)
  - ESLint & Prettier
  - npm workspaces

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env` in both frontend and backend apps
   - Fill in required environment variables:
     - Frontend: API endpoints, Google OAuth credentials
     - Backend: Database URL, JWT secret, Session secret, OAuth credentials

4. **Start development servers**

   ```bash
   # Run both frontend and backend in development mode
   npm run dev

   ```

## 📁 Project Structure

```
├── apps/
│   ├── frontend/          # React application
│   └── backend/           # Express.js server
├── packages/              # Shared packages
├── docs/                  # Project documentation
└── turbo.json            # Turbo configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
