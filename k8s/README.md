# Kubernetes Deployment Guide for VacCOVID

This guide explains how to deploy VacCOVID to a Kubernetes cluster.

## Prerequisites

### Required Tools
- `kubectl` v1.25+ (Kubernetes CLI)
- Docker (for building images)
- Access to a Kubernetes cluster (v1.25+)
- `helm` v3.0+ (optional, for advanced deployments)
- Container registry access (Docker Hub, GHCR, ECR, etc.)

### Cluster Requirements
- Minimum 2 worker nodes with 2 CPUs and 2GB RAM each
- Storage class configured (for persistent volumes)
- Ingress controller installed (nginx-ingress recommended)
- cert-manager installed (for SSL/TLS certificates)

### Install Required Tools

```bash
# macOS (using Homebrew)
brew install kubectl helm

# Linux
sudo apt-get install kubectl helm

# Verify installations
kubectl version --client
helm version
```

### Setup Cluster Access

```bash
# Configure kubectl to connect to your cluster
# This depends on your cluster provider:

# For AWS EKS
aws eks update-kubeconfig --region us-east-1 --name vaccovid-cluster

# For Azure AKS
az aks get-credentials --resource-group vaccovid-rg --name vaccovid-cluster

# For Google GKE
gcloud container clusters get-credentials vaccovid-cluster --zone us-central1-a

# For local/self-managed clusters
# Copy your kubeconfig file or use context command
kubectl config use-context your-cluster-context

# Verify cluster access
kubectl cluster-info
kubectl get nodes
```

## Quick Start: Deploy to Kubernetes

### 1. Prepare Your Images

Before deploying, ensure your Docker images are built and pushed to a registry:

```bash
# Build images locally
docker build -t vaccovid:latest .

# Tag for registry (example: GHCR)
docker tag vaccovid:latest ghcr.io/yourusername/vaccovid:latest

# Login to registry
docker login ghcr.io

# Push to registry
docker push ghcr.io/yourusername/vaccovid:latest
```

### 2. Update Configuration

Edit the files with your specific values:

```bash
# Update image references in deployment.yaml
sed -i 's/yourusername/your-actual-username/g' k8s/deployment.yaml
sed -i 's/yourusername/your-actual-username/g' k8s/postgres.yaml

# Update secrets in configmap.yaml
# Replace placeholder values with secure values
vim k8s/configmap.yaml
```

### 3. Create Namespace and Deploy

```bash
# Create namespace
kubectl create namespace vaccovid

# Deploy ConfigMaps and Secrets
kubectl apply -f k8s/configmap.yaml

# Deploy PostgreSQL
kubectl apply -f k8s/postgres.yaml

# Wait for PostgreSQL to be ready
kubectl wait --for=condition=Ready pod \
  -l app=vaccovid,component=postgres \
  -n vaccovid \
  --timeout=300s

# Deploy backend and frontend
kubectl apply -f k8s/deployment.yaml

# Deploy Ingress
kubectl apply -f k8s/ingress.yaml

# Verify deployments
kubectl get deployments -n vaccovid
kubectl get services -n vaccovid
kubectl get pods -n vaccovid
```

### 4. Verify Deployment

```bash
# Check pod status
kubectl get pods -n vaccovid -w

# Check service endpoints
kubectl get svc -n vaccovid

# Get Ingress IP/hostname
kubectl get ingress -n vaccovid

# Check logs
kubectl logs -n vaccovid -l app=vaccovid,component=backend
kubectl logs -n vaccovid -l app=vaccovid,component=frontend

# Test backend health
kubectl exec -it pod/vaccovid-backend-0 -n vaccovid -- \
  wget -q -O- http://localhost:5000/vaccines/all
```

## File Structure

```
k8s/
├── deployment.yaml      # Backend & frontend deployments
├── postgres.yaml        # PostgreSQL StatefulSet & PV
├── ingress.yaml         # Ingress rules & TLS config
├── configmap.yaml       # Configuration and database init scripts
└── README.md            # This file
```

## Configuration Files Explained

### deployment.yaml
- **Namespace**: vaccovid (isolated environment)
- **Backend Deployment**:
  - 3 replicas for high availability
  - Health checks (liveness & readiness probes)
  - Resource requests: 256Mi memory, 250m CPU
  - Resource limits: 512Mi memory, 500m CPU
- **Frontend Deployment**:
  - 2 replicas
  - Similar health checks and resource constraints

### postgres.yaml
- **StatefulSet**: Ensures stable pod names and persistent storage
- **PersistentVolumeClaim**: 10GB storage for database
- **Probes**: PostgreSQL readiness checks
- **Security**: Database initialized with read-only user

### ingress.yaml
- **Ingress Controller**: nginx-ingress class
- **SSL/TLS**: Let's Encrypt integration via cert-manager
- **Routing**:
  - `vaccovid.app` → Frontend
  - `api.vaccovid.app` → Backend
- **Auto-scaling**: HPA for backend (2-10 replicas) and frontend (2-5 replicas)
- **Pod Disruption Budgets**: Ensures minimum availability during updates

### configmap.yaml
- **Database Init Script**: PostgreSQL schema creation and permissions
- **NGINX Config**: Reverse proxy configuration (optional)
- **App Config**: Environment variables for all services

## Common Tasks

### View Logs

```bash
# Backend logs
kubectl logs -n vaccovid -f deployment/vaccovid-backend --tail=100

# Frontend logs
kubectl logs -n vaccovid -f deployment/vaccovid-frontend --tail=100

# PostgreSQL logs
kubectl logs -n vaccovid -f statefulset/vaccovid-postgres --tail=100

# All logs for app
kubectl logs -n vaccovid -f -l app=vaccovid --tail=100
```

### Scale Deployments

```bash
# Scale backend (HPA will override manual scaling)
kubectl scale deployment/vaccovid-backend -n vaccovid --replicas=5

# Scale frontend
kubectl scale deployment/vaccovid-frontend -n vaccovid --replicas=3
```

### Update Image

```bash
# Update backend image
kubectl set image deployment/vaccovid-backend \
  backend=ghcr.io/yourusername/vaccovid:v1.2.3 \
  -n vaccovid

# Monitor rollout
kubectl rollout status deployment/vaccovid-backend -n vaccovid

# Check rollout history
kubectl rollout history deployment/vaccovid-backend -n vaccovid

# Rollback if needed
kubectl rollout undo deployment/vaccovid-backend -n vaccovid
```

### Access Database

```bash
# Get PostgreSQL pod name
POSTGRES_POD=$(kubectl get pod -n vaccovid \
  -l app=vaccovid,component=postgres \
  -o jsonpath='{.items[0].metadata.name}')

# Connect to PostgreSQL
kubectl exec -it $POSTGRES_POD -n vaccovid -- \
  psql -U postgres -d vaccovid

# Run query from pod
kubectl exec -it $POSTGRES_POD -n vaccovid -- \
  psql -U postgres -d vaccovid \
  -c "SELECT COUNT(*) FROM vaccine;"
```

### Port Forward

```bash
# Forward backend to localhost
kubectl port-forward -n vaccovid svc/vaccovid-backend 5000:5000

# Forward frontend to localhost
kubectl port-forward -n vaccovid svc/vaccovid-frontend 3000:3000

# Forward PostgreSQL to localhost
kubectl port-forward -n vaccovid svc/vaccovid-postgres 5432:5432

# Now access from localhost:5000, localhost:3000, etc.
```

### Debug Pod

```bash
# Describe pod for events and conditions
kubectl describe pod pod-name -n vaccovid

# Get shell access to pod
kubectl exec -it pod-name -n vaccovid -- /bin/sh

# Check pod resource usage
kubectl top pod -n vaccovid
```

## Monitoring and Observability

### Check Resource Usage

```bash
# Pod resource usage
kubectl top pods -n vaccovid

# Node resource usage
kubectl top nodes

# Detailed metrics
kubectl describe node node-name
```

### Setup Prometheus (Optional)

```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/prometheus \
  --namespace vaccovid \
  --create-namespace
```

### Setup Grafana (Optional)

```bash
# Add Grafana Helm repo
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana \
  --namespace vaccovid \
  --create-namespace

# Get Grafana admin password
kubectl get secret -n vaccovid grafana \
  -o jsonpath="{.data.admin-password}" | base64 --decode

# Port forward to access Grafana
kubectl port-forward -n vaccovid svc/grafana 3000:80
```

## Security Best Practices

### RBAC (Role-Based Access Control)

```bash
# Create limited service account
kubectl create serviceaccount vaccovid-app -n vaccovid

# Create role with minimal permissions
kubectl create role vaccovid-reader \
  --verb=get,list \
  --resource=pods,services \
  -n vaccovid

# Bind role to service account
kubectl create rolebinding vaccovid-app-reader \
  --role=vaccovid-reader \
  --serviceaccount=vaccovid:vaccovid-app \
  -n vaccovid
```

### Network Policies

NetworkPolicy is already defined in deployment.yaml:
- Ingress: Accept traffic from pods in vaccovid namespace
- Egress: Allow outbound traffic to all destinations

### Resource Quotas

```bash
# Create resource quota
kubectl create quota vaccovid-quota \
  --hard=requests.cpu=10,requests.memory=20Gi,limits.cpu=20,limits.memory=40Gi \
  -n vaccovid

# View quota usage
kubectl describe quota -n vaccovid
```

## Troubleshooting

### Pod Not Starting

```bash
# Check pod events and errors
kubectl describe pod pod-name -n vaccovid

# Check logs
kubectl logs pod-name -n vaccovid

# Check resource availability
kubectl describe nodes | grep -A 5 "Allocated resources"
```

### Database Connection Issues

```bash
# Test PostgreSQL connectivity
kubectl run -it --rm debug --image=postgres:15-alpine \
  --restart=Never -- psql -h vaccovid-postgres.vaccovid.svc.cluster.local \
  -U postgres -d vaccovid -c "SELECT 1;"

# Check PostgreSQL logs
kubectl logs -n vaccovid statefulset/vaccovid-postgres

# Verify environment variables
kubectl exec -it pod/vaccovid-backend-0 -n vaccovid -- \
  env | grep DATABASE
```

### High CPU/Memory Usage

```bash
# Identify resource hogs
kubectl top pods -n vaccovid --sort-by=memory

# Check limits
kubectl get resources -n vaccovid

# Adjust resource limits in deployment
kubectl set resources deployment vaccovid-backend \
  --limits=cpu=1,memory=1Gi \
  --requests=cpu=500m,memory=512Mi \
  -n vaccovid
```

## Cleanup

```bash
# Delete everything in namespace
kubectl delete namespace vaccovid

# Delete specific resources
kubectl delete -f k8s/deployment.yaml -n vaccovid
kubectl delete -f k8s/postgres.yaml -n vaccovid
kubectl delete -f k8s/ingress.yaml -n vaccovid

# Verify deletion
kubectl get all -n vaccovid
```

## Production Recommendations

### 1. Certificate Management
- Use cert-manager for automatic SSL/TLS renewal
- Configure your domain DNS to point to Ingress IP
- Monitor certificate expiration

### 2. Database Backups
```bash
# Create backup
kubectl exec -n vaccovid statefulset/vaccovid-postgres -- \
  pg_dump -U postgres vaccovid | gzip > backup-$(date +%Y%m%d).sql.gz

# Restore from backup
cat backup-20240101.sql.gz | gunzip | \
  kubectl exec -i -n vaccovid statefulset/vaccovid-postgres -- \
  psql -U postgres vaccovid
```

### 3. Persistent Backups
- Use Kubernetes backup solutions (Velero, Kasten K10)
- Configure automated daily backups
- Test restore procedures regularly

### 4. Monitoring and Alerting
- Install Prometheus and Grafana
- Set up alerts for pod restarts, high resource usage
- Monitor database replication lag
- Track application response times

### 5. High Availability
- Multiple replicas for backend and frontend (already configured)
- Database replication (consider PostgreSQL streaming replication)
- Load balancing (handled by Kubernetes service)
- Cross-zone deployment for cluster resilience

### 6. Updates and Patches
```bash
# Rolling update with zero downtime
kubectl set image deployment/vaccovid-backend \
  backend=ghcr.io/yourusername/vaccovid:v2.0.0 \
  -n vaccovid --record

# Monitor rollout
kubectl rollout status deployment/vaccovid-backend -n vaccovid

# Automatic rollback on failure
kubectl rollout undo deployment/vaccovid-backend -n vaccovid
```

## Advanced: Helm Deployment

For easier management, convert to Helm chart:

```bash
# Create Helm chart structure
helm create vaccovid-chart

# Copy k8s files to templates directory
cp k8s/*.yaml vaccovid-chart/templates/

# Deploy using Helm
helm install vaccovid ./vaccovid-chart -n vaccovid

# Upgrade
helm upgrade vaccovid ./vaccovid-chart -n vaccovid

# Uninstall
helm uninstall vaccovid -n vaccovid
```

## Next Steps

1. **Local Testing**: Use `kind` or `minikube` to test locally
2. **CI/CD Integration**: Add Kubernetes deployment to GitHub Actions
3. **Multi-Cluster**: Deploy across multiple regions/clusters
4. **Service Mesh**: Consider Istio for advanced traffic management
5. **Serverless Options**: Evaluate Knative for auto-scaling

## Support

For issues or questions:
- Check Kubernetes logs: `kubectl logs -n vaccovid`
- Describe resources: `kubectl describe pod pod-name -n vaccovid`
- Check events: `kubectl get events -n vaccovid --sort-by='.lastTimestamp'`
- Review application documentation in `/docs`
