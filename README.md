# INTERNET BILLING SYSTEM (ISP)

A modern internet service provider billing system built with Next.js, Express, and Prisma. This system allows ISPs to manage customer subscriptions, handle payments, and provide self-service capabilities to customers.

## Features

- 🔐 Secure Authentication System
- 💳 Integrated Payment Gateway (bKash)
- 📊 Customer Dashboard
- 🎯 Package Management
- 📱 Responsive Design
- 🌙 Dark Mode Support
- 🔄 Real-time Subscription Status
- 📊 Admin Dashboard

## Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Backend**: Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Payment**: bKash Integration
- **Styling**: TailwindCSS, CSS Modules
- **State Management**: TanStack Query
- **Form Handling**: Conform
- **Validation**: Zod
- **Testing**: Vitest
- **Development**: TypeScript, Turbo Repo

## Prerequisites

- Node.js >= 20
- pnpm >= 9.15.3
- PostgreSQL

## Project Structure

```bash
.
├── apps
│ ├── api # Express backend
│ └── web # Next.js frontend
├── packages
│ ├── database # Prisma schema and migrations
│ ├── eslint-config # Shared ESLint configurations
│ ├── tsconfig # Shared TypeScript configurations
│ └── validation # Shared validation schemas
```

## Getting Started

# Create .env files in apps/web and apps/api

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Set up the database:

```bash
pnpm db:push # Push the schema to database
pnpm db:generate # Generate Prisma Client
pnpm db:seed # Seed the database
```

# Run the development server

```bash
pnpm dev
```

## Available Scripts

```bash
- `pnpm dev` - Start development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm db:studio` - Open Prisma Studio


```
