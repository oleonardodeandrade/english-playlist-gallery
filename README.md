# 🎬 English Playlist Gallery

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern full-stack application that transforms YouTube playlists into an interactive video gallery for English learners.

[Live Demo](https://english-playlist-gallery.vercel.app) · [API Docs](https://english-playlist-api.onrender.com/api-docs) · [Report Bug](https://github.com/oleonardodeandrade/english-playlist-gallery/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**English Playlist Gallery** is a full-stack web application designed to help English learners by providing a centralized, interactive interface for YouTube educational playlists. The app fetches videos from a YouTube playlist, stores them in a database, and presents them in a beautiful, responsive gallery with an integrated video player.

### Why This Project?

- 📚 **Centralized Learning**: All educational videos in one place
- 🎥 **Seamless Experience**: Embedded player without leaving the app
- 📱 **Mobile-First**: Fully responsive design for learning on any device
- ♿ **Accessible**: ARIA labels and semantic HTML for everyone
- 🚀 **Modern Stack**: Built with the latest web technologies

---

## ✨ Features

### Core Features
- 🎬 **YouTube Integration**: Automatically syncs videos from YouTube playlists
- 🎯 **Interactive Gallery**: Grid layout with video thumbnails and metadata
- 📺 **Embedded Player**: Watch videos directly in the app using ReactPlayer
- 🔄 **Auto-sync**: Keep playlist up-to-date with YouTube
- 💾 **Persistent Storage**: MongoDB for reliable data persistence

### User Experience
- ⚡ **Fast Loading**: Optimized performance with lazy loading
- 🎨 **Smooth Animations**: Polished UI transitions and effects
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ♿ **Accessibility**: WCAG compliant with ARIA labels
- 🎭 **Loading States**: Beautiful skeleton loaders for better UX

### Developer Experience
- 📝 **TypeScript**: Full type safety across the stack
- 🧪 **Well Tested**: 83 tests with 75.7% coverage
- 📚 **Swagger Docs**: Interactive API documentation
- 🔒 **Security**: Helmet.js, CORS, input validation
- 🚀 **CI/CD**: Automated deployments with Render and Vercel

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 22+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **API**: YouTube Data API v3
- **Validation**: Express Validator
- **Documentation**: Swagger UI
- **Testing**: Jest + Supertest
- **Security**: Helmet.js, CORS

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: ReactPlayer
- **State Management**: Context API
- **HTTP Client**: Axios
- **Code Quality**: ESLint + Prettier

### DevOps & Deployment
- **Backend Hosting**: Render
- **Frontend Hosting**: Vercel
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions + Render Blueprint
- **Version Control**: Git + GitHub

---

## 🏗 Architecture

```
english-playlist-gallery/
├── api/                          # Backend Application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Route controllers
│   │   ├── middlewares/         # Custom middlewares
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript types
│   │   └── server.ts            # Entry point
│   ├── tests/                   # Test files
│   └── package.json
│
├── web/                         # Frontend Application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── context/             # Context providers
│   │   ├── hooks/               # Custom hooks
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── styles/              # Global styles
│   │   ├── types/               # TypeScript types
│   │   └── main.tsx             # Entry point
│   └── package.json
│
├── render.yaml                  # Render deployment config
├── DEPLOY.md                    # Deployment guide
├── ROADMAP.md                   # Project roadmap
└── README.md                    # This file
```

### Key Design Patterns

- **MVC Pattern**: Separation of concerns in the backend
- **Service Layer**: Business logic isolated from controllers
- **Context API**: State management in the frontend
- **Custom Hooks**: Reusable React logic
- **Error Boundaries**: Graceful error handling

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- YouTube Data API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oleonardodeandrade/english-playlist-gallery.git
   cd english-playlist-gallery
   ```

2. **Setup Backend**
   ```bash
   cd api
   npm install
   ```

   Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/english-playlist-gallery
   YOUTUBE_API_KEY=your_youtube_api_key_here
   PLAYLIST_ID=PLcetZ6gSk968DQPgqGfu6GOJ4yEoQAu4h
   NUMBER_OF_VIDEOS=50
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Setup Frontend**
   ```bash
   cd ../web
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Run the application**

   Terminal 1 (Backend):
   ```bash
   cd api
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd web
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - API Docs: http://localhost:3000/api-docs

---

## 📚 API Documentation

### Base URL
- **Production**: `https://english-playlist-api.onrender.com/api`
- **Staging**: `https://english-playlist-api-staging.onrender.com/api`
- **Local**: `http://localhost:3000/api`

### Endpoints

#### Health Check
```http
GET /api/health
```
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-12T10:30:00.000Z",
  "uptime": 12345.67
}
```

#### List Videos
```http
GET /api/videos/list
```
Get all videos from the database.

**Response:**
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "English Lesson 1",
      "description": "Learn basic English...",
      "thumbnail": "https://i.ytimg.com/vi/...",
      "publishedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Sync Playlist
```http
POST /api/videos/sync
```
Sync videos from YouTube playlist to database.

**Response:**
```json
{
  "success": true,
  "message": "Playlist synced successfully",
  "data": {
    "totalVideos": 50,
    "newVideos": 5,
    "updatedVideos": 45
  }
}
```

### Interactive Documentation

Visit [Swagger UI](https://english-playlist-api.onrender.com/api-docs) for interactive API documentation with request/response examples.

---

## 🌐 Deployment

### Production URLs

- **Frontend**: https://english-playlist-gallery.vercel.app
- **Backend API**: https://english-playlist-api.onrender.com
- **API Documentation**: https://english-playlist-api.onrender.com/api-docs

### Deployment Guide

For detailed deployment instructions, see [DEPLOY.md](./DEPLOY.md).

#### Quick Deploy

**Backend (Render)**
1. Connect GitHub repository
2. Render auto-detects `render.yaml`
3. Set environment variables
4. Deploy automatically on push to `main`

**Frontend (Vercel)**
1. Import GitHub repository
2. Configure root directory: `web`
3. Set `VITE_API_BASE_URL` environment variable
4. Deploy automatically on push to `main`

### CI/CD

- **Staging**: Auto-deploy from `develop` branch
- **Production**: Auto-deploy from `main` branch
- **Configuration**: `render.yaml` for backend blueprint

---

## 🧪 Testing

### Backend Tests

```bash
cd api

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- ✅ 83 tests passing
- ✅ 75.7% code coverage
- ✅ Unit tests for all services
- ✅ Integration tests for all endpoints
- ✅ E2E tests for critical flows

### Frontend Tests

```bash
cd web

# Run tests (when implemented)
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./api/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [YouTube Data API](https://developers.google.com/youtube/v3) for video data
- [ReactPlayer](https://github.com/cookpete/react-player) for video playback
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Render](https://render.com) and [Vercel](https://vercel.com) for hosting

---

## 👨‍💻 Author

**Leonardo Andrade**

- GitHub: [@oleonardodeandrade](https://github.com/oleonardodeandrade)
- LinkedIn: [Leonardo Andrade](https://linkedin.com/in/oleonardodeandrade)

---

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/oleonardodeandrade/english-playlist-gallery)
![GitHub issues](https://img.shields.io/github/issues/oleonardodeandrade/english-playlist-gallery)
![GitHub stars](https://img.shields.io/github/stars/oleonardodeandrade/english-playlist-gallery)

---

<div align="center">

**⭐ If you like this project, please give it a star! ⭐**

Made with ❤️ by [Leonardo Andrade](https://github.com/oleonardodeandrade)

</div>
