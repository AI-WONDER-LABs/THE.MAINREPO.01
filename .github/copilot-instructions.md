# Copilot Task Instructions for AI-WONDER-LABs/THE.MAINREPO.01

## Task Confirmation & Updates
1. **Task Status**: After completing any task (file creation, code edits, security scans, tests), always post a confirmation comment summarizing:
   - What was done
   - Any errors encountered
   - Next recommended steps
2. **Security Checks**: Before marking any task as complete, run:
   - `npm run lint && npm run test && npm audit && npx tsc --noEmit` (Node/TS)
   - `black . && flake8 . && bandit -r . && pip-audit` (Python)
3. **Dependency Checks**: List any outdated or vulnerable dependencies found.
4. **CI/CD Verification**: Ensure all GitHub Actions or Azure pipelines run successfully.
5. **Daily/PR Updates**: For long-running tasks or multi-file changes, post interim progress updates, confirming what is complete and what remains.
6. **Completion Confirmation**: Always conclude with a **final comment**:

## Purpose
Enable Copilot to generate, modify, and validate code automatically with full checks for coding standards, security, and CI compatibility. All generated code should be production-ready and verified locally before PRs.

---

## General Rules
1. **Automatic Validation**  
   - After generating or modifying code, always run:
     - TypeScript: `npx tsc --noEmit`
     - JavaScript/TypeScript linters: `npm run lint` and `npm run lint:fix`
     - Format code: `npm run format` or `prettier --write .`
     - Python: `black .` and `flake8 .`
     - Tests: `npm run test` (Jest), `pytest` (Python)
   - Run `npm audit` for Node dependencies and scan for sensitive info (`.env`, secrets).

2. **Security Checks**
   - Do not include secrets or API keys in code.
   - Run security validations on all generated code or Docker files.
   - Verify auth, payment, or crypto-related code is secure and tested.

3. **CI/CD Compliance**
   - Generated code must pass the Azure Pipelines (`azure-pipelines.yml`) and GitHub Actions workflows (`.github/workflows/`) locally.
   - Validate Docker builds: `docker compose up --build`
   - Ensure `.env.example` variables are respected; never commit `.env` files.

4. **File & Code Generation**
   - Create new files only when necessary.
   - Follow the repository structure:
     - Frontend: `frontend/` (Next.js)
     - Backend: `backend/` or `services/`
     - Python: `src/` or `scripts/`
     - Docs: `docs/`
   - Add comments and docstrings where needed.
   - Include basic tests for new functionality.

5. **Branching & PR**
   - Generate code in feature branches.
   - Include a PR description listing commands run to validate code (`lint`, `test`, `build`, `typecheck`).
   - Update `package-lock.json` only if dependencies change.

6. **Optional Tool Features**
   - Use installed tools automatically:
     - Node 18+, npm 9+
     - Python 3.x + pip
     - Docker / docker-compose
     - ESLint, Prettier, Black, Flake8, Jest, Pytest
   - Do not ask for installation or confirmations; assume tools are available.

---

## Step-by-Step Generation Workflow for Copilot

1. Generate file or code.
2. Run linters and formatters:
   - `npm run lint && npm run lint:fix`
   - `npm run format` or `prettier --write .`
   - Python: `black . && flake8 .`
3. Type checking / syntax validation:
   - `npx tsc --noEmit` for TypeScript
4. Run tests:
   - `npm run test` (Jest)
   - `pytest` for Python
5. Security and dependency checks:
   - `npm audit`
   - Scan for `.env` leaks and secrets
6. CI/CD simulation:
   - `docker compose up --build`
   - Validate pipeline scripts and workflows locally
7. Commit only validated files, create PR with description of all validation steps.

---

## Notes for Copilot
- Always prioritize safe, secure, and functional code.
- Never create incomplete or untested files.
- Include inline comments explaining critical sections or potential risks.
- Follow repository structure and naming conventions strictly.
- Confirm nothing manually; validation is automated via installed tools.
