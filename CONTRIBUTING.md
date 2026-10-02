# Contributing to TriageSense

Thank you for your interest in contributing to TriageSense. This repository follows standard GitHub workflow conventions.

---

## 🌿 Branching Strategy

This repository enforces modern Git branch standards:

| Branch | Role | Protection |
|---|---|---|
| `main` | Default, stable branch. Mirrors the live GitHub Pages prototype. | Protected. No direct push; changes arrive via pull requests. |
| `develop` | Integration branch for ongoing prototyping, new viewports, and component enhancements. | Unprotected working integration branch. |

### Working on Changes

1. Branch off `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```
2. Commit with conventional commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
3. Push to your branch and open a Pull Request targeting `develop`.
4. Once verified on `develop`, changes are promoted to `main` via release PRs.
