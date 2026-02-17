# 🚀 Guide de Démarrage Rapide - Site GSA

Guide ultra-simplifié pour démarrer le site web en 5 minutes.

---

## ⚡ Démarrage Express

```bash
# 1. Ouvrir un terminal dans le dossier gsav2
cd C:\Users\zoumi\OneDrive\Bureau\gsav2

# 2. Installer les dépendances (première fois seulement)
npm install

# 3. Lancer le site en mode développement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:5173
```

**C'est tout ! Le site est maintenant accessible. 🎉**

---

## 📸 Étape Importante : Ajouter Vos Images

### Images Déjà Présentes ✅
- `logo-gsa.png`
- `Srpinter_Fourgon.png`
- `trafic.jpg`
- `sprinter.jpg`
- `transporter.png`

### Images à Ajouter dans le Dossier `image/` ❌

**Haute Priorité** :
1. **`hero-garage.jpg`** - Photo de votre garage/atelier pour la bannière principale
2. **`mecanique-generale.jpg`** - Photo d'un mécanicien au travail
3. **`diagnostic-expert.jpg`** - Équipement de diagnostic
4. **`vente-occasions.jpg`** - Vos voitures d'occasion
5. **`atelier-1.jpg`** - Vue de votre atelier

**Moyenne Priorité** :
6. `pieces-detachees.jpg`
7. `location-utilitaire.jpg`
8. `service-premium.jpg`
9. `atelier-2.jpg`

**Basse Priorité** :
10. `occasion-clio.jpg`, `occasion-308.jpg`, `occasion-golf.jpg`
11. `temoignage-1.jpg`, `temoignage-2.jpg`, `temoignage-3.jpg`

> **Note** : Le site fonctionne même sans ces images ! Des photos de remplacement s'affichent automatiquement.

**📋 Liste complète** : Voir le fichier `IMAGES_REQUISES.md`

---

## 🎨 Personnalisation Rapide

### 1. Changer Votre Téléphone

Rechercher et remplacer dans `App.tsx` :
```
0677343673 → VOTRE_NUMERO
```

### 2. Changer Votre Email

Rechercher et remplacer dans `App.tsx` :
```
contact@gsautos.fr → VOTRE_EMAIL
```

### 3. Modifier l'Adresse

Rechercher dans `App.tsx` :
```
6 rue Roger Salengro, 10150 Pont-Sainte-Marie
```
Et remplacer par votre adresse.

### 4. Modifier les Horaires

Ligne ~280-287 dans `App.tsx` :
```jsx
<div className="flex gap-4">
    <span>Lundi - Vendredi :</span>
    <span>09:00 - 18:00</span>
</div>
```

### 5. Changer les Prix de Location

Ligne ~229-232 dans `App.tsx` :
```jsx
<div className="mt-4 text-2xl font-black text-slate-900">
  À partir de 80€/jour
</div>
```

---

## 📱 Test du Site

### Sur Votre Ordinateur
1. Ouvrir http://localhost:5173
2. Tester tous les liens de navigation
3. Remplir le formulaire de contact
4. Vérifier les animations

### Sur Mobile
1. Trouver votre adresse IP locale
   ```bash
   # Windows
   ipconfig
   # Chercher "Adresse IPv4"
   ```
2. Sur votre téléphone, aller à : `http://VOTRE_IP:5173`
3. Tester le menu mobile (hamburger)
4. Vérifier la responsive

---

## 🌐 Mise en Ligne (Déploiement)

### Option 1 : Vercel (Gratuit & Simple) ⭐

```bash
# 1. Créer un compte sur vercel.com
# 2. Installer Vercel CLI
npm install -g vercel

# 3. Se connecter
vercel login

# 4. Déployer
vercel --prod
```

**Résultat** : Votre site sera en ligne sur `https://votre-site.vercel.app`

### Option 2 : Netlify (Drag & Drop)

1. Créer le build :
   ```bash
   npm run build
   ```
2. Aller sur https://app.netlify.com/drop
3. Glisser-déposer le dossier `dist/`
4. C'est en ligne !

---

## 🐛 Problèmes Courants

### Le site ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Images qui ne s'affichent pas
- Vérifier que les images sont dans le dossier `image/`
- Vérifier l'orthographe des noms de fichiers
- Les images de secours s'affichent automatiquement si l'image est manquante

### Erreur de port déjà utilisé
```bash
# Changer le port dans vite.config.ts
# Ou tuer le processus sur le port 5173
```

### Le formulaire ne fonctionne pas
- C'est normal, le formulaire affiche juste une alerte pour l'instant
- Pour l'activer vraiment, il faut configurer un backend (EmailJS, Formspree, etc.)

---

## 📞 Besoin d'Aide ?

1. **Lire** : `README_SITE.md` (documentation complète)
2. **Images** : `IMAGES_REQUISES.md` (liste détaillée)
3. **Contact** : contact@gsautos.fr

---

## ✅ Checklist de Lancement

Avant de mettre en ligne, vérifier :

- [ ] `npm run dev` fonctionne sans erreur
- [ ] Toutes les images importantes sont ajoutées
- [ ] Téléphone, email, adresse sont corrects
- [ ] Horaires d'ouverture sont à jour
- [ ] Prix de location sont exacts
- [ ] Test sur mobile réussi
- [ ] Formulaire de contact testé
- [ ] Tous les liens fonctionnent
- [ ] Orthographe vérifiée

### Puis :

```bash
# Créer le build de production
npm run build

# Tester le build localement
npm run preview

# Si tout est OK, déployer !
vercel --prod
```

---

## 🎉 Félicitations !

Votre site professionnel est prêt à être mis en ligne !

**Temps estimé de mise en ligne** : 10-15 minutes

---

**Bonne chance ! 🚀**
