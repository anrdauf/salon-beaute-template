FROM node:20-slim

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Installer Claude Code
RUN npm install -g @anthropic-ai/claude-code

# Créer user non-root pour la sécurité
RUN useradd -m -s /bin/bash generator

# Passer au user non-root
USER generator
WORKDIR /home/generator

# Créer les répertoires de travail
RUN mkdir -p /home/generator/tmp/sites \
    && mkdir -p /home/generator/templates \
    && mkdir -p /home/generator/scripts

# Le script et le template seront montés en volumes
# pour permettre les mises à jour sans rebuild

ENTRYPOINT ["/bin/bash"]
