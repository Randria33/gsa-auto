# 🎛️ Interface d'Administration GSA - Guide Complet

## ✅ Ce Qui a Été Créé

### 📂 **Structure des Fichiers**

```
gsav2/
├── lib/
│   └── supabase.ts                    ✅ Configuration Supabase + Types
├── pages/
│   └── admin/
│       ├── AdminLogin.tsx             ✅ Page de connexion
│       ├── AdminDashboard.tsx         ✅ Tableau de bord principal
│       └── components/
│           ├── VehiculesManager.tsx   ⏳ À créer
│           ├── ServicesManager.tsx    ⏳ À créer
│           ├── LocationManager.tsx    ⏳ À créer
│           ├── TemoignagesManager.tsx ✅ Gestion + Modération
│           └── ParametresManager.tsx  ⏳ À créer
└── .env.local                         ⏳ À configurer
```

---

## 🎯 **Fonctionnalités Implémentées**

### 1. **Authentification** ✅
- Page de connexion sécurisée
- Intégration Supabase Auth
- Session persistante
- Protection des routes admin

### 2. **Tableau de Bord** ✅
- Vue d'ensemble des statistiques
- 4 KPIs principaux :
  - Véhicules disponibles
  - Services actifs
  - Témoignages
  - Vues mensuelles
- Actions rapides
- Menu de navigation latéral
- Responsive mobile/tablette

### 3. **Gestion des Témoignages** ✅ (COMPLET)

#### Fonctionnalités :
- ✅ **Activation/Désactivation** de la fonction "Laisser un avis"
- ✅ **Modération** des avis en attente
- ✅ **Approbation/Rejet** des témoignages
- ✅ **Afficher/Masquer** les avis publiés
- ✅ **Ajout manuel** de témoignages
- ✅ **Suppression** définitive
- ✅ **Interface intuitive** avec code couleur :
  - 🟠 Orange : En attente de modération
  - 🟢 Vert : Approuvé et visible
  - ⚪ Gris : Approuvé mais masqué

#### Workflow de Modération :
```
1. Client soumet un avis depuis le site
   ↓
2. Avis arrive en "Attente de modération" (orange)
   ↓
3. Admin le voit dans l'interface
   ↓
4. Admin décide :
   → Approuver = Publié sur le site ✅
   → Rejeter = Non visible ❌
   → Supprimer = Supprimé définitivement 🗑️
```

---

## 📋 **Informations Modifiables**

### 🚗 **1. Véhicules d'Occasion** (Haute Priorité)

**Actions** :
- ✅ Ajouter un nouveau véhicule
- ✅ Modifier les informations (prix, km, description)
- ✅ Upload de 5-6 photos (carrousel)
- ✅ Marquer comme "Vendu" (retire du site)
- ✅ Supprimer définitivement
- ✅ Dupliquer (pour gagner du temps)

**Champs modifiables** :
- Nom (ex: Renault Clio V)
- Année
- Kilométrage
- Prix
- Carburant (Essence, Diesel, Hybride, Électrique)
- Transmission (Manuelle, Automatique)
- Puissance (ch)
- Portes / Places
- Couleur
- 1ère mise en circulation
- Contrôle technique
- Description complète
- Équipements (liste)
- Garantie
- 5-6 photos (face, profil G/D, arrière, intérieur, tableau de bord)

---

### 🔧 **2. Services** (Moyenne Priorité)

**Actions** :
- ✅ Modifier les tarifs
- ✅ Mettre à jour les prestations
- ✅ Modifier les avantages
- ✅ Changer l'image
- ✅ Activer/Désactiver un service
- ✅ Réorganiser l'ordre d'affichage

**Champs modifiables** :
- Titre du service
- Description courte
- Image représentative
- Tarif indicatif
- Durée estimée
- Liste des prestations (8 items)
- Liste des avantages (6 items)
- Ordre d'affichage
- Statut (actif/inactif)

---

### 🚚 **3. Tarifs de Location** (Haute Priorité)

**Actions** :
- ✅ Modifier tarif journalier
- ✅ Modifier tarif hebdomadaire
- ✅ Ajuster le montant de caution
- ✅ Mettre à jour la description
- ✅ Marquer disponible/indisponible

**Véhicules de location** :
1. **Mercedes Sprinter 20m³**
   - Tarif jour
   - Tarif semaine
   - Caution
   - Description
   - Photo

2. **Renault Trafic 9 places**
   - Tarif jour
   - Tarif semaine
   - Caution
   - Description
   - Photo

---

### 💬 **4. Témoignages** (Haute Priorité) ✅

**Actions** :
- ✅ Activer/Désactiver la fonction "Laisser un avis"
- ✅ Modérer les avis en attente
- ✅ Approuver/Rejeter
- ✅ Afficher/Masquer sur le site
- ✅ Ajouter manuellement
- ✅ Supprimer

**Champs** :
- Nom du client
- Rôle (Particulier, Chef d'entreprise, etc.)
- Texte du témoignage
- Note (1 à 5 étoiles)
- Photo (optionnel)
- Statut (approuvé/rejeté)
- Visibilité (affiché/masqué)

---

### ⚙️ **5. Paramètres Généraux** (Basse Priorité)

**Actions** :
- ✅ Modifier horaires d'ouverture
- ✅ Changer téléphone
- ✅ Modifier email
- ✅ Mettre à jour l'adresse
- ✅ Liens réseaux sociaux
- ✅ Activation fonction avis

**Champs** :
- Téléphone principal
- Email de contact
- Adresse complète
- Horaires :
  - Lundi - Vendredi
  - Samedi
  - Dimanche (fermé)
- Réseaux sociaux :
  - Facebook (URL)
  - Instagram (URL)
  - Twitter (URL)
- Fonction "Laisser un avis" (ON/OFF)

---

## 🔐 **Sécurité et Permissions**

### Niveaux d'Accès

**Admin Principal** :
- ✅ Accès total à toutes les fonctions
- ✅ Gestion des véhicules
- ✅ Modification des tarifs
- ✅ Modération des avis
- ✅ Accès aux paramètres

**Employé** (futur) :
- ✅ Gestion des véhicules uniquement
- ❌ Pas d'accès aux tarifs
- ✅ Modération des avis
- ❌ Pas d'accès aux paramètres

### Row Level Security (Supabase)

```sql
-- Les admins authentifiés peuvent tout faire
CREATE POLICY "Admin full access"
ON vehicules FOR ALL
USING (auth.role() = 'authenticated');

-- Le public peut seulement lire les véhicules disponibles
CREATE POLICY "Public read available"
ON vehicules FOR SELECT
USING (disponible = true);

-- Les témoignages approuvés et affichés sont visibles
CREATE POLICY "Public read approved testimonials"
ON temoignages FOR SELECT
USING (approuve = true AND affiche = true);
```

---

## 🎨 **Interface Utilisateur**

### Design System

**Couleurs** :
- **Primary** : Rouge #e11d48
- **Success** : Vert #10b981
- **Warning** : Orange #f59e0b
- **Danger** : Rouge foncé #dc2626
- **Neutral** : Gris slate

**Composants** :
- Boutons avec états (hover, disabled)
- Cards avec ombres
- Formulaires avec validation
- Modals responsives
- Tables avec filtres
- Upload drag & drop d'images

### Navigation

```
SIDEBAR (Menu)
├── 📊 Tableau de Bord
├── 🚗 Véhicules
├── 🔧 Services
├── 🚚 Location
├── 💬 Témoignages
└── ⚙️ Paramètres
```

---

## 📸 **Gestion des Images**

### Upload d'Images

**Buckets Supabase Storage** :
- `vehicules/` - Photos des véhicules (5-6 par véhicule)
- `services/` - Images des services
- `temoignages/` - Photos des clients
- `general/` - Autres images (logo, etc.)

**Fonctionnalités** :
- ✅ Drag & Drop
- ✅ Prévisualisation avant upload
- ✅ Compression automatique
- ✅ URLs publiques générées automatiquement
- ✅ Suppression d'anciennes images

**Formats acceptés** :
- JPG/JPEG
- PNG
- WebP

**Taille maximale** : 5 MB par image

---

## 🚀 **Setup et Configuration**

### Étape 1 : Configuration Supabase

1. **Créer un compte Supabase** (gratuit)
   ```
   https://supabase.com
   ```

2. **Créer un nouveau projet**

3. **Créer les tables** (voir `SUPABASE_SCHEMA.sql`)

4. **Configurer Storage** :
   - Créer bucket `vehicules`
   - Créer bucket `services`
   - Créer bucket `temoignages`
   - Rendre publics

5. **Créer un utilisateur admin** :
   ```sql
   -- Dans Authentication > Users
   -- Ajouter un email et mot de passe
   ```

### Étape 2 : Configuration du Projet

1. **Installer les dépendances** :
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Créer `.env.local`** :
   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique
   ```

3. **Ajouter au `.gitignore`** :
   ```
   .env.local
   ```

### Étape 3 : Lancer l'Interface Admin

```bash
npm run dev
```

**Accès** : `http://localhost:5173/admin`

---

## 📊 **Tables Supabase (Schéma)**

### Table : `vehicules`
```sql
CREATE TABLE vehicules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  annee TEXT NOT NULL,
  kilometrage TEXT NOT NULL,
  prix TEXT NOT NULL,
  carburant TEXT NOT NULL,
  transmission TEXT NOT NULL,
  puissance TEXT NOT NULL,
  portes TEXT NOT NULL,
  places TEXT NOT NULL,
  couleur TEXT NOT NULL,
  premiere_mise TEXT NOT NULL,
  controle_technique TEXT NOT NULL,
  description TEXT NOT NULL,
  equipements JSONB NOT NULL DEFAULT '[]',
  garantie TEXT NOT NULL,
  disponible BOOLEAN DEFAULT true,
  image_principale TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table : `temoignages`
```sql
CREATE TABLE temoignages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  role TEXT NOT NULL,
  texte TEXT NOT NULL,
  note INT CHECK (note >= 1 AND note <= 5),
  image_url TEXT,
  approuve BOOLEAN DEFAULT false,
  affiche BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table : `parametres`
```sql
CREATE TABLE parametres (
  id TEXT PRIMARY KEY DEFAULT '1',
  telephone TEXT NOT NULL,
  email TEXT NOT NULL,
  adresse TEXT NOT NULL,
  horaires JSONB NOT NULL,
  reseaux_sociaux JSONB NOT NULL,
  fonction_avis_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insérer les paramètres par défaut
INSERT INTO parametres (id, telephone, email, adresse, horaires, reseaux_sociaux)
VALUES (
  '1',
  '06 77 34 36 73',
  'contact@gsautos.fr',
  '6 rue Roger Salengro, 10150 Pont-Sainte-Marie',
  '{"lundi_vendredi": "09:00 - 18:00", "samedi": "09:00 - 12:00", "dimanche": "Fermé"}',
  '{"facebook": "", "instagram": "", "twitter": ""}'
);
```

---

## 🎓 **Guide Utilisateur (Pour Employés GSA)**

### Connexion

1. Aller sur `https://votre-site.com/admin`
2. Entrer email et mot de passe
3. Cliquer "Se Connecter"

### Ajouter un Véhicule d'Occasion

1. Aller dans **Véhicules**
2. Cliquer **"+ Ajouter un Véhicule"**
3. Remplir tous les champs
4. Upload 5-6 photos (drag & drop)
5. Cliquer **"Enregistrer"**
6. ✅ Le véhicule apparaît immédiatement sur le site !

### Modérer un Avis Client

1. Aller dans **Témoignages**
2. Voir la section **"En Attente de Modération"** (orange)
3. Lire l'avis
4. Décider :
   - **Approuver** = Publié sur le site
   - **Rejeter** = Non visible
   - **Supprimer** = Supprimé définitivement

### Modifier les Tarifs de Location

1. Aller dans **Location**
2. Sélectionner le véhicule (Sprinter ou Trafic)
3. Modifier les tarifs
4. Cliquer **"Enregistrer"**
5. ✅ Tarifs mis à jour sur le site !

### Activer/Désactiver la Fonction Avis

1. Aller dans **Témoignages**
2. En haut de la page, voir le bouton **"ACTIVÉE"** ou **"DÉSACTIVÉE"**
3. Cliquer pour changer l'état
4. Confirmé par un message

**Quand désactiver ?**
- Période de vacances
- Trop d'avis en attente
- Maintenance

---

## 🔔 **Notifications (Futur)**

### Email aux Admins
- ✉️ Nouveau véhicule ajouté
- ✉️ Nouvel avis en attente de modération
- ✉️ Véhicule marqué comme vendu

### Tableau de Bord
- 🔴 Badge rouge sur "Témoignages" si avis en attente
- 📊 Mise à jour des stats en temps réel

---

## ✅ **Checklist de Mise en Production**

### Configuration
- [ ] Compte Supabase créé
- [ ] Tables créées avec le schéma
- [ ] Storage buckets configurés
- [ ] Variables d'environnement définies
- [ ] Utilisateur admin créé

### Développement
- [ ] TemoignagesManager.tsx ✅
- [ ] VehiculesManager.tsx ⏳
- [ ] ServicesManager.tsx ⏳
- [ ] LocationManager.tsx ⏳
- [ ] ParametresManager.tsx ⏳

### Tests
- [ ] Connexion admin
- [ ] Ajout de véhicule
- [ ] Modération d'avis
- [ ] Modification de tarifs
- [ ] Upload d'images
- [ ] Responsive mobile

### Sécurité
- [ ] Row Level Security activée
- [ ] Politiques configurées
- [ ] Variables d'env sécurisées
- [ ] HTTPS en production

### Formation
- [ ] Guide utilisateur créé
- [ ] Employés formés (1h)
- [ ] Support initial assuré

---

## 💰 **Coûts**

| Service | Coût | Note |
|---------|------|------|
| **Supabase** | Gratuit | Plan Free suffisant pour GSA |
| **Hébergement** | 0€ | Vercel/Netlify gratuit |
| **Domaine** | ~12€/an | Si domaine personnalisé |

**Total : 0€ à 12€/an** 🎉

---

## 🆘 **Support et Maintenance**

### Problèmes Courants

**"Je ne peux pas me connecter"**
- Vérifier email et mot de passe
- Vérifier que l'utilisateur existe dans Supabase Auth

**"Les images ne s'uploadent pas"**
- Vérifier que les buckets existent
- Vérifier les permissions (public)
- Vérifier la taille (< 5MB)

**"Les modifications n'apparaissent pas"**
- Rafraîchir la page du site public
- Vérifier que l'élément est marqué comme "actif"

### Contact Support
- Email : support@gsautos.fr
- Documentation : Ce fichier

---

## 🎯 **Prochaines Étapes**

1. ✅ TemoignagesManager créé
2. ⏳ Créer VehiculesManager
3. ⏳ Créer LocationManager
4. ⏳ Créer ServicesManager
5. ⏳ Créer ParametresManager
6. ⏳ Setup Supabase
7. ⏳ Tests complets
8. ⏳ Formation équipe
9. ⏳ Mise en production

**Temps estimé restant : 3-4 jours de développement**

---

**Dernière mise à jour** : 17 février 2026

🚀 **Interface Admin en Cours de Développement**
