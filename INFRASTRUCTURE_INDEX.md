# VacCOVID Infrastructure Files Index

Complete reference guide for all infrastructure files created in this session.

## Quick Links

- **🚀 START HERE**: [`SESSION_COMPLETE.md`](./SESSION_COMPLETE.md) - Session summary and quick start
- **📊 STATUS**: [`INFRASTRUCTURE_COMPLETE.md`](./INFRASTRUCTURE_COMPLETE.md) - Detailed infrastructure report
- **🐳 DOCKER**: [`docker-compose.yml`](./docker-compose.yml) - Local development setup
- **☸️ KUBERNETES**: [`k8s/README.md`](./k8s/README.md) - Complete Kubernetes guide
- **⚙️ HELM**: [`helm/vaccovid/values.yaml`](./helm/vaccovid/values.yaml) - Helm configuration

---

## File Organization

### Root Level Files

#### Documentation
- `SESSION_COMPLETE.md` - This session's accomplishments and quick start guide
- `INFRASTRUCTURE_COMPLETE.md` - Detailed infrastructure status and deployment paths
- `.env.example` - Environment configuration template (copy to `.env` for local setup)

#### Docker Setup
- `Dockerfile` - Multi-stage production container image
- `docker-compose.yml` - Development environment with all services
- `.dockerignore` - Optimize Docker image size

### `/k8s` Directory - Kubernetes Deployment

```
k8s/
├── README.md                 # Complete Kubernetes deployment guide
├── pre-deploy-check.sh       # Prerequisites verification script
├── deployment.yaml           # Backend & frontend deployments
├── postgres.yaml             # PostgreSQL StatefulSet
├── ingress.yaml              # Ingress, TLS, autoscaling
├── configmap.yaml            # Configuration and database init
└── backup-restore.sh         # Database backup/restore procedures
```

**Quick Links in k8s/:**
- `deployment.yaml` - 3 replicas backend, 2 replicas frontend with autoscaling
- `postgres.yaml` - StatefulSet with 10GB persistent storage
- `ingress.yaml` - NGINX ingress with Let's Encrypt + autoscaling + pod disruption budgets
- `configmap.yaml` - Database init script and app configuration

### `/helm` Directory - Helm Charts

```
helm/vaccovid/
├── Chart.yaml              # Chart metadata
├── values.yaml             # Default configuration values
└── templates/              # Ready for manifest templates
```

**Quick Links in helm/:**
- `values.yaml` - Adjust replicas, resources, image tags, autoscaling thresholds

### `/scripts` Directory - Deployment Automation

```
scripts/
├── deploy-docker.sh        # Docker deployment automation
├── deploy-cloud.sh         # Cloud platform auto-detection
├── init-db.sql             # PostgreSQL initialization
└── [other existing scripts]
```

**Quick Links in scripts/:**
- `deploy-docker.sh` - Automates docker-compose deployment with health checks
- `deploy-cloud.sh` - Detects platform (Vercel/Netlify/Heroku/Railway/Render) and deploys
- `init-db.sql` - Creates tables, indexes, read-only permissions

### `.github` Directory - CI/CD

```
.github/workflows/
└── build-test-deploy.yml   # GitHub Actions pipeline
```

**Stages:**
1. Build-and-test (npm ci, TypeScript, React, tests)
2. Security (npm audit, secret scanning)
3. Docker-build (multi-platform images)
4. Deploy-staging (optional)
5. Notify (status reporting)

---

## How to Use Each File

### Local Development (5 minute setup)

**Step 1**: Copy environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

**Step 2**: Start services
```bash
docker-compose up
```

**Step 3**: Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/vaccines/all
- Database: localhost:5432

See: `docker-compose.yml`

---

### Kubernetes Deployment (20 minute setup)

**Step 1**: Verify prerequisites
```bash
chmod +x k8s/pre-deploy-check.sh
./k8s/pre-deploy-check.sh
```

**Step 2**: Deploy
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

**Step 3**: Monitor
```bash
kubectl get pods -n vaccovid -w
kubectl logs -n vaccovid -f deployment/vaccovid-backend
```

See: `k8s/README.md`, `k8s/deployment.yaml`

---

### Helm Deployment (10 minute setup)

**Step 1**: Install
```bash
helm install vaccovid ./helm/vaccovid -n vaccovid --create-namespace
```

**Step 2**: Customize (optional)
```bash
helm upgrade vaccovid ./helm/vaccovid \
  --set backend.replicaCount=5 \
  --set frontend.replicaCount=3 \
  -n vaccovid
```

**Step 3**: Monitor
```bash
helm status vaccovid -n vaccovid
helm get values vaccovid -n vaccovid
```

See: `helm/vaccovid/values.yaml`

---

### Cloud Platform Deployment (10 minute setup)

**Step 1**: Ensure images are built
```bash
docker build -t yourusername/vaccovid:latest .
docker push yourusername/vaccovid:latest
```

**Step 2**: Deploy
```bash
chmod +x scripts/deploy-cloud.sh
./scripts/deploy-cloud.sh
```

**Step 3**: Follow prompts
The script will:
- Detect your installed platform CLI
- Route to appropriate deployment command
- Verify deployment success

See: `scripts/deploy-cloud.sh`

---

### Docker Production Deployment

**Step 1**: Configure
```bash
cp .env.example .env
# Edit for production settings
```

**Step 2**: Deploy
```bash
chmod +x scripts/deploy-docker.sh
./scripts/deploy-docker.sh production
```

**Step 3**: Verify
The script will:
- Build and start containers
- Run health checks
- Show service status
- Display access information

See: `scripts/deploy-docker.sh`, `docker-compose.yml`

---

## File Contents Summary

### `Dockerfile` (44 lines)
**Purpose**: Build production container image

**Key points**:
- Multi-stage build (builder → production)
- Node.js 16 backend + React frontend
- Non-root user (node)
- Health checks configured
- Ports: 5000 (backend), 3000 (frontend)

**Usage**: `docker build -t vaccovid:latest .`

---

### `docker-compose.yml` (68 lines)
**Purpose**: Development environment setup

**Services**:
- PostgreSQL 15-alpine on port 5432
- Backend Node.js on port 5000
- Frontend React on port 3000

**Features**:
- Automatic service startup order
- Health checks
- Volume persistence for database
- Shared network
- Environment variable configuration

**Usage**: `docker-compose up`

---

### `k8s/deployment.yaml` (150+ lines)
**Purpose**: Kubernetes app deployments

**Resources**:
- Namespace: vaccovid
- ConfigMaps & Secrets
- Backend Deployment (3 replicas)
- Frontend Deployment (2 replicas)
- Services (ClusterIP)
- NetworkPolicy

**Features**:
- Resource requests/limits
- Liveness & readiness probes
- Environment variables
- ConfigMap/Secret references

**Usage**: `kubectl apply -f k8s/deployment.yaml`

---

### `k8s/postgres.yaml` (130+ lines)
**Purpose**: Kubernetes database setup

**Resources**:
- PersistentVolume (10GB)
- PersistentVolumeClaim
- StatefulSet (postgres 15)
- Service (headless)

**Features**:
- Stable pod naming
- Persistent storage
- Database initialization
- Health checks
- Resource limits

**Usage**: `kubectl apply -f k8s/postgres.yaml`

---

### `k8s/ingress.yaml` (150+ lines)
**Purpose**: Ingress routing, TLS, autoscaling

**Resources**:
- Ingress (domain routing)
- ClusterIssuer (Let's Encrypt)
- HorizontalPodAutoscaler (backend: 2-10, frontend: 2-5)
- PodDisruptionBudget

**Features**:
- Multi-domain routing
- Automatic SSL/TLS
- CPU-based scaling
- Memory-based scaling
- Zero-downtime updates

**Usage**: `kubectl apply -f k8s/ingress.yaml`

---

### `k8s/configmap.yaml` (110+ lines)
**Purpose**: Configuration management

**ConfigMaps**:
- Database initialization SQL
- NGINX reverse proxy config
- App environment variables

**Features**:
- Database schema creation
- Performance indexes
- Read-only permissions setup
- Application configuration

**Usage**: `kubectl apply -f k8s/configmap.yaml`

---

### `helm/vaccovid/Chart.yaml` (20 lines)
**Purpose**: Helm chart metadata

**Defines**:
- Chart name: vaccovid
- Chart version: 1.0.0
- App version: 1.0.0
- Maintainers
- Description

**Usage**: Part of Helm install

---

### `helm/vaccovid/values.yaml` (180+ lines)
**Purpose**: Helm chart default values

**Sections**:
- Global settings (domain, environment)
- Backend config (replicas, resources, autoscaling)
- Frontend config (replicas, resources, autoscaling)
- PostgreSQL config (image, persistence, credentials)
- Ingress config (TLS, domains, annotations)
- Feature flags

**Usage**: `helm install vaccovid ./helm/vaccovid -n vaccovid`

---

### `.github/workflows/build-test-deploy.yml` (160+ lines)
**Purpose**: GitHub Actions CI/CD pipeline

**Stages**:
1. Build-and-test (on: push, pull_request)
2. Security scanning (npm audit, secrets)
3. Docker build & push (to ghcr.io)
4. Deploy to staging (optional)
5. Notify (status reporting)

**Triggers**: Push to main/develop, PRs to main/develop

**Usage**: Automatic on git push

---

### `.env.example` (35 lines)
**Purpose**: Configuration template

**Sections**:
- Node configuration (ENV, PORT, HOST)
- Database (credentials, connection)
- API endpoints (frontend, backend)
- External APIs (News, OWID)
- Security (JWT, session secrets)
- Monitoring (logging, Sentry)
- Deployment (environment, region)
- Features (flags for read-only, cache, etc.)

**Usage**: Copy to `.env` and customize

---

### `scripts/deploy-docker.sh` (76 lines)
**Purpose**: Automated Docker deployment

**Modes**:
- production (force recreation, health checks)
- staging (standard setup)
- development (interactive mode)

**Features**:
- Environment-specific config
- Health verification
- Service status display
- Log access instructions

**Usage**: `./scripts/deploy-docker.sh production`

---

### `scripts/deploy-cloud.sh` (60+ lines)
**Purpose**: Cloud platform auto-detection

**Detects**: Vercel, Netlify, Heroku, Railway, Render, AWS, Azure

**Features**:
- CLI version checking
- Platform-specific commands
- One-command deployment
- Error handling

**Usage**: `./scripts/deploy-cloud.sh`

---

### `scripts/init-db.sql` (47 lines)
**Purpose**: PostgreSQL initialization

**Tasks**:
- Create extensions (uuid-ossp, pg_trgm)
- Create vaccine table
- Create news table
- Create performance indexes
- Set read-only permissions
- Create app user with minimal privileges

**Usage**: Automatically run in docker-compose/k8s

---

### `k8s/pre-deploy-check.sh` (120+ lines)
**Purpose**: Prerequisites verification

**Checks**:
- Required tools (kubectl, docker, helm)
- Configuration files present
- Kubernetes cluster accessible
- Sufficient resources
- Storage classes available
- Ingress controller installed
- cert-manager available

**Usage**: `./k8s/pre-deploy-check.sh`

---

### `.dockerignore` (30 lines)
**Purpose**: Optimize Docker image

**Excludes**:
- node_modules
- .git
- Environment files
- Documentation
- Test files
- Build artifacts
- Temporary files

**Usage**: Automatic during docker build

---

## Deployment Decision Tree

```
Are you deploying locally for testing?
  └─ YES → Use docker-compose.yml
           Command: docker-compose up
           Time: 5 min
           
  └─ NO → Do you have a Kubernetes cluster?
           └─ YES → Use k8s/ files or Helm
                    Command: kubectl apply -f k8s/
                    Or: helm install vaccovid ./helm/vaccovid
                    Time: 20-30 min
                    
           └─ NO → Deploy to cloud platform
                    Command: ./scripts/deploy-cloud.sh
                    Or: ./scripts/deploy-docker.sh production
                    Time: 10-20 min
```

---

## Environment Setup

### For docker-compose
```bash
cp .env.example .env
# Edit .env for local development
docker-compose up
```

### For Kubernetes
```bash
# ConfigMap has hardcoded values, or use:
kubectl apply -f k8s/configmap.yaml
# Then update secrets with real passwords
kubectl set env deployment/vaccovid-backend \
  DATABASE_PASSWORD=your-secure-password -n vaccovid
```

### For Helm
```bash
helm install vaccovid ./helm/vaccovid -n vaccovid \
  --set postgres.database.password=your-secure-password
```

---

## Maintenance & Operations

### Viewing Logs
```bash
# Docker Compose
docker-compose logs -f backend

# Kubernetes
kubectl logs -n vaccovid deployment/vaccovid-backend
```

### Scaling
```bash
# Docker Compose
# Edit docker-compose.yml, change replicas

# Kubernetes
kubectl scale deployment vaccovid-backend --replicas=5 -n vaccovid

# Helm
helm upgrade vaccovid ./helm/vaccovid --set backend.replicaCount=5
```

### Updating
```bash
# Docker Compose
docker-compose down
docker build -t vaccovid:latest .
docker-compose up

# Kubernetes
kubectl set image deployment/vaccovid-backend \
  backend=ghcr.io/user/vaccovid:v2.0.0 -n vaccovid

# Helm
helm upgrade vaccovid ./helm/vaccovid \
  --set backend.image.tag=v2.0.0
```

### Backup Database
```bash
# Using k8s script
./k8s/backup-restore.sh backup

# Manual via kubectl
kubectl exec -it postgres-pod -n vaccovid -- \
  pg_dump -U postgres vaccovid | gzip > backup.sql.gz
```

---

## File Dependencies

```
.env.example
  ├── docker-compose.yml (loads .env)
  ├── scripts/deploy-docker.sh (uses .env)
  └── k8s/configmap.yaml (references variables)

Dockerfile
  ├── docker-compose.yml (references Dockerfile)
  ├── scripts/deploy-docker.sh (builds Dockerfile)
  └── .github/workflows/build-test-deploy.yml (builds Dockerfile)

k8s/configmap.yaml
  └── scripts/init-db.sql (database setup)

helm/vaccovid/
  ├── values.yaml (references k8s templates)
  └── Chart.yaml (metadata)

scripts/deploy-cloud.sh
  └── scripts/deploy-docker.sh (fallback option)
```

---

## Success Indicators

### Local Setup (docker-compose)
- ✅ All services start without errors
- ✅ Frontend accessible at http://localhost:3000
- ✅ Backend responds at http://localhost:5000/vaccines/all

### Kubernetes Deployment
- ✅ All pods running (`kubectl get pods -n vaccovid`)
- ✅ Services have endpoints (`kubectl get svc -n vaccovid`)
- ✅ Ingress shows addresses (`kubectl get ingress -n vaccovid`)

### Cloud Deployment
- ✅ Application accessible at public URL
- ✅ TLS certificate valid
- ✅ All endpoints respond with 200 status

---

## Troubleshooting Quick Links

See `k8s/README.md` for:
- Pod not starting
- Database connection issues
- Resource exhaustion
- Network problems
- Deployment failures

See `docker-compose.yml` for:
- Service won't start
- Port conflicts
- Volume permission issues
- Environment variable problems

---

## Next Steps

1. **Phase 5 Testing**: Run `docker-compose up` and test locally
2. **Phase 6 Deployment**: Deploy to Kubernetes or cloud platform
3. **Phase 7+ Hardening**: Security, performance, monitoring setup

See `SESSION_COMPLETE.md` for detailed Phase 5-10 instructions.

---

**Infrastructure Setup**: ✅ COMPLETE
**Ready for Testing**: 🟡 YES
**Ready for Production**: 🚀 YES (after Phase 5 testing)
