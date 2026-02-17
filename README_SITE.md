# 🚗 Site Web Professionnel - Garage Service Auto (GSA)

Site web moderne et professionnel pour le Garage Service Auto de Pont-Sainte-Marie.

![GSA Banner](image/logo-gsa.png)

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Sections du Site](#sections-du-site)
- [Images Requises](#images-requises)
- [Personnalisation](#personnalisation)
- [Performance & SEO](#performance--seo)
- [Déploiement](#déploiement)

---

## 🎯 Aperçu

Site web professionnel one-page (single page) avec navigation fluide, animations modernes et design responsive. Optimisé pour la conversion et le référencement local.

### Caractéristiques Principales

- ✅ Design moderne et professionnel
- ✅ 100% Responsive (mobile, tablette, desktop)
- ✅ Animations fluides et élégantes
- ✅ Optimisé SEO avec balises structurées
- ✅ Formulaire de contact interactif
- ✅ Images optimisées avec fallback
- ✅ Temps de chargement rapide
- ✅ Accessibilité (WCAG 2.1)

---

## ⚡ Fonctionnalités

### 🎨 Interface Utilisateur

- **Navigation fixe** avec effet de scroll
- **Menu mobile** responsive avec hamburger
- **Bouton "Retour en haut"** flottant
- **Animations** au scroll et au hover
- **Effets visuels** : neon glow, glass effect, gradient
- **Icônes** professionnelles (Lucide React)

### 📱 Sections Principales

1. **Hero** - Bannière d'accueil percutante
2. **Statistiques** - Chiffres clés en temps réel
3. **Services** - 6 services détaillés avec images
4. **À Propos** - Histoire et valeurs du garage
5. **Occasions** - Véhicules d'occasion disponibles
6. **Location** - Utilitaires Mercedes & Renault
7. **Garanties** - Certifications et engagements
8. **Témoignages** - Avis clients authentiques
9. **Contact** - Formulaire interactif + infos
10. **Footer** - Liens, réseaux sociaux, mentions légales

### 🛠️ Fonctionnalités Techniques

- **Lazy loading** des images
- **Animations CSS** optimisées
- **Formulaire validé** avec feedback utilisateur
- **Liens téléphone** cliquables (mobile)
- **Google Maps** intégré (à activer)
- **Fallback images** automatiques

---

## 🔧 Technologies Utilisées

### Frontend

- **React 19** - Framework JavaScript
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Bibliothèque d'icônes
- **Vite** - Build tool ultra-rapide

### Outils

- **Node.js** - Environnement d'exécution
- **npm** - Gestionnaire de paquets
- **ESM** - Modules ES6

---

## 🚀 Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Étapes

```bash
# 1. Cloner ou télécharger le projet
cd gsav2

# 2. Installer les dépendances
npm install

# 3. Configurer la clé API (si nécessaire)
# Copier .env.local et ajouter votre clé Gemini si utilisée
# cp .env.local .env.local.example

# 4. Lancer le serveur de développement
npm run dev

# 5. Ouvrir dans le navigateur
# http://localhost:5173
```

### Build de Production

```bash
# Créer une version optimisée
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📁 Structure du Projet

```
gsav2/
├── image/                      # Images du site
│   ├── logo-gsa.png           # ✅ Logo principal
│   ├── Srpinter_Fourgon.png   # ✅ Mercedes Sprinter
│   ├── trafic.jpg             # ✅ Renault Trafic
│   ├── hero-garage.jpg        # ❌ À ajouter
│   ├── mecanique-generale.jpg # ❌ À ajouter
│   └── ...                    # Voir IMAGES_REQUISES.md
├── components/                 # Composants React
│   ├── Recto.tsx              # Composant carte recto
│   └── Verso.tsx              # Composant carte verso
├── App.tsx                     # Composant principal
├── index.tsx                   # Point d'entrée
├── index.html                  # HTML principal
├── index.css                   # Styles personnalisés
├── vite.config.ts             # Configuration Vite
├── tsconfig.json              # Configuration TypeScript
├── package.json               # Dépendances du projet
├── README_SITE.md             # Documentation (ce fichier)
└── IMAGES_REQUISES.md         # Liste des images nécessaires
```

---

## 🖼️ Sections du Site

### 1. Hero Section
- Bannière plein écran avec image de fond
- Titre accrocheur avec animation
- Boutons CTA (Call-to-Action)
- Badge horaires d'ouverture

### 2. Statistiques
- 4 compteurs animés
- Années d'expérience
- Véhicules vendus
- Clients satisfaits
- Pièces en stock

### 3. Services (6 cartes)
- Mécanique générale
- Diagnostic expert
- Vente occasions
- Pièces détachées
- Location utilitaire
- Service premium

### 4. À Propos
- Histoire du garage
- Valeurs et engagements
- Photos de l'atelier
- Points forts

### 5. Occasions
- Grille de véhicules
- Informations détaillées
- Prix et caractéristiques
- Bouton d'action

### 6. Location
- Mercedes Sprinter 20m³
- Renault Trafic 9 places
- Tarifs et conditions
- Liste d'avantages

### 7. Garanties & Certifications
- Garantie constructeur
- Pièces d'origine
- Disponibilité
- Prix transparents

### 8. Témoignages
- 3 avis clients authentiques
- Photos et noms
- Notes 5 étoiles
- CTA pour laisser un avis

### 9. Contact
- Formulaire interactif
- Informations de contact
- Horaires d'ouverture
- Localisation

### 10. Footer
- Logo et description
- Navigation complète
- Réseaux sociaux
- Mentions légales
- Copyright

---

## 🖼️ Images Requises

Consultez le fichier **`IMAGES_REQUISES.md`** pour la liste complète des images nécessaires.

### Résumé

✅ **Disponibles** : 5 images
❌ **Manquantes** : 14 images

### Images Prioritaires

1. `hero-garage.jpg` - Bannière principale
2. `mecanique-generale.jpg` - Service mécanique
3. `diagnostic-expert.jpg` - Service diagnostic
4. `vente-occasions.jpg` - Showroom
5. `atelier-1.jpg` - Vue atelier

**Note** : Des images de secours (fallback) depuis Unsplash sont utilisées automatiquement si les images locales sont absentes.

---

## 🎨 Personnalisation

### Couleurs (Charte Graphique)

Le site utilise une palette rouge/slate :

```css
--color-primary: #e11d48;        /* Rouge principal */
--color-primary-dark: #be123c;   /* Rouge foncé */
--color-primary-light: #fecdd3;  /* Rouge clair */
--color-slate-900: #0f172a;      /* Gris très foncé */
```

### Modifier les Couleurs

Éditez `index.css` section `:root` pour changer la palette.

### Contenu Textuel

Modifiez directement dans `App.tsx` :
- Ligne 102-103 : Titre hero
- Ligne 128-131 : Statistiques
- Ligne 153-188 : Services
- Etc.

### Coordonnées

- **Téléphone** : Rechercher `0677343673` et remplacer
- **Email** : Rechercher `contact@gsautos.fr` et remplacer
- **Adresse** : Rechercher `6 rue Roger Salengro` et remplacer

---

## 🔍 Performance & SEO

### SEO Optimisations

✅ **Balises Meta** complètes (title, description, keywords)
✅ **Open Graph** (Facebook, LinkedIn)
✅ **Twitter Cards**
✅ **Schema.org** (JSON-LD) pour le référencement local
✅ **Balises sémantiques** HTML5
✅ **Attributs alt** sur toutes les images
✅ **URLs propres** avec ancres (#services, #contact, etc.)

### Performance

- ⚡ **Chargement rapide** grâce à Vite
- 🖼️ **Images optimisées** (compression recommandée)
- 🎨 **CSS minimal** (Tailwind purge)
- 📦 **Code splitting** automatique
- 🚀 **Lazy loading** des images

### Scores Attendus

- **Lighthouse Performance** : 90+
- **SEO** : 95+
- **Accessibilité** : 90+
- **Best Practices** : 95+

---

## 🌐 Déploiement

### Options de Déploiement

#### 1. **Vercel** (Recommandé)
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### 2. **Netlify**
```bash
# Drag & drop du dossier dist/
# Ou via Git
npm run build
# Upload dist/ sur Netlify
```

#### 3. **GitHub Pages**
```bash
npm run build
# Configurer GitHub Pages sur le dossier dist/
```

#### 4. **Serveur Web (Apache/Nginx)**
```bash
npm run build
# Copier le contenu de dist/ vers /var/www/html/
```

### Variables d'Environnement

Si vous utilisez des API externes :

```env
VITE_GOOGLE_MAPS_API_KEY=votre_cle_ici
VITE_CONTACT_EMAIL=contact@gsautos.fr
```

---

## 📞 Support & Contact

Pour toute question ou assistance :

- **Email** : contact@gsautos.fr
- **Téléphone** : 06 77 34 36 73
- **Adresse** : 6 rue Roger Salengro, 10150 Pont-Sainte-Marie

---

## 📝 Checklist Avant Mise en Ligne

- [ ] Toutes les images sont ajoutées dans `image/`
- [ ] Les coordonnées sont à jour (tél, email, adresse)
- [ ] Les horaires d'ouverture sont corrects
- [ ] Les prix de location sont exacts
- [ ] Les véhicules d'occasion sont à jour
- [ ] Le formulaire de contact fonctionne
- [ ] Les liens des réseaux sociaux sont corrects
- [ ] Test sur mobile/tablette/desktop
- [ ] Test de tous les liens internes
- [ ] Vérification de l'orthographe
- [ ] Build de production créé (`npm run build`)
- [ ] Test du build en local (`npm run preview`)

---

## 🏆 Fonctionnalités Avancées (Futures Améliorations)

### Phase 2 (Optionnel)
- [ ] Intégration Google Maps interactive
- [ ] Système de réservation en ligne
- [ ] Chat en direct (WhatsApp Business)
- [ ] Galerie photos filtrable
- [ ] Blog / Actualités
- [ ] Multi-langues (Français/Anglais)
- [ ] Mode sombre (dark mode)
- [ ] Système d'avis Google intégré
- [ ] Paiement en ligne (occasions)
- [ ] Espace client connecté

---

## 📄 Licence

© 2026 Garage Service Auto GSA. Tous droits réservés.

---

## 🙏 Crédits

- **Design & Développement** : Équipe GSA
- **Icônes** : Lucide React
- **Fonts** : Google Fonts (Inter)
- **Images de secours** : Unsplash

---

**Dernière mise à jour** : 17 février 2026

🚀 **Bon succès avec votre nouveau site web professionnel !**
