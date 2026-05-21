# Contributing to knitstudio

First off, thank you for considering contributing to knitstudio! 🧶

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### 🐛 Report Bugs

1. Check if the bug already exists in [Issues](https://github.com/knitstudio/knitstudio/issues)
2. If not, [create a new issue](https://github.com/knitstudio/knitstudio/issues/new)
3. Include:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment (OS, browser, knitstudio version)

### 💡 Suggest Features

1. Check [existing feature requests](https://github.com/knitstudio/knitstudio/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. If not found, create an issue with label `enhancement`
3. Describe the feature, why it's useful, and how it should work

### 🔧 Submit Code Changes

#### Setup

```bash
git clone https://github.com/knitstudio/knitstudio.git
cd knitstudio
pnpm install
pnpm build
pnpm typecheck
```

#### Branch naming

```
feature/my-feature
fix/issue-description
docs/update-readme
```

#### Commit messages

Use conventional commits:

```
feat: add new component
fix: resolve canvas resize issue
docs: update getting started guide
refactor: extract store logic
test: add data binding tests
chore: update dependencies
```

#### Before submitting a PR

```bash
pnpm build
pnpm typecheck
pnpm -r test
```

All must pass without errors.

### 📦 Package structure

| Package | Description | Key files |
|---------|-------------|-----------|
| `packages/core` | Shared types and utilities | `src/index.ts` |
| `packages/canvas` | GrapesJS wrapper | `src/KnitCanvas.tsx` |
| `packages/builder` | Main application | `src/App.tsx`, `src/BuilderView.tsx` |
| `packages/api` | Express backend | `src/app.ts`, `src/routes/` |

### 🧪 Testing

```bash
# Run all tests
pnpm -r test

# Run specific package tests
pnpm --filter @knitstudio/builder test

# Run E2E tests
pnpm --filter @knitstudio/builder test:e2e
```

### 📖 Documentation

Docs live in `docs/` as Markdown files. Update them if your change affects user-facing features.

## Questions?

Open a [Discussion](https://github.com/knitstudio/knitstudio/discussions) or email `support@knitstudio.io`.

---

Thank you for making knitstudio better! 🎉
