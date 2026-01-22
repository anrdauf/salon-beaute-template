#!/bin/bash
# ============================================================================
# SCRIPT D'INSTALLATION VPS - Générateur de Sites (Docker)
# ============================================================================
# Ce script installe le système de génération de sites de manière isolée
# dans un container Docker pour ne pas affecter les autres services (n8n, etc.)
#
# Usage:
#   curl -sSL https://raw.githubusercontent.com/anrdauf/salon-beaute-template/main/scripts/docker/setup-vps.sh | bash
#   ou
#   ./setup-vps.sh
#
# Prérequis:
#   - Docker et docker-compose installés
#   - Accès root ou sudo
# ============================================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# === VÉRIFICATIONS ===
log "Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    error "Docker n'est pas installé. Installez-le d'abord: https://docs.docker.com/engine/install/"
fi

# Déterminer quelle commande docker-compose utiliser
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
    log "Utilisation de: docker compose (plugin)"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
    log "Utilisation de: docker-compose (standalone)"
else
    warn "docker-compose non trouvé, installation..."
    apt-get update && apt-get install -y docker-compose
    DOCKER_COMPOSE="docker-compose"
fi

log "Docker version: $(docker --version)"

# === CRÉATION DES DOSSIERS ===
INSTALL_DIR="/opt/site-generator"
log "Création du dossier d'installation: $INSTALL_DIR"

sudo mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# === CLONAGE DU REPO ===
log "Clonage du template..."
if [ -d "salon-beaute-template" ]; then
    log "Template existant, mise à jour..."
    cd salon-beaute-template && git pull && cd ..
else
    git clone https://github.com/anrdauf/salon-beaute-template.git
fi

# === COPIE DES FICHIERS DOCKER ===
log "Configuration Docker..."
cp salon-beaute-template/scripts/docker/Dockerfile .
cp salon-beaute-template/scripts/docker/docker-compose.yml .
cp salon-beaute-template/scripts/generate-site.sh .
chmod +x generate-site.sh

# === CONFIGURATION GITHUB TOKEN ===
if [ ! -f ".env" ]; then
    warn "Fichier .env non trouvé."
    echo ""
    echo "Tu dois créer un GitHub Personal Access Token:"
    echo "  1. Va sur https://github.com/settings/tokens"
    echo "  2. Generate new token (classic)"
    echo "  3. Sélectionne le scope 'repo' (full control)"
    echo "  4. Copie le token"
    echo ""
    read -p "Colle ton GITHUB_TOKEN ici: " github_token
    echo "GITHUB_TOKEN=$github_token" > .env
    chmod 600 .env
    log "Token sauvegardé dans .env"
else
    log "Fichier .env existant, conservation..."
fi

# === BUILD DU CONTAINER ===
log "Build du container Docker (peut prendre quelques minutes)..."
$DOCKER_COMPOSE build

# === DÉMARRAGE ===
log "Démarrage du container..."
$DOCKER_COMPOSE up -d

# === AUTHENTIFICATION CLAUDE ===
echo ""
echo "============================================"
echo "  AUTHENTIFICATION CLAUDE CODE REQUISE"
echo "============================================"
echo ""
echo "Exécute cette commande et suis les instructions:"
echo ""
echo "  docker exec -it site-generator claude login"
echo ""
echo "Cela va afficher un lien à ouvrir dans ton navigateur."
echo "Connecte-toi avec ton compte Claude Pro."
echo ""
echo "============================================"
echo ""

# === TEST ===
log "Installation terminée!"
echo ""
echo "Pour tester le système:"
echo "  docker exec site-generator /home/generator/scripts/generate-site.sh '{\"etablissement\":{\"nom\":\"Test\"}}'"
echo ""
echo "Pour voir les logs:"
echo "  docker logs -f site-generator"
echo ""
echo "Pour arrêter:"
echo "  cd $INSTALL_DIR && $DOCKER_COMPOSE down"
echo ""
