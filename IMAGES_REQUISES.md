# 📸 Images Requises pour le Site GSA

Ce document liste toutes les images nécessaires pour le site web de Garage Service Auto (GSA).

## ✅ Images Déjà Disponibles

Ces images sont déjà présentes dans le dossier `image/` :

- ✓ `logo-gsa.png` - Logo principal du garage
- ✓ `Srpinter_Fourgon.png` - Mercedes Sprinter (fourgon de location)
- ✓ `sprinter.jpg` - Mercedes Sprinter (version alternative)
- ✓ `trafic.jpg` - Renault Trafic (9 places)
- ✓ `transporter.png` - Transporteur (utilitaire)

---

## ❌ Images Manquantes à Ajouter

### 🏠 Section Hero
- **`hero-garage.jpg`** (1920x1080px)
  - Photo de l'atelier avec des voitures
  - Style professionnel, bien éclairé
  - Peut montrer l'équipe ou l'intérieur du garage

### 🔧 Section Services (6 images)
1. **`mecanique-generale.jpg`** (800x600px)
   - Mécanicien travaillant sur un moteur
   - Outils professionnels visibles

2. **`diagnostic-expert.jpg`** (800x600px)
   - Équipement de diagnostic électronique
   - Écran de diagnostic avec codes

3. **`vente-occasions.jpg`** (800x600px)
   - Plusieurs voitures d'occasion alignées
   - Showroom ou parking du garage

4. **`pieces-detachees.jpg`** (800x600px)
   - Étagères avec pièces auto
   - Magasin de pièces organisé

5. **`location-utilitaire.jpg`** (800x600px)
   - Utilitaires disponibles à la location
   - Photo claire des véhicules

6. **`service-premium.jpg`** (800x600px)
   - Service client, accueil
   - Clés de voiture, contrat, sourire

### 🏢 Section À Propos (2 images)
7. **`atelier-1.jpg`** (800x600px)
   - Vue de l'atelier/garage
   - Professionnalisme et propreté

8. **`atelier-2.jpg`** (800x600px)
   - Équipe GSA ou autre vue de l'atelier
   - Ambiance chaleureuse et professionnelle

### 🚗 Section Occasions (5-6 PHOTOS PAR VÉHICULE - CARROUSEL)

#### **Renault Clio V (2020)** - 5 photos minimum
9. **`occasion-clio-face.jpg`** (1200x800px) - Vue de face
10. **`occasion-clio-profil-gauche.jpg`** (1200x800px) - Côté conducteur
11. **`occasion-clio-profil-droit.jpg`** (1200x800px) - Côté passager
12. **`occasion-clio-arriere.jpg`** (1200x800px) - Vue arrière
13. **`occasion-clio-interieur.jpg`** (1200x800px) - Sièges intérieur

#### **Peugeot 308 II (2019)** - 6 photos minimum
14. **`occasion-308-face.jpg`** (1200x800px) - Vue de face
15. **`occasion-308-profil-gauche.jpg`** (1200x800px) - Côté conducteur
16. **`occasion-308-profil-droit.jpg`** (1200x800px) - Côté passager
17. **`occasion-308-arriere.jpg`** (1200x800px) - Vue arrière
18. **`occasion-308-interieur.jpg`** (1200x800px) - Sièges intérieur
19. **`occasion-308-coffre.jpg`** (1200x800px) - Coffre ouvert

#### **Volkswagen Golf VIII (2021)** - 6 photos minimum
20. **`occasion-golf-face.jpg`** (1200x800px) - Vue de face
21. **`occasion-golf-profil-gauche.jpg`** (1200x800px) - Côté conducteur
22. **`occasion-golf-profil-droit.jpg`** (1200x800px) - Côté passager
23. **`occasion-golf-arriere.jpg`** (1200x800px) - Vue arrière
24. **`occasion-golf-interieur.jpg`** (1200x800px) - Sièges intérieur
25. **`occasion-golf-tableau-bord.jpg`** (1200x800px) - Dashboard/cockpit

💡 **Note** : Vous pouvez ajouter plus de véhicules d'occasion en suivant le même format : `occasion-[modele].jpg`

### 💬 Section Témoignages (3 images)
12. **`temoignage-1.jpg`** (300x300px)
    - Photo portrait client 1
    - Format carré, fond neutre

13. **`temoignage-2.jpg`** (300x300px)
    - Photo portrait client 2
    - Format carré, fond neutre

14. **`temoignage-3.jpg`** (300x300px)
    - Photo portrait client 3
    - Format carré, fond neutre

---

## 📋 Spécifications Techniques

### Formats Recommandés
- **Format d'image** : JPG (JPEG) pour les photos, PNG pour le logo
- **Compression** : Optimisée pour le web (< 500 KB par image)

### Dimensions Recommandées
| Type d'Image | Dimensions | Format |
|-------------|-----------|---------|
| Hero Background | 1920x1080px | JPG |
| Services | 800x600px | JPG |
| Occasions | 800x600px | JPG |
| Témoignages | 300x300px | JPG |
| Logo | Variable | PNG |

### Qualité
- Résolution minimale : 72 DPI (web standard)
- Lumière naturelle de préférence
- Photos nettes et professionnelles
- Éviter les photos floues ou pixelisées

---

## 🎨 Style Photographique

### Recommandations
- **Luminosité** : Photos bien éclairées, éviter les zones sombres
- **Composition** : Cadrages professionnels, règle des tiers
- **Couleurs** : Cohérence avec la charte graphique (rouge #e11d48)
- **Authenticité** : Privilégier les vraies photos du garage si possible

### À Éviter
- ❌ Photos génériques de banques d'images trop évidentes
- ❌ Filigranes ou logos d'autres sociétés
- ❌ Qualité trop basse ou compression excessive
- ❌ Photos datées ou de mauvaise qualité

---

## 🔄 Fallback (Images Temporaires)

Le site utilise actuellement des images de secours depuis Unsplash.com si les images locales sont manquantes. Ces images seront automatiquement remplacées une fois que vous ajouterez vos vraies photos dans le dossier `image/`.

### Fonctionnement
```javascript
onError={(e) => {
  e.currentTarget.src = 'URL_FALLBACK_UNSPLASH';
}}
```

---

## 📦 Installation des Images

1. Téléchargez ou prenez vos photos selon les spécifications ci-dessus
2. Renommez-les exactement comme indiqué dans ce document
3. Placez-les dans le dossier `image/` à la racine du projet
4. Les images seront automatiquement détectées et affichées

---

## 🎯 Priorité

### Haute Priorité (Essentielles)
1. ✅ hero-garage.jpg
2. ✅ logo-gsa.png (déjà présent)
3. ✅ mecanique-generale.jpg
4. ✅ diagnostic-expert.jpg
5. ✅ vente-occasions.jpg

### Moyenne Priorité
6. pieces-detachees.jpg
7. location-utilitaire.jpg
8. service-premium.jpg
9. atelier-1.jpg
10. atelier-2.jpg

### Basse Priorité (Peuvent utiliser des fallbacks)
11. Les véhicules d'occasion spécifiques
12. Les photos de témoignages (peuvent être générées automatiquement)

---

## 📞 Contact

Pour toute question concernant les images, n'hésitez pas à demander de l'aide.

**Dernière mise à jour** : 17 février 2026
