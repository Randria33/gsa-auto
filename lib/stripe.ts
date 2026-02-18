import { loadStripe } from '@stripe/stripe-js';

// Clé publique Stripe (à remplacer par votre clé)
// Pour tester : utilisez une clé de test (commence par pk_test_)
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_votre_cle_publique_stripe');
