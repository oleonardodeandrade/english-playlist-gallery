# Contributing to English Playlist Gallery API

First off, thank you for considering contributing to English Playlist Gallery API! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/english-playlist-gallery.git
   cd english-playlist-gallery/api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Create a new branch:**
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 💻 Development Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make your changes**

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Check code quality:**
   ```bash
   npm run lint
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow existing code style
- Use proper types (avoid `any`)
- Document complex functions with JSDoc comments

### Code Style

- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Required
- **Line length:** Max 100 characters (when reasonable)

### File Naming

- **Components/Classes:** PascalCase - `VideoController.ts`
- **Files:** camelCase - `video.service.ts`
- **Tests:** Match source file name with `.test.ts` - `video.service.test.ts`
- **Types:** PascalCase with `.types.ts` - `youtube.types.ts`

### Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middlewares/      # Custom middlewares
├── models/           # Database models
├── routes/           # API routes
├── services/         # Business logic
├── types/            # TypeScript types
└── __tests__/        # Test files (mirror src structure)
```

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(videos): add pagination support

fix(validation): correct maxResults validation logic

docs(readme): update installation instructions

test(controller): add tests for error handling
```

### Rules

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep subject line under 72 characters

## 🔄 Pull Request Process

1. **Update documentation** if needed

2. **Add tests** for new features

3. **Ensure all tests pass:**
   ```bash
   npm test
   ```

4. **Update the README.md** with details of changes if applicable

5. **Create Pull Request** with:
   - Clear title following commit conventions
   - Description of what changed and why
   - Link to related issues
   - Screenshots (if UI changes)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Updated existing tests

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

## 🧪 Testing Guidelines

### Writing Tests

1. **Unit Tests** - Test individual functions/methods
2. **Integration Tests** - Test API endpoints
3. **Coverage** - Aim for >80% coverage

### Test Structure

```typescript
describe('Feature/Component Name', () => {
  describe('method/function name', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = someFunction(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Best Practices

- Test one thing at a time
- Use descriptive test names
- Mock external dependencies
- Clean up after tests
- Test edge cases and error scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- video.service.test.ts
```

## 🐛 Reporting Bugs

**Before creating bug reports**, please check existing issues to avoid duplicates.

### Bug Report Template

- **Description:** Clear description of the bug
- **Steps to Reproduce:** How to reproduce the behavior
- **Expected Behavior:** What you expected to happen
- **Actual Behavior:** What actually happened
- **Environment:** OS, Node version, etc.
- **Screenshots:** If applicable

## 💡 Suggesting Features

Feature requests are welcome! Please provide:

- **Use Case:** Why is this feature needed?
- **Proposed Solution:** How should it work?
- **Alternatives:** Any alternative solutions considered?
- **Additional Context:** Any other relevant information

## ❓ Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

---

Thank you for contributing! 🙌
