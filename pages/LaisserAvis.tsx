import React, { useState } from 'react';
import { ArrowLeft, Star, User, Mail, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react';

const LaisserAvis: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    service: '',
    note: 0,
    titre: '',
    commentaire: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Mécanique Générale',
    'Diagnostic Expert',
    'Vente Occasions',
    'Pièces Détachées',
    'Location Utilitaire',
    'Service Premium',
    'SELF-GARAGE'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, note: rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.note === 0) {
      alert('Veuillez sélectionner une note');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulation de l'envoi - À remplacer par votre API
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString()
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
            service: '',
            note: 0,
            titre: '',
            commentaire: ''
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors mb-4">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </a>
          <div className="flex items-center gap-4">
            <img src="/image/logo-gsa.png" alt="GSA Logo" className="h-12 object-contain" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Laisser un Avis</h1>
              <p className="text-slate-400 text-sm">Votre satisfaction est notre priorité</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-white border-b border-slate-200 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Votre avis compte ! Partagez votre expérience avec <strong>Garage Service Auto</strong> pour nous aider à améliorer nos services.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Message de succès */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <div>
                <h3 className="font-black text-green-900 text-lg mb-2">Merci pour votre avis !</h3>
                <p className="text-green-700">
                  Votre témoignage a été envoyé avec succès. Nous vous remercions pour le temps que vous avez pris pour partager votre expérience.
                </p>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="text-red-600" size={28} />
              </div>
              <div>
                <h3 className="font-black text-red-900 text-lg mb-2">Erreur d'envoi</h3>
                <p className="text-red-700">
                  Une erreur est survenue. Veuillez réessayer ou nous contacter directement au 06 77 34 36 73.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div>
              <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                <User className="text-red-600" size={24} />
                Vos Informations
              </h2>

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

              <div className="mt-4">
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
                <p className="text-xs text-slate-500 mt-1">Votre email ne sera pas publié</p>
              </div>
            </div>

            {/* Service utilisé */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                Service Utilisé *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div>
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Star className="text-red-600" size={24} />
                Votre Note
              </h2>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-sm text-slate-600 mb-4">Comment évaluez-vous notre service ?</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={48}
                        className={`transition-colors ${
                          rating <= (hoverRating || formData.note)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {formData.note > 0 && (
                  <p className="text-center mt-4 font-bold text-slate-900">
                    {formData.note === 1 && '⭐ Décevant'}
                    {formData.note === 2 && '⭐⭐ Moyen'}
                    {formData.note === 3 && '⭐⭐⭐ Bien'}
                    {formData.note === 4 && '⭐⭐⭐⭐ Très bien'}
                    {formData.note === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                  </p>
                )}
              </div>
            </div>

            {/* Avis */}
            <div>
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <MessageSquare className="text-red-600" size={24} />
                Votre Avis
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                    Titre de votre avis *
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    placeholder="Ex: Excellent service, très professionnel"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase text-slate-700 mb-2">
                    Votre commentaire *
                  </label>
                  <textarea
                    name="commentaire"
                    value={formData.commentaire}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none resize-none"
                    placeholder="Partagez votre expérience avec GSA : qualité du service, accueil, délais, tarifs..."
                    maxLength={500}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.commentaire.length}/500 caractères
                  </p>
                </div>
              </div>
            </div>

            {/* Consentement */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 text-red-600 border-slate-300 rounded focus:ring-red-600"
                />
                <span className="text-sm text-slate-700">
                  J'accepte que mon avis soit publié sur le site web et les réseaux sociaux de GSA.
                  Mon nom et prénom pourront être affichés, mais mon email restera confidentiel.
                </span>
              </label>
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
                  <Send size={20} />
                  Publier mon Avis
                </>
              )}
            </button>
          </form>
        </div>

        {/* Infos supplémentaires */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
            <h3 className="font-black uppercase text-sm mb-3">Pourquoi votre avis compte</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                Aide d'autres clients dans leur choix
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                Nous permet d'améliorer nos services
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                Renforce notre relation de confiance
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="font-black uppercase text-sm mb-3 text-slate-900">Besoin d'aide ?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Si vous avez une réclamation ou un problème à signaler, contactez-nous directement :
            </p>
            <a
              href="tel:0677343673"
              className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors"
            >
              <span>06 77 34 36 73</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaisserAvis;
