# 🎥 English Playlist Gallery API

API backend for managing and displaying English learning video playlists from YouTube.

[![Tests](https://img.shields.io/badge/tests-83%20passing-brightgreen)](./src)
[![Coverage](https://img.shields.io/badge/coverage-75.7%25-green)](./coverage)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the API](#running-the-api)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)

## ✨ Features

- ✅ Fetch YouTube playlist videos
- ✅ RESTful API endpoints
- ✅ Request validation with Zod
- ✅ Error handling middleware
- ✅ CORS support
- ✅ Request logging
- ✅ TypeScript support
- ✅ Comprehensive test suite (83 tests)
- ✅ Interactive API documentation (Swagger)
- ✅ MongoDB integration (optional)

## 🛠 Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js
- **Validation:** Zod
- **Database:** MongoDB (Mongoose)
- **Testing:** Jest + Supertest
- **Documentation:** Swagger UI
- **Security:** Helmet.js
- **Code Quality:** ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (optional, for persistence)
- YouTube Data API v3 key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oleonardodeandrade/english-playlist-gallery.git
cd english-playlist-gallery/api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key_here
PLAYLIST_ID=PLcetZ6gSk968DQPgqGfu6GOJ4yEoQAu4h
NUMBER_OF_VIDEOS=10

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/english-playlist-gallery
```

### Running the API

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Interactive Documentation

Visit `http://localhost:3000/api-docs` when the server is running to access the **Swagger UI** interactive documentation.

### Endpoints

#### Health Check
```http
GET /
```

Response:
```json
{
  "message": "English Playlist Gallery API",
  "version": "1.0.0",
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### List Videos
```http
GET /api/videos/list?playlistId={playlistId}&maxResults={number}
```

**Query Parameters:**
- `playlistId` (optional): YouTube playlist ID
- `maxResults` (optional): Number of videos to return (1-50, default: 10)

**Response:**
```json
{
  "kind": "youtube#playlistItemListResponse",
  "etag": "...",
  "items": [
    {
      "kind": "youtube#playlistItem",
      "id": "...",
      "snippet": {
        "title": "Video Title",
        "description": "...",
        "thumbnails": {...},
        "resourceId": {
          "videoId": "..."
        }
      }
    }
  ],
  "pageInfo": {
    "totalResults": 100,
    "resultsPerPage": 10
  }
}
```

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

### Test Structure

```
src/
├── __tests__/
│   ├── models/
│   │   └── Video.model.test.ts
│   ├── services/
│   │   └── video.service.test.ts
│   ├── controllers/
│   │   └── video.controller.test.ts
│   ├── middlewares/
│   │   ├── validation.test.ts
│   │   └── errorHandler.test.ts
│   └── routes/
│       └── video.routes.test.ts
```

**Test Coverage:**
- Controllers: 100%
- Routes: 100%
- Models: 100%
- Middlewares: 98.63%
- Overall: 75.7%

## 📁 Project Structure

```
api/
├── src/
│   ├── config/           # Configuration files
│   │   ├── env.ts       # Environment variables
│   │   ├── database.ts  # Database connection
│   │   ├── swagger.json # API documentation
│   │   └── testSetup.ts # Test configuration
│   ├── controllers/      # Route controllers
│   │   └── video.controller.ts
│   ├── middlewares/      # Custom middlewares
│   │   ├── cors.ts
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   │   └── validation.ts
│   ├── models/           # Database models
│   │   └── Video.model.ts
│   ├── routes/           # API routes
│   │   ├── index.ts
│   │   └── video.routes.ts
│   ├── services/         # Business logic
│   │   ├── video.service.ts
│   │   └── youtube.service.ts
│   ├── types/            # TypeScript types
│   │   └── youtube.types.ts
│   ├── app.ts            # Express app setup
│   └── index.ts          # Entry point
├── .env.example          # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👤 Author

**Leonardo Andrade**
- GitHub: [@oleonardodeandrade](https://github.com/oleonardodeandrade)

## 🙏 Acknowledgments

- YouTube Data API v3
- Express.js community
- All contributors

---

Made with ❤️ for English learners
