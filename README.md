# Developer Portfolio

A modern, high-performance developer portfolio built with Rust (Axum) and Next.js.

## Project Structure

```
/
├── backend/                # Rust backend
│   ├── src/
│   │   ├── api/           # API routes and handlers
│   │   ├── config/        # Configuration management
│   │   ├── db/           # Database models
│   │   ├── error/        # Error handling
│   │   ├── middleware/   # Performance and caching
│   │   ├── models/       # Portfolio content models
│   │   ├── services/     # Content management
│   │   ├── telemetry/    # Monitoring
│   │   └── utils/        # Helper functions
│   └── Cargo.toml
└── frontend/             # Next.js frontend
    ├── src/
    │   ├── app/          # Portfolio pages
    │   ├── components/
    │   │   ├── ui/       # Reusable UI components
    │   │   └── features/ # Portfolio sections
    │   ├── hooks/        # Custom React hooks
    │   ├── lib/          # Utilities
    │   ├── styles/       # Global styles
    │   └── types/        # TypeScript definitions
    └── package.json
```

## Getting Started

### Backend Setup

1. Install Rust and Cargo
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies and run:
   ```bash
   cargo build
   cargo run
   ```

### Frontend Setup

1. Install Node.js (v18 or later)
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies and run using one of these options:

   Using pnpm (recommended):
   ```bash
   # Install pnpm if you haven't already
   iwr https://get.pnpm.io/install.ps1 -useb | iex
   
   # Install dependencies and run
   pnpm install
   pnpm dev
   ```

   Using yarn:
   ```bash
   # Install yarn if you haven't already
   npm install -g yarn
   
   # Install dependencies and run
   yarn
   yarn dev
   ```

   Using npm:
   ```bash
   npm install
   npm run dev
   ```

## Development

- Backend runs on: http://localhost:8000
- Frontend runs on: http://localhost:3000

## Features

- Modern, responsive design
- Server-side rendering with Next.js
- High-performance Rust backend
- Portfolio project showcase
- Blog/Articles section
- Contact form
- SEO optimization
- Analytics integration

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - TypeScript
  - TailwindCSS

- **Backend:**
  - Rust
  - Axum framework
  - PostgreSQL
  - SQLx

## License

MIT 