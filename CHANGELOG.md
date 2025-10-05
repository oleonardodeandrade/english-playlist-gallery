# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-10-05

### Added

#### API Core Features
- RESTful API with Express.js 5.x
- YouTube Data API v3 integration for playlist fetching
- MongoDB integration with Mongoose for data persistence
- Request validation using Zod schemas
- Comprehensive error handling middleware
- CORS support with configurable origins
- Request logging middleware
- Helmet.js security headers

#### Documentation
- Interactive API documentation with Swagger UI at `/api-docs`
- Comprehensive README.md with setup instructions
- CONTRIBUTING.md with coding standards and workflow
- OpenAPI 3.0 specification (swagger.json)

#### Testing
- Complete test suite with Jest and Supertest
- 83 passing tests across all layers
- 75.7% code coverage
- MongoDB Memory Server for integration tests
- Unit tests for models, services, controllers, middlewares, and routes

#### API Endpoints
- `GET /` - Health check endpoint
- `GET /api/videos/list` - List videos from YouTube playlist
- `GET /api/videos/:id` - Get video by ID
- `POST /api/videos/sync` - Sync playlist with database
- `DELETE /api/videos` - Delete all videos (dev only)

#### Developer Experience
- TypeScript 5.9.3 with strict mode
- ESLint with TypeScript support
- Prettier configuration
- Hot reload with ts-node
- Pre-commit validation scripts
- Comprehensive npm scripts (build, test, lint, format)

### Changed
- Upgraded TypeScript from 4.9 to 5.9.3 for Zod v4 compatibility

### Fixed
- Zod error handling type safety
- ESLint configuration for test files
- Unused parameters in error handlers

## [0.0.1] - 2024-09-29

### Added
- Initial project setup
- Basic Express server configuration
- Environment variables setup with dotenv

[Unreleased]: https://github.com/oleonardodeandrade/english-playlist-gallery/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/oleonardodeandrade/english-playlist-gallery/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/oleonardodeandrade/english-playlist-gallery/releases/tag/v0.0.1
