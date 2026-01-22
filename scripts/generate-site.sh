#!/bin/bash
# ============================================================================
# SCRIPT DE GÉNÉRATION DE SITE SPA/BEAUTÉ
# ============================================================================
# Ce script est appelé par n8n pour générer un site personnalisé.
# Il utilise Claude Code (abo Pro) pour personnaliser le site-config.ts
#
# Usage:
#   ./generate-site.sh '<JSON_INPUT>' [CALLBACK_URL]
#
# JSON_INPUT structure:
#   {
#     "etablissement": {
#       "nom": "Nom de l'établissement",
#       "slug": "nom-etablissement",
#       "site_web": "https://site.fr",
#       "repo_github": "user/repo"
#     },
#     "avis_google": [...],
#     "stats": {...}
#   }
#
# Prérequis:
#   - Claude Code installé et authentifié (claude login)
#   - Template disponible (local ou dans /opt/templates/)
#   - jq installé pour parser le JSON
#   - Authentification GitHub: soit SSH (clé sans passphrase), soit GITHUB_TOKEN
#
# Variables d'environnement optionnelles:
#   GITHUB_TOKEN: Personal Access Token GitHub (si défini, utilise HTTPS au lieu de SSH)
# ============================================================================

set -e

# === PARAMÈTRES ===
JSON_INPUT="$1"
CALLBACK_URL="$2"

# === PARSER LE JSON ===
if [ -z "$JSON_INPUT" ]; then
    echo "Erreur: JSON_INPUT requis en premier argument"
    echo "Usage: $0 '<JSON>' [CALLBACK_URL]"
    exit 1
fi

# Extraire les champs du JSON avec jq
NOM_ETABLISSEMENT=$(echo "$JSON_INPUT" | jq -r '.etablissement.nom // empty')
SITE_URL=$(echo "$JSON_INPUT" | jq -r '.etablissement.site_web // empty')
GITHUB_REPO=$(echo "$JSON_INPUT" | jq -r '.etablissement.repo_github // empty')
SLUG=$(echo "$JSON_INPUT" | jq -r '.etablissement.slug // empty')
AVIS_JSON=$(echo "$JSON_INPUT" | jq -c '.avis_google // []')

# === CONFIGURATION ===
# Détecter si on est en local (macOS) ou sur VPS (Linux)
if [ -d "/opt/templates/salon-beaute" ]; then
    TEMPLATE_DIR="/opt/templates/salon-beaute"
elif [ -d "$HOME/Developer/salon-beaute-template" ]; then
    TEMPLATE_DIR="$HOME/Developer/salon-beaute-template"
else
    TEMPLATE_DIR="$(pwd)"
fi
PROJECT_DIR="/tmp/sites/site-$SLUG"
SCRAPED_DIR="/tmp/scraped-$SLUG"
LOG_FILE="/tmp/generate-$SLUG.log"

echo "Template dir: $TEMPLATE_DIR"

# === COULEURS POUR LES LOGS ===
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARNING:${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ERROR:${NC} $1"
}

# === FONCTION DE NOTIFICATION N8N ===
notify_n8n() {
    local status="$1"
    local message="$2"
    local site_url="$3"

    if [ -n "$CALLBACK_URL" ]; then
        curl -s -X POST "$CALLBACK_URL" \
            -H "Content-Type: application/json" \
            -d "{
                \"status\": \"$status\",
                \"message\": \"$message\",
                \"site_url\": \"$site_url\",
                \"repo\": \"$GITHUB_REPO\",
                \"nom\": \"$NOM_ETABLISSEMENT\",
                \"timestamp\": \"$(date -Iseconds)\"
            }" || log_warn "Impossible de notifier n8n"
    fi
}

# === GESTION DES ERREURS ===
cleanup_on_error() {
    log_error "Une erreur s'est produite. Nettoyage..."
    rm -rf "$SCRAPED_DIR" 2>/dev/null || true
    rm -rf "$PROJECT_DIR" 2>/dev/null || true
    notify_n8n "error" "Erreur lors de la génération: $1" ""
    exit 1
}

trap 'cleanup_on_error "Erreur inattendue à la ligne $LINENO"' ERR

# === VALIDATION DES PARAMÈTRES ===
log "=== Génération du site ==="
log "Établissement: $NOM_ETABLISSEMENT"
log "Source: $SITE_URL"
log "Slug: $SLUG"
log "Repo: $GITHUB_REPO"

if [ -z "$NOM_ETABLISSEMENT" ] || [ -z "$GITHUB_REPO" ] || [ -z "$SLUG" ]; then
    cleanup_on_error "Paramètres manquants (nom, repo ou slug)"
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
    cleanup_on_error "Template non trouvé: $TEMPLATE_DIR"
fi

# === ÉTAPE 1: SCRAPER LE SITE EXISTANT ===
log "1/6 - Scraping du site existant..."
rm -rf "$SCRAPED_DIR"
mkdir -p "$SCRAPED_DIR"

if [ -n "$SITE_URL" ]; then
    # Vérifier si un sitemap existe
    SITEMAP_URL="$SITE_URL/sitemap.xml"
    if curl -s --head "$SITEMAP_URL" | grep -q "200 OK"; then
        log "  Sitemap trouvé, extraction des URLs..."
        URLS=$(curl -s "$SITEMAP_URL" | grep -oP '(?<=<loc>)[^<]+' | head -20)
    else
        log "  Pas de sitemap, utilisation de l'URL principale"
        URLS="$SITE_URL"
    fi

    # Scraper chaque URL
    COUNT=0
    for URL in $URLS; do
        if [ $COUNT -ge 20 ]; then break; fi

        FILENAME=$(echo "$URL" | sed 's|https\?://||' | sed 's|/|_|g' | sed 's|[^a-zA-Z0-9_.-]||g')
        log "  Scraping: $URL"

        # Récupérer HTML et extraire le texte (supprimer scripts, styles, balises)
        curl -s -L --max-time 30 "$URL" 2>/dev/null | \
            sed 's/<script[^>]*>.*<\/script>//g' | \
            sed 's/<style[^>]*>.*<\/style>//g' | \
            sed 's/<[^>]*>//g' | \
            sed 's/&nbsp;/ /g' | \
            sed 's/&amp;/\&/g' | \
            sed 's/&lt;/</g' | \
            sed 's/&gt;/>/g' | \
            tr -s '[:space:]' ' ' > "$SCRAPED_DIR/$FILENAME.txt" || true

        COUNT=$((COUNT + 1))
    done

    # Combiner tout le contenu scrapé
    log "  Combinaison du contenu..."
    cat "$SCRAPED_DIR"/*.txt 2>/dev/null > "$SCRAPED_DIR/all_content.txt" || echo "" > "$SCRAPED_DIR/all_content.txt"
else
    log_warn "Pas d'URL de site fournie, skip du scraping"
    echo "" > "$SCRAPED_DIR/all_content.txt"
fi

# === ÉTAPE 2: COPIER LE TEMPLATE ===
log "2/6 - Copie du template..."
rm -rf "$PROJECT_DIR"
mkdir -p /tmp/sites
cp -r "$TEMPLATE_DIR" "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Nettoyer git existant et réinitialiser
rm -rf .git
git init -b main

# Configurer le remote (HTTPS avec token si GITHUB_TOKEN est défini, sinon SSH)
if [ -n "$GITHUB_TOKEN" ]; then
    log "  Utilisation de HTTPS avec token GitHub"
    git remote add origin "https://$GITHUB_TOKEN@github.com/$GITHUB_REPO.git"
else
    log "  Utilisation de SSH pour GitHub"
    git remote add origin "git@github.com:$GITHUB_REPO.git"
fi

# Copier les données pour Claude
cp "$SCRAPED_DIR/all_content.txt" "$PROJECT_DIR/_scraped_content.txt"

# === ÉTAPE 3: CRÉER LES INSTRUCTIONS POUR CLAUDE ===
log "3/6 - Préparation des instructions Claude..."

cat > "$PROJECT_DIR/_INSTRUCTIONS.md" << 'INSTRUCTIONS_EOF'
# MISSION: Personnaliser ce site spa/beauté

Tu es dans un projet Next.js de template spa/beauté.
Tu dois modifier UNIQUEMENT le fichier `lib/site-config.ts` avec les données du client.

## SOURCES DE DONNÉES

1. **Contenu scrapé** : Lis `_scraped_content.txt` - contenu textuel du site existant
2. **Avis Google** : Lis `_avis_google.json` - JSON avec les avis clients
3. **Nom établissement** : Fourni dans le prompt

## CE QUE TU DOIS FAIRE

1. **Lis** `lib/site-config.ts` pour comprendre la structure exacte
2. **Analyse** le contenu scrapé pour extraire :
   - Nom de l'établissement
   - Nom du propriétaire/praticien
   - Téléphone (format: 06 XX XX XX XX)
   - Email
   - Adresse complète (rue, ville, code postal)
   - Services proposés (nom, description, durée, prix)
   - Horaires d'ouverture
   - Liens réseaux sociaux
3. **Utilise** les avis Google (5 meilleurs, les plus longs et positifs)
4. **Génère** des textes marketing de qualité :
   - tagline accrocheur (5-10 mots)
   - hero.title: UNE seule ligne courte avec "&" (ex: "Bien-être & Sérénité")
   - hero.description (1-2 phrases)
   - descriptions des services enrichies
   - about.description (présentation du praticien)
5. **Modifie** `lib/site-config.ts` avec TOUTES ces données

## RÈGLES STRICTES

- NE CRÉE PAS de nouveaux fichiers
- MODIFIE UNIQUEMENT `lib/site-config.ts`
- GARDE la structure TypeScript existante (types, interfaces)
- UTILISE des valeurs réalistes extraites du contenu
- SI une info n'est pas trouvée, utilise une valeur par défaut sensée
- Les textes doivent être en FRANÇAIS
- Les images: garde les URLs existantes ou utilise des placeholders Unsplash

## RÈGLES DE FORMAT OBLIGATOIRES

### Hero Headline (hero.title)
- Format OBLIGATOIRE: tableau avec UNE SEULE ligne courte avec "&"
- Exemple: `["Bien-être & Sérénité"]` ou `["Détente & Harmonie"]`
- Maximum 2-4 mots au total
- Utilise le symbole "&" (esperluette)
- PAS de tableau multi-lignes, UNE SEULE entrée

### Services
- Garde TOUS les services trouvés (pas de limite)
- Le layout gère automatiquement l'affichage

### Benefits (Bienfaits)
- EXACTEMENT 4 bienfaits, pas plus, pas moins
- Titres courts (2-3 mots max)
- Icônes disponibles: "Brain", "Moon", "Zap", "Heart"

### Image du praticien (ownerImage)
- Si aucune image réelle n'est trouvée dans le contenu scrapé, utiliser:
  `https://www.les-soins-infirmiers.fr/avatar-femme/`

## VALIDATION

Après modification, le fichier doit :
- Compiler sans erreur TypeScript
- Avoir TOUTES les propriétés remplies
- Avoir au moins 3 services
- Avoir EXACTEMENT 4 benefits
- Avoir au moins 3 avis
INSTRUCTIONS_EOF

# Sauvegarder les avis Google (JSON depuis n8n)
if [ -n "$AVIS_JSON" ]; then
    echo "$AVIS_JSON" > "$PROJECT_DIR/_avis_google.json"
else
    echo "[]" > "$PROJECT_DIR/_avis_google.json"
fi

# === ÉTAPE 4: LANCER CLAUDE CODE ===
log "4/6 - Claude Code en action..."
cd "$PROJECT_DIR"

# Vérifier que Claude est disponible
if ! command -v claude &> /dev/null; then
    cleanup_on_error "Claude Code n'est pas installé"
fi

# Lancer Claude avec les instructions (--dangerously-skip-permissions pour auto-accepter les modifications)
claude --dangerously-skip-permissions "Lis _INSTRUCTIONS.md et exécute la mission. L'établissement s'appelle '$NOM_ETABLISSEMENT'. Commence par lire les fichiers sources (_scraped_content.txt, _avis_google.json) puis modifie lib/site-config.ts. Fais toutes les modifications nécessaires."

# Vérifier que site-config.ts a été modifié
if ! git diff --quiet lib/site-config.ts 2>/dev/null; then
    log "  site-config.ts modifié avec succès"
else
    log_warn "  site-config.ts n'a pas été modifié, vérification..."
fi

# === ÉTAPE 5: NETTOYER ET COMMIT ===
log "5/6 - Nettoyage et push..."

# Supprimer les fichiers temporaires
rm -f "$PROJECT_DIR/_scraped_content.txt"
rm -f "$PROJECT_DIR/_avis_google.json"
rm -f "$PROJECT_DIR/_INSTRUCTIONS.md"

# Commit et push
git add .
git commit -m "Site personnalisé: $NOM_ETABLISSEMENT

Source: $SITE_URL
Généré automatiquement via Claude Code
Date: $(date '+%Y-%m-%d %H:%M')"

# Push (force pour écraser si le repo existe déjà)
git push -u origin main --force

# === ÉTAPE 6: CLEANUP TOTAL ===
log "6/6 - Nettoyage final..."
rm -rf "$SCRAPED_DIR"
rm -rf "$PROJECT_DIR"

# === RÉSULTAT ===
REPO_NAME="${GITHUB_REPO#*/}"
SITE_URL_FINAL="https://$REPO_NAME.vercel.app"

echo ""
echo "========================================"
echo "           SUCCÈS!"
echo "========================================"
echo "Repo GitHub: https://github.com/$GITHUB_REPO"
echo "Site Vercel: $SITE_URL_FINAL"
echo "========================================"

# === NOTIFIER N8N VIA WEBHOOK ===
log "Notification n8n..."
notify_n8n "success" "Site généré avec succès" "$SITE_URL_FINAL"

log "Terminé!"
exit 0
