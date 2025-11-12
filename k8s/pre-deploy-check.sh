#!/bin/bash

# VacCOVID Kubernetes Deployment Checklist
# This script helps verify all prerequisites before deploying to Kubernetes

set -e

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}=== VacCOVID Kubernetes Deployment Checklist ===${NC}\n"

# Track results
PASSED=0
FAILED=0
WARNINGS=0

check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        ((FAILED++))
        return 1
    fi
}

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 NOT found"
        ((FAILED++))
        return 1
    fi
}

check_k8s_access() {
    if kubectl cluster-info &> /dev/null; then
        echo -e "${GREEN}✓${NC} Kubernetes cluster is accessible"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} Cannot access Kubernetes cluster"
        ((FAILED++))
        return 1
    fi
}

check_k8s_version() {
    VERSION=$(kubectl version --client -o json 2>/dev/null | grep -o '"gitVersion":"[^"]*' | cut -d'"' -f4 | cut -dv -f2)
    MAJOR=$(echo $VERSION | cut -d. -f1)
    MINOR=$(echo $VERSION | cut -d. -f2)
    
    if [ "$MAJOR" -ge 1 ] && [ "$MINOR" -ge 25 ]; then
        echo -e "${GREEN}✓${NC} Kubernetes version is v$VERSION (v1.25+)"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Kubernetes version is v$VERSION (recommended v1.25+)"
        ((WARNINGS++))
        return 1
    fi
}

check_namespace() {
    if kubectl get namespace vaccovid &> /dev/null; then
        echo -e "${YELLOW}⚠${NC} Namespace 'vaccovid' already exists"
        ((WARNINGS++))
        return 0
    else
        echo -e "${GREEN}✓${NC} Namespace 'vaccovid' is available"
        ((PASSED++))
        return 0
    fi
}

check_storage_class() {
    if kubectl get storageclass &> /dev/null; then
        echo -e "${GREEN}✓${NC} Storage classes are available"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} No storage classes found"
        ((FAILED++))
        return 1
    fi
}

check_ingress_controller() {
    if kubectl get ingressclass nginx &> /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} NGINX ingress controller found"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} NGINX ingress controller not found (required for Ingress)"
        ((WARNINGS++))
        return 1
    fi
}

check_cert_manager() {
    if kubectl get customresourcedefinition certificates.cert-manager.io &> /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} cert-manager is installed"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} cert-manager is not installed (recommended for TLS)"
        ((WARNINGS++))
        return 1
    fi
}

check_node_resources() {
    AVAILABLE_CPU=$(kubectl describe nodes | grep "Allocated resources" -A 2 | grep "cpu" | awk '{print $2}' | sed 's/[a-z]*//g' | awk '{sum+=$1} END {print sum}')
    AVAILABLE_MEMORY=$(kubectl describe nodes | grep "Allocated resources" -A 2 | grep "memory" | awk '{print $2}' | sed 's/[A-Za-z]*//g' | awk '{sum+=$1} END {print sum}')
    
    if [ "$AVAILABLE_CPU" -ge 2 ] && [ "$AVAILABLE_MEMORY" -ge 2048 ]; then
        echo -e "${GREEN}✓${NC} Sufficient resources available (CPU: ${AVAILABLE_CPU}m, Memory: ${AVAILABLE_MEMORY}Mi)"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Limited resources (CPU: ${AVAILABLE_CPU}m, Memory: ${AVAILABLE_MEMORY}Mi)"
        ((WARNINGS++))
        return 1
    fi
}

check_docker_config() {
    if [ -f ~/.docker/config.json ]; then
        echo -e "${GREEN}✓${NC} Docker credentials configured"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Docker credentials not configured (may need for private registries)"
        ((WARNINGS++))
        return 1
    fi
}

echo -e "${BOLD}Required Tools:${NC}"
check_command kubectl
check_command docker
check_command helm

echo -e "\n${BOLD}Configuration Files:${NC}"
check_file "k8s/deployment.yaml"
check_file "k8s/postgres.yaml"
check_file "k8s/ingress.yaml"
check_file "k8s/configmap.yaml"

echo -e "\n${BOLD}Kubernetes Cluster:${NC}"
check_k8s_access
check_k8s_version
check_namespace
check_storage_class
check_ingress_controller
check_cert_manager
check_node_resources

echo -e "\n${BOLD}Registry & Authentication:${NC}"
check_docker_config

echo -e "\n${BOLD}=== Summary ===${NC}"
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"

if [ $FAILED -gt 0 ]; then
    echo -e "\n${RED}❌ Deployment blockers detected. Please fix the issues above.${NC}"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "\n${YELLOW}⚠️  Warnings detected. Deployment may proceed but some features might be limited.${NC}"
    echo -e "\n${BOLD}To install missing components:${NC}"
    echo "• NGINX Ingress: helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && helm install nginx-ingress ingress-nginx/ingress-nginx"
    echo "• cert-manager: helm repo add jetstack https://charts.jetstack.io && helm install cert-manager jetstack/cert-manager"
    exit 0
else
    echo -e "\n${GREEN}✅ All checks passed! Ready to deploy.${NC}"
    exit 0
fi
