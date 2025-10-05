# Release Checklist

## Pre-Release

- [ ] All tests passing (`npm test`)
- [ ] Lint checks passing (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] Coverage meets threshold (>75%)
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Documentation updated

## Release Types

### Major (X.0.0)
Breaking changes that require migration:
- API endpoint changes
- Database schema changes
- Major dependency updates

### Minor (0.X.0)
New features, backward compatible:
- New API endpoints
- New functionality
- Non-breaking enhancements

### Patch (0.0.X)
Bug fixes and minor improvements:
- Bug fixes
- Performance improvements
- Documentation updates

## Release Process

1. Update CHANGELOG.md with release notes
2. Bump version: `npm version [major|minor|patch]`
3. Push tags: `git push && git push --tags`
4. Create GitHub release with notes from CHANGELOG
5. Monitor deployment and logs

## Post-Release

- [ ] GitHub release created
- [ ] Release notes published
- [ ] Team notified
- [ ] Monitor error tracking
