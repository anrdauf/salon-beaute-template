# Guide d'Installation VPS - Générateur de Sites

Ce guide explique comment configurer le VPS pour générer automatiquement des sites spa/beauté.

## Prérequis

- VPS Ubuntu 22.04+ avec accès root
- n8n déjà installé et fonctionnel
- Compte GitHub avec clé SSH configurée
- Compte Claude Pro (pour Claude Code)
- Compte Vercel connecté à GitHub

---

## Étape 1 : Installer les dépendances

```bash
# Connexion au VPS
ssh root@ton-vps

# Mettre à jour le système
apt update && apt upgrade -y

# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Vérifier l'installation
node --version  # Devrait afficher v18.x ou plus
npm --version

# Installer Git si pas déjà fait
apt install -y git curl
```

---

## Étape 2 : Installer Claude Code

```bash
# Installer Claude Code globalement
npm install -g @anthropic-ai/claude-code

# Vérifier l'installation
claude --version

# S'authentifier avec ton compte Claude Pro
claude login
# → Cela ouvre un lien dans le terminal
# → Copie le lien, ouvre-le dans ton navigateur
# → Connecte-toi avec ton compte Claude Pro
# → L'authentification sera sauvegardée sur le VPS
```

---

## Étape 3 : Configurer Git et SSH

```bash
# Configurer l'identité Git
git config --global user.email "ton-email@example.com"
git config --global user.name "Ton Nom"

# Générer une clé SSH (si pas déjà fait)
ssh-keygen -t ed25519 -C "ton-email@example.com"
# Appuie sur Entrée pour accepter le chemin par défaut
# Pas de passphrase (Entrée deux fois)

# Afficher la clé publique
cat ~/.ssh/id_ed25519.pub

# IMPORTANT: Copie cette clé et ajoute-la sur GitHub
# → https://github.com/settings/keys
# → "New SSH key"
# → Colle la clé

# Tester la connexion SSH
ssh -T git@github.com
# Devrait afficher: "Hi username! You've successfully authenticated..."
```

---

## Étape 4 : Créer la structure des dossiers

```bash
# Créer les dossiers nécessaires
mkdir -p /opt/templates
mkdir -p /opt/scripts
mkdir -p /tmp/sites

# Cloner le template
cd /opt/templates
git clone https://github.com/anrdauf/salon-beaute-template.git salon-beaute

# Vérifier
ls -la /opt/templates/salon-beaute
```

---

## Étape 5 : Installer le script de génération

```bash
# Copier le script (depuis ce repo)
# Option A: Copier depuis ton PC local
scp scripts/generate-site.sh root@ton-vps:/opt/scripts/

# Option B: Créer directement sur le VPS
cat > /opt/scripts/generate-site.sh << 'EOF'
# (coller le contenu du fichier generate-site.sh ici)
EOF

# Rendre exécutable
chmod +x /opt/scripts/generate-site.sh

# Tester que le script est accessible
/opt/scripts/generate-site.sh --help
```

---

## Étape 6 : Configurer n8n

### 6.1 Importer les workflows

1. Ouvre n8n dans ton navigateur
2. Va dans **Workflows** → **Import from File**
3. Importe `n8n-workflow-generate-site.json`
4. Importe `n8n-workflow-site-ready-callback.json`

### 6.2 Configurer le workflow "Générateur"

1. Ouvre le workflow "Générateur de Sites - Formulaire"
2. Dans le node **Parser Avis + Slug** :
   - Modifie `callbackUrl` avec l'URL de ton n8n
   - Ex: `https://n8n.ton-domaine.com/webhook/site-ready`
3. Active le workflow (toggle en haut à droite)

### 6.3 Configurer le workflow "Callback"

1. Ouvre le workflow "Générateur de Sites - Callback"
2. Dans le node **Envoyer Email** :
   - Configure les credentials SMTP
   - Ou remplace par un node Telegram/Slack/Discord
3. Active le workflow

### 6.4 Obtenir l'URL du formulaire

1. Dans le workflow "Générateur de Sites - Formulaire"
2. Clique sur le node **Formulaire**
3. L'URL du formulaire est affichée (ex: `https://n8n.ton-domaine.com/form/generate-site-form`)

---

## Étape 7 : Configurer Vercel (auto-deploy)

1. Va sur https://vercel.com/dashboard
2. Connecte ton compte GitHub si pas fait
3. Dans **Settings** → **Git** :
   - Active "Auto-import new repositories"
   - Ou importe manuellement chaque nouveau repo

Chaque `git push` déclenchera automatiquement un build Vercel.

---

## Étape 8 : Tester

### Test manuel du script

```bash
# Tester avec des données minimales
/opt/scripts/generate-site.sh \
  "Test Etablissement" \
  "https://example.com" \
  "anrdauf/test-site-delete-me" \
  "test-etablissement" \
  '[]' \
  ""

# Vérifier les logs
cat /tmp/generate-test-etablissement.log
```

### Test via le formulaire n8n

1. Ouvre l'URL du formulaire
2. Remplis avec des données test :
   - Nom: "Test Salon"
   - URL: "https://example.com"
   - Avis: "Marie 5 avis il y a 2 mois Excellent service Visité en janvier 2024"
   - Repo: "anrdauf/test-salon"
3. Soumets
4. Vérifie les logs : `tail -f /tmp/generate-test-salon.log`
5. Attends la notification

---

## Dépannage

### Claude Code ne s'authentifie pas

```bash
# Réessayer l'authentification
claude logout
claude login
```

### Le script ne s'exécute pas depuis n8n

Vérifier que n8n a les permissions :

```bash
# Si n8n tourne en Docker, le script doit être accessible
# Option: Monter /opt/scripts dans le container n8n

# Dans docker-compose.yml de n8n, ajouter:
volumes:
  - /opt/scripts:/opt/scripts
  - /opt/templates:/opt/templates
  - /tmp/sites:/tmp/sites
```

### Push GitHub échoue

```bash
# Vérifier la clé SSH
ssh -T git@github.com

# Vérifier que le repo existe
# Le script utilise --force, donc le repo doit exister au préalable
# Créer le repo manuellement sur GitHub avant le premier test
```

### Le site ne se déploie pas sur Vercel

1. Vérifier que Vercel est connecté au repo
2. Vérifier les logs Vercel pour les erreurs de build
3. Le build Next.js doit passer sans erreur

---

## Architecture des fichiers

```
/opt/
├── templates/
│   └── salon-beaute/           # Template cloné (ne pas modifier)
│       ├── app/
│       ├── components/
│       ├── lib/
│       │   └── site-config.ts  # Fichier personnalisé par Claude
│       └── ...
│
├── scripts/
│   └── generate-site.sh        # Script principal
│
└── n8n/                        # (si n8n en Docker)
    └── data/

/tmp/
├── sites/                      # Projets temporaires (auto-nettoyés)
│   └── site-xxx/
├── scraped-xxx/                # Contenu scrapé (auto-nettoyé)
└── generate-xxx.log            # Logs de génération
```

---

## Maintenance

### Mettre à jour le template

```bash
cd /opt/templates/salon-beaute
git pull origin main
```

### Nettoyer les vieux logs

```bash
# Supprimer les logs de plus de 7 jours
find /tmp -name "generate-*.log" -mtime +7 -delete
```

### Vérifier l'espace disque

```bash
df -h /tmp
# Les projets temporaires sont auto-nettoyés, mais vérifier quand même
```
