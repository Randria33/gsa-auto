/**
 * API Backend pour créer un PaymentIntent Stripe
 *
 * Ce fichier est un EXEMPLE de code backend.
 * Vous devez l'adapter selon votre stack backend :
 * - Node.js/Express
 * - Netlify Functions
 * - Vercel Serverless Functions
 * - Next.js API Routes
 * - etc.
 *
 * Installation requise : npm install stripe
 */

import Stripe from 'stripe';

// Initialiser Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

/**
 * Exemple pour Netlify Functions
 */
export const handler = async (event: any) => {
  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { amount, currency, reservationData, service } = JSON.parse(event.body);

    // Validation des données
    if (!amount || !currency || !reservationData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Données manquantes' })
      };
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Montant en centimes
      currency: currency || 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        service: service || 'SELF-GARAGE',
        nom: reservationData.nom,
        prenom: reservationData.prenom,
        email: reservationData.email,
        telephone: reservationData.telephone,
        date: reservationData.date,
        heureDebut: reservationData.heureDebut,
        duree: reservationData.duree,
      },
      description: `Réservation ${service} - ${reservationData.nom} ${reservationData.prenom}`,
      receipt_email: reservationData.email,
    });

    // TODO: Sauvegarder la réservation en base de données avec le payment_intent_id

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };
  } catch (error: any) {
    console.error('Erreur Stripe:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Erreur lors de la création du paiement'
      })
    };
  }
};

/**
 * Exemple pour Express.js
 */
/*
import express from 'express';
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, reservationData, service } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        service: service || 'SELF-GARAGE',
        ...reservationData
      },
      description: `Réservation ${service}`,
      receipt_email: reservationData.email,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
*/

/**
 * Exemple pour Vercel Serverless Functions
 */
/*
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, reservationData, service } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: { service, ...reservationData },
      description: `Réservation ${service}`,
      receipt_email: reservationData.email,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
}
*/

/**
 * WEBHOOK pour écouter les événements Stripe
 * Important : Créer un webhook endpoint sur https://dashboard.stripe.com/webhooks
 */
/*
export const webhookHandler = async (event: any) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret!
    );

    // Gérer différents types d'événements
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object;
        console.log('Paiement réussi:', paymentIntent.id);
        // TODO: Confirmer la réservation en base de données
        // TODO: Envoyer email de confirmation au client
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object;
        console.log('Paiement échoué:', failedPayment.id);
        // TODO: Notifier le client de l'échec
        break;

      default:
        console.log(`Event type ${stripeEvent.type} non géré`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error: any) {
    console.error('Erreur webhook:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
*/
