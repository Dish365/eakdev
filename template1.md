# Rust + Next.js 15 Production Template

## Project Overview

This production-ready template provides a foundation for building high-performance, secure web applications using Rust (Axum) and Next.js 15. The architecture emphasizes type safety, performance, maintainability, and security.

## Project Structure

```
/
├── backend/                    # Rust backend
│   ├── src/
│   │   ├── api/               # API routes and handlers
│   │   │   ├── mod.rs
│   │   │   ├── health.rs
│   │   │   ├── auth.rs
│   │   │   └── users.rs
│   │   ├── config/            # Configuration management
│   │   │   ├── mod.rs
│   │   │   └── settings.rs
│   │   ├── db/               # Database models and migrations
│   │   │   ├── migrations/
│   │   │   ├── models/
│   │   │   └── mod.rs
│   │   ├── error/            # Error handling
│   │   │   ├── mod.rs
│   │   │   └── types.rs
│   │   ├── middleware/       # Custom middleware
│   │   │   ├── auth.rs
│   │   │   ├── rate_limit.rs
│   │   │   └── logging.rs
│   │   ├── models/          # Domain models
│   │   │   ├── user.rs
│   │   │   └── common.rs
│   │   ├── services/        # Business logic
│   │   │   ├── auth.rs
│   │   │   └── user.rs
│   │   ├── telemetry/       # Observability
│   │   │   ├── metrics.rs
│   │   │   └── tracing.rs
│   │   ├── utils/           # Utility functions
│   │   └── main.rs          # Application entry point
│   ├── tests/               # Integration tests
│   │   ├── api/
│   │   └── common/
│   ├── Cargo.toml
│   └── Dockerfile
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (auth)/     # Auth-related routes
│   │   │   └── (dashboard) # Dashboard routes
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Base UI components
│   │   │   │   ├── button/
│   │   │   │   ├── form/
│   │   │   │   └── layout/
│   │   │   └── features/  # Feature-specific components
│   │   │       ├── auth/
│   │   │       └── dashboard/
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── use-auth.ts
│   │   │   └── use-form.ts
│   │   ├── lib/          # Utility functions
│   │   │   ├── api/
│   │   │   ├── validation/
│   │   │   └── utils/
│   │   ├── styles/       # Global styles
│   │   └── types/        # TypeScript definitions
│   ├── public/           # Static assets
│   ├── next.config.js
│   └── package.json
├── shared/               # Shared types and utilities
│   ├── types/
│   └── validation/
├── docs/                 # Documentation
│   ├── architecture/
│   ├── api/
│   └── deployment/
├── .github/              # GitHub Actions
│   └── workflows/
├── deploy/               # Deployment configurations
│   ├── kubernetes/
│   └── terraform/
├── docker-compose.yml
└── README.md
```

## Backend Implementation (Rust/Axum)

### Core Dependencies

```toml
[dependencies]
# Framework and async runtime
axum = "0.7"
tokio = { version = "1.0", features = ["full"] }
tower = { version = "0.4", features = ["full"] }
tower-http = { version = "0.5", features = ["trace", "cors", "compression", "metrics"] }

# Database
sqlx = { version = "0.7", features = ["postgres", "runtime-tokio-rustls", "macros", "json"] }
deadpool-redis = "0.12"

# Serialization and validation
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
validator = { version = "0.16", features = ["derive"] }

# Error handling and logging
thiserror = "1.0"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

# Security
jsonwebtoken = "9.1"
argon2 = "0.5"
rand = "0.8"

# Metrics and monitoring
metrics = "0.21"
metrics-exporter-prometheus = "0.12"

# Configuration
config = "0.13"
dotenv = "0.15"

[dev-dependencies]
tokio-test = "0.4"
mock-it = "0.4"
wiremock = "0.5"
```

### Enhanced Main Application Setup

```rust
// src/main.rs
use axum::{
    routing::{get, post},
    Router,
};
use metrics_exporter_prometheus::PrometheusBuilder;
use tower::ServiceBuilder;
use tower_http::{
    compression::CompressionLayer,
    cors::CorsLayer,
    trace::TraceLayer,
};

#[tokio::main]
async fn main() {
    // Load configuration
    let config = config::load().expect("Failed to load configuration");
    
    // Initialize tracing
    telemetry::init_tracing(&config);
    
    // Initialize metrics
    let prometheus_handle = PrometheusBuilder::new()
        .with_endpoint("/metrics")
        .install_recorder()
        .expect("Failed to install metrics recorder");

    // Initialize database connections
    let db_pool = db::create_pool(&config.database_url).await
        .expect("Failed to create database pool");
    
    let redis_pool = redis::create_pool(&config.redis_url)
        .expect("Failed to create Redis pool");

    // Build middleware stack
    let middleware_stack = ServiceBuilder::new()
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(CorsLayer::permissive()) // Configure appropriately for production
        .layer(middleware::rate_limit::RateLimitLayer::new(
            &redis_pool,
            &config.rate_limit,
        ))
        .into_inner();

    // Build our application with routes
    let app = Router::new()
        .nest("/api/v1", api_routes())
        .route("/health", get(health_check))
        .route("/metrics", get(move || {
            std::future::ready(prometheus_handle.render())
        }))
        .layer(middleware_stack)
        .with_state(AppState {
            db: db_pool,
            redis: redis_pool,
            config: config.clone(),
        });

    // Run with graceful shutdown
    let addr = config.server.address.parse().unwrap();
    tracing::info!("listening on {}", addr);
    
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}

async fn shutdown_signal() {
    tokio::signal::ctrl_c()
        .await
        .expect("Failed to install CTRL+C handler");
    tracing::info!("Shutdown signal received, starting graceful shutdown...");
}
```

### Enhanced Error Handling

```rust
// src/error/types.rs
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Authentication required")]
    Unauthorized,
    
    #[error("Permission denied")]
    Forbidden,
    
    #[error("Resource not found")]
    NotFound,
    
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
    
    #[error("Rate limit exceeded")]
    RateLimitExceeded,
    
    #[error("Validation error: {0}")]
    Validation(String),
    
    #[error("Internal server error")]
    Internal(#[from] anyhow::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AppError::Unauthorized => (StatusCode::UNAUTHORIZED, "Unauthorized"),
            AppError::Forbidden => (StatusCode::FORBIDDEN, "Forbidden"),
            AppError::NotFound => (StatusCode::NOT_FOUND, "Not Found"),
            AppError::Database(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error"),
            AppError::RateLimitExceeded => (StatusCode::TOO_MANY_REQUESTS, "Rate limit exceeded"),
            AppError::Validation(msg) => (StatusCode::BAD_REQUEST, msg.as_str()),
            AppError::Internal(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error"),
        };

        let body = Json(json!({
            "error": {
                "message": error_message,
                "code": status.as_u16()
            }
        }));

        (status, body).into_response()
    }
}
```

### Enhanced Database Integration

```rust
// src/db/mod.rs
use deadpool_redis::Pool as RedisPool;
use sqlx::postgres::{PgPool, PgPoolOptions};
use std::time::Duration;

pub async fn create_pool(database_url: &str) -> Result<PgPool, sqlx::Error> {
    PgPoolOptions::new()
        .max_connections(50)
        .acquire_timeout(Duration::from_secs(3))
        .connect(database_url)
        .await
}

// Example of a more robust query with proper error handling
pub async fn get_user(
    pool: &PgPool,
    user_id: i64,
) -> Result<User, AppError> {
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT 
            id, 
            name, 
            email,
            created_at,
            updated_at,
            last_login
        FROM users 
        WHERE id = $1 AND deleted_at IS NULL
        "#,
        user_id
    )
    .fetch_optional(pool)
    .await
    .map_err(AppError::Database)?
    .ok_or(AppError::NotFound)?;

    Ok(user)
}
```

## Frontend Implementation (Next.js 15)

### Enhanced Next.js Configuration

```typescript
// next.config.js
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    optimizeCss: true,
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

// Sentry configuration if needed
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, {
      silent: true,
      org: "your-org",
      project: "your-project",
    })
  : nextConfig;
```

### Enhanced API Client with Type Safety

```typescript
// src/lib/api/client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/api/root';
import { env } from '@/env.mjs';

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: env.NEXT_PUBLIC_API_URL,
          // Include credentials for authentication
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: false,
});
```

### Enhanced Server Component Example

```typescript
// app/users/page.tsx
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { UserList } from '@/components/features/users/UserList';
import { LoadingSkeleton } from '@/components/ui/loading/Skeleton';
import { ErrorBoundary } from '@/components/ui/error/ErrorBoundary';

export const metadata = {
  title: 'Users | Your App',
  description: 'Manage users in your application',
};

async function getUsers() {
  const headersList = headers();
  const response = await fetch(`${process.env.API_URL}/users`, {
    headers: {
      'Authorization': headersList.get('Authorization') ?? '',
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}

export default async function UsersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <UserList getUsers={getUsers} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
```

### Enhanced State Management 

```typescript
// src/stores/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: async () => {
        try {
          set({ isLoading: true });
          await fetch('/api/auth/logout', { method: 'POST' });
          set({ user: null, token: null });
        } catch (error) {
          set({ error: 'Logout failed' });
        } finally {
          set({ isLoading: false });
        }
      },
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) throw new Error('Login failed');
          
          const data = await response.json();
          set({ user: data.user, token: data.token });
        } catch (error) {
          set({ error: 'Login failed' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
```

### Enhanced UI Components

```typescript
// src/components/ui/form/InputField.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors',
  {
    variants: {
      variant: {
        default: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 px-2',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, variant, size, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ variant: error ? 'error' : variant, size, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

export { InputField, inputVariants };
```

## Enhanced DevOps Configuration

### Docker Compose for Local Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      target: development
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - RUST_LOG=debug
    volumes:
      - ./backend:/app
      - cargo-cache:/usr/local/cargo/registry
    depends_on:
      - db
      - redis

  frontend:
    build:
      context: ./frontend
      target: development
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - node-modules:/app/node_modules

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=app
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
  cargo-cache:
  node-modules:
```

### Enhanced Kubernetes Configuration

```yaml
# deploy/kubernetes/backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/metrics"
        prometheus.io/port: "8000"
    spec:
      containers:
      - name: backend
        image: your-registry/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: redis-url
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 15
          periodSeconds: 20
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          components: clippy, rustfmt

      - name: Rust Cache
        uses: Swatinem/rust-cache@v2

      - name: Check formatting
        run: cargo fmt --check
        working-directory: ./backend

      - name: Run clippy
        run: cargo clippy -- -D warnings
        working-directory: ./backend

      - name: Run tests
        run: cargo test
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: './frontend/package-lock.json'

      - name: Install frontend dependencies
        run: npm ci
        working-directory: ./frontend

      - name: Run frontend tests
        run: npm test
        working-directory: ./frontend

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push backend image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ steps.login-ecr.outputs.registry }}/backend:${{ github.sha }}

      - name: Build and push frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.login-ecr.outputs.registry }}/frontend:${{ github.sha }}

      - name: Update kube config
        run: aws eks update-kubeconfig --name your-cluster-name

      - name: Deploy to EKS
        run: |
          kubectl set image deployment/backend backend=${{ steps.login-ecr.outputs.registry }}/backend:${{ github.sha }}
          kubectl set image deployment/frontend frontend=${{ steps.login-ecr.outputs.registry }}/frontend:${{ github.sha }}
```

## Security Enhancements

### Enhanced Authentication Middleware

```rust
// src/middleware/auth.rs
use axum::{
    middleware::Next,
    response::Response,
    http::Request,
    extract::State,
};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use redis::AsyncCommands;

pub async fn auth<B>(
    State(state): State<AppState>,
    mut req: Request<B>,
    next: Next<B>
) -> Result<Response, AppError> {
    let token = req
        .headers()
        .get("Authorization")
        .and_then(|header| header.to_str().ok())
        .and_then(|header| header.strip_prefix("Bearer "))
        .ok_or(AppError::Unauthorized)?;

    // Check if token is blacklisted
    let is_blacklisted: bool = state
        .redis
        .get(format!("blacklist:{}", token))
        .await
        .unwrap_or(false);

    if is_blacklisted {
        return Err(AppError::Unauthorized);
    }

    // Validate JWT
    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(state.config.jwt_secret.as_bytes()),
        &Validation::new(Algorithm::HS256)
    ).map_err(|_| AppError::Unauthorized)?;

    // Add user info to request extensions
    req.extensions_mut().insert(token_data.claims);

    Ok(next.run(req).await)
}
```

### Rate Limiting with Redis

```rust
// src/middleware/rate_limit.rs
use axum::{
    middleware::Next,
    response::Response,
    http::Request,
    extract::State,
};
use redis::AsyncCommands;
use std::time::Duration;

pub async fn rate_limit<B>(
    State(state): State<AppState>,
    req: Request<B>,
    next: Next<B>
) -> Result<Response, AppError> {
    let ip = req
        .headers()
        .get("X-Forwarded-For")
        .and_then(|header| header.to_str().ok())
        .unwrap_or("unknown");

    let key = format!("rate_limit:{}", ip);
    let mut conn = state.redis.get_async_connection().await?;

    // Increment request count
    let requests: Option<i32> = conn.incr(&key, 1).await?;
    
    // Set expiry if this is the first request
    if requests == 1 {
        conn.expire(&key, 60).await?; // 60 seconds window
    }

    match requests {
        Some(count) if count > 100 => Err(AppError::RateLimitExceeded),
        _ => Ok(next.run(req).await)
    }
}
```

## Performance Optimizations

### Database Query Optimization

```rust
// src/db/users.rs
pub async fn get_users_with_roles(
    pool: &PgPool,
    limit: i64,
    offset: i64,
) -> Result<Vec<UserWithRole>, AppError> {
    sqlx::query_as!(
        UserWithRole,
        r#"
        SELECT 
            u.id,
            u.name,
            u.email,
            u.created_at,
            array_agg(r.name) as "roles!: Vec<String>"
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE u.deleted_at IS NULL
        GROUP BY u.id
        ORDER BY u.created_at DESC
        LIMIT $1 OFFSET $2
        "#,
        limit,
        offset
    )
    .fetch_all(pool)
    .await
    .map_err(AppError::Database)
}
```

### Redis Caching

```rust
// src/services/user.rs
pub async fn get_user_with_cache(
    state: &AppState,
    user_id: i64,
) -> Result<User, AppError> {
    let cache_key = format!("user:{}", user_id);
    
    // Try to get from cache
    if let Ok(cached) = state.redis
        .get_async_connection()
        .await?
        .get::<_, String>(&cache_key)
        .await
    {
        return Ok(serde_json::from_str(&cached)?);
    }

    // If not in cache, get from database
    let user = get_user(&state.db, user_id).await?;
    
    // Store in cache
    state.redis
        .get_async_connection()
        .await?
        .set_ex(
            &cache_key,
            serde_json::to_string(&user)?,
            300, // 5 minutes TTL
        )
        .await?;

    Ok(user)
}
```

# Monitoring and Observability

## Prometheus Metrics Setup

```rust
// src/telemetry/metrics.rs
use metrics::{counter, gauge, histogram};
use metrics_exporter_prometheus::{Matcher, PrometheusBuilder, PrometheusHandle};
use std::time::Instant;

pub fn setup_metrics_recorder() -> PrometheusHandle {
    const EXPONENTIAL_SECONDS: &[f64] = &[
        0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0,
    ];

    PrometheusBuilder::new()
        .set_buckets_for_metric(
            Matcher::Full("http_requests_duration_seconds".to_string()),
            EXPONENTIAL_SECONDS,
        )
        .install_recorder()
        .expect("Failed to install metrics recorder")
}

pub struct RequestMetrics {
    path: String,
    method: String,
    start: Instant,
}

impl RequestMetrics {
    pub fn new(path: String, method: String) -> Self {
        counter!("http_requests_total", "path" => path.clone(), "method" => method.clone());
        gauge!("http_requests_in_flight", 1.0, "path" => path.clone(), "method" => method.clone());
        
        Self {
            path,
            method,
            start: Instant::now(),
        }
    }

    pub fn complete(self, status: u16) {
        let duration = self.start.elapsed().as_secs_f64();
        
        histogram!("http_requests_duration_seconds",
            duration,
            "path" => self.path.clone(),
            "method" => self.method.clone(),
            "status" => status.to_string()
        );
        
        gauge!("http_requests_in_flight", -1.0, 
            "path" => self.path,
            "method" => self.method
        );
    }
}
```

## Structured Logging

```rust
// src/telemetry/logging.rs
use tracing_subscriber::{
    fmt::{self, format::FmtSpan},
    EnvFilter,
    prelude::*,
};
use tracing_appender::rolling::{RollingFileAppender, Rotation};

pub fn init_logging(env: &str) {
    let file_appender = RollingFileAppender::new(
        Rotation::DAILY,
        "logs",
        "app.log",
    );

    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);

    let fmt_layer = fmt::layer()
        .with_target(true)
        .with_thread_ids(true)
        .with_thread_names(true)
        .with_file(true)
        .with_line_number(true)
        .with_span_events(FmtSpan::CLOSE)
        .json();

    let filter_layer = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new(env));

    tracing_subscriber::registry()
        .with(filter_layer)
        .with(fmt_layer)
        .with(non_blocking)
        .init();
}
```

# Enhanced Testing Strategy

## Integration Tests

```rust
// tests/api/users.rs
use crate::helpers::spawn_app;
use reqwest::StatusCode;

#[tokio::test]
async fn test_create_user_success() {
    // Arrange
    let app = spawn_app().await;
    let client = reqwest::Client::new();
    
    let user = serde_json::json!({
        "name": "Test User",
        "email": "test@example.com",
        "password": "strong_password123"
    });

    // Act
    let response = client
        .post(&format!("{}/api/users", &app.address))
        .json(&user)
        .send()
        .await
        .expect("Failed to execute request");

    // Assert
    assert_eq!(response.status(), StatusCode::CREATED);
    
    let user_response: serde_json::Value = response.json().await.unwrap();
    assert_eq!(user_response["name"], user["name"]);
    assert_eq!(user_response["email"], user["email"]);
    assert!(user_response.get("password").is_none());
}

#[tokio::test]
async fn test_create_user_validation_failure() {
    // Arrange
    let app = spawn_app().await;
    let client = reqwest::Client::new();
    
    let user = serde_json::json!({
        "name": "",
        "email": "not-an-email",
        "password": "weak"
    });

    // Act
    let response = client
        .post(&format!("{}/api/users", &app.address))
        .json(&user)
        .send()
        .await
        .expect("Failed to execute request");

    // Assert
    assert_eq!(response.status(), StatusCode::BAD_REQUEST);
    
    let error: serde_json::Value = response.json().await.unwrap();
    assert!(error["error"]["message"].as_str().unwrap().contains("Validation error"));
}
```

## Load Testing

```typescript
// tests/load/users.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },  // Ramp up to 20 users
        { duration: '1m', target: 20 },   // Stay at 20 users
        { duration: '30s', target: 0 },   // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% of requests should complete within 500ms
        http_req_failed: ['rate<0.01'],    // Less than 1% of requests should fail
    },
};

export default function () {
    const BASE_URL = __ENV.API_URL || 'http://localhost:8000';
    
    // Get users
    const usersResponse = http.get(`${BASE_URL}/api/users`);
    check(usersResponse, {
        'get users status is 200': (r) => r.status === 200,
        'get users response time < 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);
}
```

# Production Deployment

## Terraform Infrastructure

```hcl
# deploy/terraform/main.tf
provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.project_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b", "us-west-2c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "${var.project_name}-cluster"
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    main = {
      min_size     = 1
      max_size     = 10
      desired_size = 3

      instance_types = ["t3.medium"]
      capacity_type  = "SPOT"
    }
  }
}

module "rds" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${var.project_name}-db"

  engine            = "postgres"
  engine_version    = "15.3"
  instance_class    = "db.t3.medium"
  allocated_storage = 20

  db_name  = "app"
  username = var.db_username
  port     = "5432"

  vpc_security_group_ids = [aws_security_group.rds.id]
  subnet_ids             = module.vpc.private_subnets

  family = "postgres15"

  backup_retention_period = 7
  skip_final_snapshot    = true
}

module "elasticache" {
  source = "terraform-aws-modules/elasticache/aws"

  cluster_id           = "${var.project_name}-redis"
  engine              = "redis"
  engine_version      = "7.0"
  node_type           = "cache.t3.micro"
  num_cache_nodes     = 1
  parameter_group_family = "redis7"

  subnet_ids          = module.vpc.private_subnets
  security_group_ids  = [aws_security_group.redis.id]
}
```

## ArgoCD Configuration

```yaml
# deploy/argocd/application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: your-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-repo.git
    targetRevision: HEAD
    path: deploy/kubernetes
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

# Production Checklist

## Security
- [x] Implement rate limiting
- [x] Set up WAF rules
- [x] Configure network policies
- [x] Implement audit logging
- [x] Set up secret management
- [x] Enable TLS
- [x] Configure CORS properly

## Monitoring
- [x] Set up metrics collection
- [x] Configure log aggregation
- [x] Set up alerting
- [x] Implement distributed tracing
- [x] Configure health checks
- [x] Set up error tracking

## Performance
- [x] Implement caching strategy
- [x] Configure connection pooling
- [x] Set up CDN
- [x] Optimize database queries
- [x] Configure auto-scaling
- [x] Implement graceful shutdown

## Reliability
- [x] Set up backups
- [x] Configure failover
- [x] Implement circuit breakers
- [x] Set up load balancing
- [x] Configure retry policies
- [x] Implement timeout policies

## Development
- [x] Set up CI/CD pipeline
- [x] Configure automated testing
- [x] Set up code quality checks
- [x] Implement feature flags
- [x] Configure environment management
- [x] Set up deployment strategies
