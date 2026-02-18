import React from 'react';
import { ArrowLeft, Truck, ShieldCheck, Clock, Phone, CheckCircle2, Calendar, CreditCard } from 'lucide-react';

const TarifsLocationUtilitaire: React.FC = () => {
  const tarifs = [
    {
      vehicule: 'Mercedes Sprinter 20m³',
      image: '/image/sprinter.jpg',
      capacite: '20m³ - Grand volume',
      specs: ['Hauteur intérieure : 2,10m', 'Longueur utile : 4,30m', 'Charge utile : 1 200kg'],
      tarifs: {
        jour: '90€',
        weekend: '160€',
        semaine: '450€',
        mois: '1200€'
      }
    },
    {
      vehicule: 'Renault Trafic 9 places',
      image: '/image/trafic.jpg',
      capacite: '9 places - Confortable',
      specs: ['Climatisation', 'Sièges modulables', 'GPS intégré'],
      tarifs: {
        jour: '70€',
        weekend: '130€',
        semaine: '380€',
        mois: '950€'
      }
    }
  ];

  const inclus = [
    'Assurance tous risques incluse',
    'Kilométrage illimité en option',
    'Véhicules propres et entretenus',
    'Assistance dépannage 24h/24',
    'Véhicules de moins de 3 ans',
    'Entretien régulier dans nos ateliers'
  ];

  const conditions = [
    {
      titre: 'Caution',
      description: 'Empreinte carte bancaire (pas de débit)',
      montant: '800€ (Sprinter) / 600€ (Trafic)'
    },
    {
      titre: 'Permis requis',
      description: 'Permis B de plus de 2 ans',
      montant: 'Conducteur 21 ans minimum'
    },
    {
      titre: 'Carburant',
      description: 'Restitution avec le même niveau',
      montant: 'Diesel'
    },
    {
      titre: 'Franchise',
      description: 'En cas de sinistre responsable',
      montant: '500€'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors mb-4">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </a>
          <div className="flex items-center gap-4">
            <img src="/image/logo-gsa.png" alt="GSA Logo" className="h-12 object-contain" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Location Utilitaire</h1>
              <p className="text-slate-400 text-sm">Sprinter & Trafic - Tarifs et Conditions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            Besoin d'un <span className="text-red-600">Utilitaire</span> ?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Nous disposons d'une flotte d'utilitaires récents (<strong>Sprinter 20m³</strong> et <strong>Trafic 9 places</strong>)
            entretenus par nos soins pour garantir vos trajets.
          </p>
        </div>
      </div>

      {/* Tarifs des véhicules */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black uppercase mb-12 flex items-center justify-center gap-2">
          <Truck className="text-red-600" size={32} />
          Nos Véhicules & Tarifs
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tarifs.map((vehicule, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <img
                  src={vehicule.image}
                  alt={vehicule.vehicule}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-black text-white uppercase">{vehicule.vehicule}</h3>
                  <p className="text-white/80 text-sm">{vehicule.capacite}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Caractéristiques */}
                <div className="mb-6">
                  <h4 className="font-black uppercase text-sm mb-3 text-slate-700">Caractéristiques</h4>
                  <div className="space-y-2">
                    {vehicule.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="text-red-600 shrink-0" size={16} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grille tarifaire */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-black uppercase text-sm mb-3 text-slate-700">Tarifs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">1 Journée :</span>
                      <span className="font-black text-red-600">{vehicule.tarifs.jour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Weekend (2j) :</span>
                      <span className="font-black text-red-600">{vehicule.tarifs.weekend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">1 Semaine :</span>
                      <span className="font-black text-red-600">{vehicule.tarifs.semaine}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-sm text-slate-600">1 Mois :</span>
                      <span className="font-black text-green-600 text-lg">{vehicule.tarifs.mois}</span>
                    </div>
                  </div>
                </div>

                {/* Bouton réservation */}
                <a
                  href="tel:0677343673"
                  className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-black uppercase text-sm tracking-wider hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Réserver ce Véhicule
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Services inclus */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <ShieldCheck className="text-red-600" size={32} />
            Services Inclus
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {inclus.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={24} />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions de location */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <CreditCard className="text-red-600" size={32} />
            Conditions de Location
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {conditions.map((condition, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-black uppercase text-sm mb-2 text-red-600">{condition.titre}</h4>
                <p className="text-slate-700 mb-2">{condition.description}</p>
                <p className="font-bold text-slate-900">{condition.montant}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Processus de réservation */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <Calendar className="text-red-600" size={32} />
            Comment Réserver ?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { etape: '1', titre: 'Appelez-nous', desc: '06 77 34 36 73 pour vérifier la disponibilité' },
              { etape: '2', titre: 'Réservation', desc: 'Nous notons votre réservation et préparons le véhicule' },
              { etape: '3', titre: 'Pièces requises', desc: 'Permis de conduire + Pièce d\'identité + CB pour caution' },
              { etape: '4', titre: 'Départ', desc: 'État des lieux et vous partez avec le véhicule' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4">
                  {step.etape}
                </div>
                <h4 className="font-black uppercase text-sm mb-2">{step.titre}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-12 text-white">
          <h3 className="text-3xl font-black uppercase mb-4">Prêt à Réserver ?</h3>
          <p className="text-lg mb-8 opacity-90">
            Appelez-nous maintenant pour vérifier la disponibilité et réserver votre véhicule
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="tel:0677343673"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Phone size={20} />
              06 77 34 36 73
            </a>
            <a
              href="#contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white/20 transition-all"
            >
              Demander un Devis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarifsLocationUtilitaire;
