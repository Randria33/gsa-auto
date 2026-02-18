import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Euro, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const ReservationSelfGarage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date: '',
    heureDebut: '08:00',
    duree: '2',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calcul du tarif avec dégressivité
  const calculerTarif = (duree: number) => {
    if (duree <= 2) return duree * 35;
    if (duree <= 4) return duree * 32;
    if (duree <= 8) return duree * 28;
    return duree * 25;
  };

  const tarif = calculerTarif(parseInt(formData.duree) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation de l'envoi - À remplacer par votre API
      const response = await fetch('/api/reservation-self-garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tarif,
          service: 'SELF-GARAGE'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            date: '',
            heureDebut: '08:00',
            duree: '2',
            message: ''
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors mb-4">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </a>
          <div className="flex items-center gap-4">
            <img src="/image/logo-gsa.png" alt="GSA Logo" className="h-12 object-contain" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">SELF-GARAGE</h1>
              <p className="text-slate-400 text-sm">Réservation de pont élévateur</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <Calendar className="text-red-600" size={28} />
                Formulaire de Réservation
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <p className="font-bold text-green-900">Réservation envoyée !</p>
                    <p className="text-sm text-green-700">Nous vous contacterons sous 24h pour confirmer.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={24} />
                  <div>
                    <p className="font-bold text-red-900">Erreur d'envoi</p>
                    <p className="text-sm text-red-700">Veuillez réessayer ou nous appeler au 06 77 34 36 73</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>

                {/* Date et horaires */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Heure de début *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select
                        name="heureDebut"
                        value={formData.heureDebut}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none appearance-none"
                      >
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                      Durée (heures) *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select
                        name="duree"
                        value={formData.duree}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none appearance-none"
                      >
                        <option value="1">1 heure</option>
                        <option value="2">2 heures</option>
                        <option value="3">3 heures</option>
                        <option value="4">4 heures</option>
                        <option value="5">5 heures</option>
                        <option value="6">6 heures</option>
                        <option value="8">8 heures (journée)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                    Détails de l'intervention (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none resize-none"
                    placeholder="Décrivez brièvement les travaux prévus..."
                  />
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Confirmer la Réservation
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Récapitulatif */}
          <div className="space-y-6">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/image/pont.png"
                alt="Pont élévateur"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-black uppercase text-lg mb-2">SELF-GARAGE</h3>
                <p className="text-sm text-slate-600">Location de pont + outillages standard</p>
              </div>
            </div>

            {/* Tarif */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-black uppercase text-lg mb-4 flex items-center gap-2">
                <Euro size={24} />
                Tarif Estimé
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Durée :</span>
                  <span className="font-bold">{formData.duree}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tarif/heure :</span>
                  <span className="font-bold">{calculerTarif(parseInt(formData.duree)) / parseInt(formData.duree)}€</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-black uppercase">Total :</span>
                    <span className="text-3xl font-black">{tarif}€</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/80 mt-4">
                * Tarif indicatif. Confirmation par email après validation.
              </p>
            </div>

            {/* Tarifs dégressifs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-black uppercase text-sm mb-4">Tarifs Dégressifs</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">1-2h :</span>
                  <span className="font-bold">35€/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">3-4h :</span>
                  <span className="font-bold">32€/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">5-8h :</span>
                  <span className="font-bold">28€/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">+8h :</span>
                  <span className="font-bold">25€/h</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-black uppercase text-sm mb-4">Besoin d'aide ?</h3>
              <a href="tel:0677343673" className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                <Phone size={18} />
                <span className="font-bold">06 77 34 36 73</span>
              </a>
              <p className="text-xs text-slate-400 mt-3">
                Du lundi au samedi<br />
                8h - 18h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSelfGarage;
