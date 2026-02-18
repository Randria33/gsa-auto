import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

interface StripeCheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  clientSecret?: string;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({
  amount,
  onSuccess,
  onError,
  clientSecret
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/reservation-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Une erreur est survenue lors du paiement');
        onError(error.message || 'Erreur de paiement');
      } else {
        onSuccess();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de paiement';
      setErrorMessage(message);
      onError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-slate-600">Initialisation du paiement...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <CreditCard className="text-red-600" size={24} />
          Informations de Paiement
        </h3>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card', 'paypal']
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-bold text-red-900 text-sm">Erreur de paiement</p>
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-600">Montant à payer :</span>
          <span className="text-3xl font-black text-red-600">{amount}€</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Paiement sécurisé par Stripe • Vos données bancaires sont protégées
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Paiement en cours...
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            Payer {amount}€ et Confirmer
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-500">
        En cliquant sur "Payer", vous acceptez nos conditions générales de vente
      </p>
    </form>
  );
};

export default StripeCheckoutForm;
