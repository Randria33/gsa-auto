# Configuration Stripe pour GSA Auto

Ce guide vous explique comment configurer Stripe pour accepter les paiements de réservation SELF-GARAGE.

## 📋 Prérequis

1. Créer un compte Stripe : https://dashboard.stripe.com/register
2. Activer votre compte (vérification d'identité)

## 🔑 Étape 1 : Récupérer vos clés API

### En mode Test (développement)

1. Allez sur https://dashboard.stripe.com/test/apikeys
2. Copiez les clés suivantes :
   - **Clé publique** : commence par `pk_test_...`
   - **Clé secrète** : commence par `sk_test_...`

### En mode Live (production)

1. Allez sur https://dashboard.stripe.com/apikeys
2. Copiez les clés suivantes :
   - **Clé publique** : commence par `pk_live_...`
   - **Clé secrète** : commence par `sk_live_...`

## 🛠️ Étape 2 : Configuration locale

1. Créer un fichier `.env.local` à la racine du projet :

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
```

2. **Important** : Ne committez JAMAIS les fichiers `.env` avec vos vraies clés !

## 🚀 Étape 3 : Configuration du backend

Vous avez plusieurs options selon votre hébergement :

### Option A : Netlify Functions (recommandé si vous utilisez Netlify)

1. Créer le dossier `netlify/functions/`
2. Créer le fichier `netlify/functions/create-payment-intent.ts` en copiant le code de `api/create-payment-intent.example.ts`
3. Installer Stripe : `npm install stripe`
4. Ajouter les variables d'environnement dans Netlify :
   - Site Settings → Environment → Environment variables
   - Ajouter `STRIPE_SECRET_KEY` avec votre clé secrète

### Option B : Vercel Serverless Functions

1. Créer le dossier `api/`
2. Créer `api/create-payment-intent.ts`
3. Installer Stripe : `npm install stripe`
4. Ajouter les variables dans Vercel :
   - Settings → Environment Variables

### Option C : Backend Express personnalisé

Voir les exemples commentés dans `api/create-payment-intent.example.ts`

## 🎯 Étape 4 : Tester les paiements

### Cartes de test Stripe

Utilisez ces numéros de carte pour tester :

**Paiement réussi :**
- Numéro : `4242 4242 4242 4242`
- Date : n'importe quelle date future
- CVC : n'importe quel 3 chiffres
- Code postal : n'importe lequel

**Paiement refusé :**
- Numéro : `4000 0000 0000 0002`

**Authentification 3D Secure :**
- Numéro : `4000 0027 6000 3184`

Plus de cartes de test : https://stripe.com/docs/testing

## 📧 Étape 5 : Configuration des emails

1. Allez sur https://dashboard.stripe.com/settings/emails
2. Activez les emails de reçu automatiques
3. Personnalisez le template si nécessaire

## 🔔 Étape 6 : Webhooks (optionnel mais recommandé)

Les webhooks permettent de recevoir des notifications en temps réel des événements Stripe.

1. Allez sur https://dashboard.stripe.com/webhooks
2. Cliquez sur "Add endpoint"
3. URL : `https://votre-site.com/api/webhook-stripe`
4. Sélectionnez les événements :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copiez le "Signing secret" et ajoutez-le à vos variables d'environnement :
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## 🛡️ Sécurité

### ⚠️ À NE JAMAIS FAIRE :
- ❌ Exposer la clé secrète (`sk_...`) côté client
- ❌ Committer les fichiers `.env` dans Git
- ❌ Utiliser les clés de test en production

### ✅ Bonnes pratiques :
- ✅ Utiliser des variables d'environnement
- ✅ Valider les montants côté serveur
- ✅ Implémenter les webhooks pour confirmer les paiements
- ✅ Logger les erreurs de paiement
- ✅ Tester avec les cartes de test avant de passer en live

## 🔄 Passer en production

1. **Activer votre compte Stripe** :
   - Compléter les informations légales
   - Ajouter les informations bancaires
   - Activer les paiements en direct

2. **Remplacer les clés de test par les clés live** :
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

3. **Tester le parcours complet** :
   - Faire un vrai paiement de test (petit montant)
   - Vérifier la réception de l'email
   - Vérifier dans le dashboard Stripe
   - Rembourser le paiement de test

## 📊 Suivi des paiements

- Dashboard Stripe : https://dashboard.stripe.com/payments
- Voir tous les paiements, remboursements, litiges
- Exporter les données pour comptabilité

## 🆘 Support

- Documentation Stripe : https://stripe.com/docs
- Support Stripe : https://support.stripe.com
- Communauté Stripe : https://discord.gg/stripe

## 💰 Tarifs Stripe

- **Frais par transaction** : 1,4% + 0,25€ (cartes européennes)
- Pas de frais d'abonnement
- Pas de frais cachés

Plus d'infos : https://stripe.com/fr/pricing
