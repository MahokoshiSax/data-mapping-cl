# Data Mapping System

A modern web application for managing data mappings with Google authentication integration.

## Features

- 🔐 Google Authentication
- 📊 Data Mapping Management
- 🎨 Modern UI with Tailwind CSS
- 🔒 Protected Routes
- 🚀 Next.js 13+ with App Router
- 🏗️ NestJS Backend
- 🐳 Docker Support

## Tech Stack

### Frontend
- Next.js 13+
- NextAuth.js for authentication
- Tailwind CSS for styling
- TypeScript
- React 19

### Backend
- NestJS
- MongoDB
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Google OAuth credentials
- Docker and Docker Compose (for Docker setup)

### Environment Variables

Create a `.env` file in the frontend directory:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://mongodb:27017/data-mapping
PORT=3001
```

### Installation

#### Option 1: Docker Setup (Recommended)

1. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017

To stop the application:
```bash
docker-compose down
```

To stop and remove all data (including MongoDB volume):
```bash
docker-compose down -v
```

#### Option 2: Local Development Setup


1. Install frontend dependencies
```bash
cd frontend
npm install
```

2. Install backend dependencies
```bash
cd ../backend
npm install
```

### Running the Application

#### Docker Setup
The application will automatically start when you run `docker-compose up --build`.

#### Local Development

1. Start the backend server
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Authentication

The application uses Google OAuth for authentication:

1. Sign in with Google
2. Access token is stored in localStorage
3. Protected routes are automatically handled
4. Session management is handled by NextAuth.js

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── app/
│   │   ├── data-mapping/
│   │   └── main.ts
│   ├── test/
│   └── Dockerfile
└── docker-compose.yml
```
