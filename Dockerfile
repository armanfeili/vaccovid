# Multi-stage build for VacCOVID application
# Stage 1: Build backend
FROM node:16-alpine AS backend-builder

WORKDIR /app

# Copy backend source
COPY app ./app
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies and build
RUN npm ci
RUN npx tsc --project tsconfig.json --skipLibCheck

# Stage 2: Build frontend
FROM node:16-alpine AS frontend-builder

WORKDIR /app

# Copy frontend
COPY client ./client
COPY package.json ./

# Install and build frontend
RUN cd client && npm ci && npm run build

# Stage 3: Production runtime
FROM node:16-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built backend from builder
COPY --from=backend-builder /app/build ./build
COPY --from=backend-builder /app/app/src/config ./app/src/config
COPY --from=backend-builder /app/app/src/db ./app/src/db

# Copy built frontend
COPY --from=frontend-builder /app/client/build ./client/build

# Copy configuration files
COPY ormconfig.json ./
COPY setupProxy.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Expose ports
EXPOSE 5000 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/vaccines/all', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "build/index.js"]
