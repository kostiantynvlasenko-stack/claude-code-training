# Code Quality Training Repository

WARNING: TRAINING REPOSITORY

This repository contains INTENTIONALLY VULNERABLE code for educational purposes.

DO NOT:
- Use this code in production
- Copy security patterns from this repo
- Use any credentials from this repo (all are fake)

All secrets are prefixed with FAKE_ and are not real credentials.

## What this is
A hands-on monorepo used to train developers on improving code quality using an LLM CLI.
The project contains intentional security issues, style problems, and CI failures.

## Quick start

Requirements:
- Node.js 20+
- pnpm 8+

Setup:
1) Copy env file
   - `cp .env.example .env`
2) Install dependencies
   - `pnpm install`
3) Seed the database
   - `pnpm db:seed`
4) Run the apps
   - `pnpm --filter @training/api dev`
   - `pnpm --filter @training/web dev`

API runs on http://localhost:4000
Web runs on http://localhost:3000

## What is intentionally broken
- Security issues (XSS, SQL injection, path traversal, hardcoded secrets)
- Style problems (tabs vs spaces, inconsistent naming)
- CI pipeline missing lint/test/audit steps
- Incomplete documentation

## Important
This is a training-only repository. Do not deploy it.

