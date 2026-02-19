
import React, { useEffect, useState } from 'react';
import {
  Phone, MapPin, Mail, Clock, Star, Wrench, ShieldCheck, CheckCircle2,
  Truck, ShoppingCart, Package, Navigation, Gauge, Menu, X, ChevronRight,
  Award, Users, Calendar, Heart, Quote, Euro, Zap, ArrowRight, Facebook,
  Instagram, Twitter, CheckCircle, Car, Settings, TrendingUp, FileText
} from 'lucide-react';

// --- Types ---
interface ServiceDetail {
  title: string;
  icon: any;
  description: string;
  features: string[];
  benefits: string[];
  pricing: string;
  duration: string;
  img: string;
}

interface VehicleDetail {
  name: string;
  year: string;
  km: string;
  price: string;
  features: string[];
  img: string;
  images: string[]; // Carrousel d'images (4 vues minimum)
  description: string;
  specs: {
    carburant: string;
    transmission: string;
    puissance: string;
    portes: string;
    places: string;
    couleur: string;
    premiere_mise: string;
    controle_tech: string;
  };
  equipements: string[];
  garantie: string;
}

// --- Composants Internes ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/image/logo-gsa.png" alt="GSA Logo" className="h-10 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x40?text=GSA'} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Accueil', 'Services', 'À Propos', 'Occasions', 'Location', 'Témoignages', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-').replace('à', 'a')}`} className={`text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              {item}
            </a>
          ))}
          <a href="tel:0677343673" className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-wider flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 neon-glow">
            <Phone size={16} /> 06 77 34 36 73
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-red-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col p-6 gap-4 border-t border-slate-100 animate-fadeIn">
          {['Accueil', 'Services', 'À Propos', 'Occasions', 'Location', 'Témoignages', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-').replace('à', 'a')}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-slate-900 uppercase tracking-tighter border-b border-slate-50 pb-2 hover:text-red-600 transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// Modal de détails de véhicule
const VehicleModal = ({ vehicle, onClose }: { vehicle: VehicleDetail | null, onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!vehicle) return null;

  const images = vehicle.images || [vehicle.img];
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        {/* Header avec carrousel d'images */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl group">
          <img
            src={images[currentImageIndex]}
            alt={`${vehicle.name} - Vue ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500"
            onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

          {/* Boutons de navigation carrousel */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicateurs de position */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Compteur d'images */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-10"
          >
            <X size={24} />
          </button>
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase shadow-lg">
            Disponible
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{vehicle.name}</h2>
            <div className="flex items-center gap-4 text-white/80">
              <span>{vehicle.year}</span>
              <span>•</span>
              <span>{vehicle.km}</span>
              <span>•</span>
              <span className="text-2xl font-black text-red-500">{vehicle.price}</span>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-slate-600 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Caractéristiques techniques */}
          <div className="mb-8">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Settings className="text-red-600" size={24} />
              Caractéristiques Techniques
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Carburant</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.carburant}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Transmission</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.transmission}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Puissance</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.puissance}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Portes</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.portes}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Places</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.places}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Couleur</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.couleur}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">1ère Mise en Circ.</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.premiere_mise}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-1">Contrôle Technique</span>
                <span className="text-lg font-bold text-slate-900">{vehicle.specs.controle_tech}</span>
              </div>
            </div>
          </div>

          {/* Équipements */}
          <div className="mb-8">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Settings className="text-red-600" size={24} />
              Équipements & Options
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {vehicle.equipements.map((equip, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <CheckCircle2 className="text-red-600 shrink-0" size={18} />
                  <span className="text-sm text-slate-700">{equip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Garantie et contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2 text-red-600">
                <ShieldCheck size={24} />
                Garantie Incluse
              </h3>
              <p className="text-slate-700 mb-4">{vehicle.garantie}</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="text-red-600" size={16} />
                  Véhicule révisé dans nos ateliers
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="text-red-600" size={16} />
                  Historique d'entretien vérifié
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="text-red-600" size={16} />
                  Contrôle technique OK
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-black uppercase mb-4">Intéressé par ce Véhicule ?</h3>
              <div className="space-y-3">
                <a href="tel:0677343673" className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/20 transition-all">
                  <Phone size={20} />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">Appelez-nous</span>
                    <span className="font-bold">06 77 34 36 73</span>
                  </div>
                </a>
                <a href="#contact" onClick={onClose} className="flex items-center gap-3 bg-red-600 px-4 py-3 rounded-xl hover:bg-red-700 transition-all font-black uppercase text-sm justify-center">
                  Essayer ce Véhicule
                  <ArrowRight size={16} />
                </a>
                <p className="text-xs text-white/60 text-center mt-3">
                  Financement possible • Reprise de votre ancien véhicule
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de détails de service
const ServiceModal = ({ service, onClose }: { service: ServiceDetail | null, onClose: () => void }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        {/* Header avec image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const fallbacks: { [key: string]: string } = {
                'mecanique-generale.jpg': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
                'diagnostic-expert.jpg': 'https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=800&auto=format&fit=crop',
                'vente-occasions.jpg': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop',
                'pieces-detachees.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
                'location-utilitaire.jpg': 'https://images.unsplash.com/photo-1606206591513-adbf01ac2cee?q=80&w=800&auto=format&fit=crop',
                'service-premium.jpg': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
                'sprinter.jpg': 'https://images.unsplash.com/photo-1527450133-0e7c49020e6a?q=80&w=800&auto=format&fit=crop',
            'pont.png': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop'
              };
              const filename = service.img.split('/').pop() || '';
              e.currentTarget.src = fallbacks[filename] || 'https://placehold.co/800x600?text=' + encodeURIComponent(service.title);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-xl">
              <service.icon size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{service.title}</h2>
              <p className="text-white/80 text-sm">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Informations pratiques */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                <FileText className="text-red-600" size={20} />
                Informations Pratiques
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Tarif Indicatif</span>
                  <p className="text-2xl font-black text-red-600">{service.pricing}</p>
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Durée</span>
                  <p className="text-lg font-bold text-slate-900">{service.duration}</p>
                </div>
              </div>
            </div>

            {/* Contact rapide */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-black uppercase mb-4">Réserver ce Service</h3>
              <div className="space-y-3">
                <a href="tel:0677343673" className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/30 transition-all">
                  <Phone size={20} />
                  <span className="font-bold">06 77 34 36 73</span>
                </a>
                {service.title === "SELF-GARAGE" ? (
                  <a href="/reservation-self-garage" className="flex items-center gap-3 bg-white text-red-600 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all font-black uppercase text-sm justify-center">
                    <Calendar size={16} />
                    Réserver en Ligne
                    <ArrowRight size={16} />
                  </a>
                ) : service.title === "Location Utilitaire" ? (
                  <a href="/tarifs-location-utilitaire" className="flex items-center gap-3 bg-white text-red-600 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all font-black uppercase text-sm justify-center">
                    <Truck size={16} />
                    Consulter les Tarifs
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <a href="#contact" onClick={onClose} className="flex items-center gap-3 bg-white text-red-600 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all font-black uppercase text-sm justify-center">
                    Demander un Devis
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Prestations incluses */}
          <div className="mb-8">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <CheckCircle className="text-red-600" size={24} />
              Prestations Incluses
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avantages */}
          <div>
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Award className="text-red-600" size={24} />
              Vos Avantages
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <Zap className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, img, delay, onClick }: any) => (
  <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover">
    <div className="h-48 overflow-hidden relative image-overlay">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          const fallbacks: { [key: string]: string } = {
            'mecanique-generale.jpg': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
            'diagnostic-expert.jpg': 'https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=800&auto=format&fit=crop',
            'vente-occasions.jpg': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop',
            'pieces-detachees.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
            'location-utilitaire.jpg': 'https://images.unsplash.com/photo-1606206591513-adbf01ac2cee?q=80&w=800&auto=format&fit=crop',
            'service-premium.jpg': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
            'sprinter.jpg': 'https://images.unsplash.com/photo-1527450133-0e7c49020e6a?q=80&w=800&auto=format&fit=crop',
            'pont.png': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop'
          };
          const filename = img.split('/').pop() || '';
          e.currentTarget.src = fallbacks[filename] || 'https://placehold.co/800x600?text=' + encodeURIComponent(title);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="p-2 bg-red-600 rounded-lg text-white group-hover:scale-110 transition-transform">
          <Icon size={20} />
        </div>
        <h4 className="text-white font-black uppercase text-xs tracking-widest">{title}</h4>
      </div>
    </div>
    <div className="p-6">
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
      <button
        onClick={onClick}
        className="flex items-center text-red-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-2 transition-all hover:text-red-700"
      >
        En savoir plus <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

// Bouton Scroll to Top
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-110 neon-glow animate-fadeIn"
          aria-label="Retour en haut"
        >
          <ChevronRight size={24} className="rotate-[-90deg]" />
        </button>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetail | null>(null);

  // Détails complets des services
  const servicesDetails: ServiceDetail[] = [
    {
      title: "Mécanique Générale",
      icon: Wrench,
      description: "Entretien et réparation toutes marques",
      img: "image/mecanique-generale.jpg",
      pricing: "À partir de 80€",
      duration: "1h à 4h selon intervention",
      features: [
        "Révision complète constructeur avec pièces d'origine",
        "Vidange moteur et remplacement des filtres (huile, air, habitacle)",
        "Contrôle et remplacement freinage (plaquettes, disques, liquide)",
        "Diagnostic et réparation système de suspension",
        "Remplacement distribution (courroie/chaîne)",
        "Embrayage et boîte de vitesses",
        "Échappement et système antipollution",
        "Contrôle technique et contre-visite gratuite"
      ],
      benefits: [
        "Garantie pièces et main d'œuvre",
        "Maintien de la garantie constructeur",
        "Devis détaillé gratuit sous 24h",
        "Véhicule de prêt disponible",
        "Paiement en plusieurs fois possible",
        "Historique d'entretien conservé"
      ]
    },
    {
      title: "Diagnostic Expert",
      icon: Gauge,
      description: "Diagnostic électronique de précision",
      img: "image/diagnostic-expert.jpg",
      pricing: "À partir de 60€",
      duration: "30 min à 2h",
      features: [
        "Lecture complète des codes défauts OBD",
        "Diagnostic moteur et transmission",
        "Analyse système ABS et ESP",
        "Contrôle airbags et sécurité",
        "Test batterie et alternateur",
        "Diagnostic climatisation",
        "Analyse système d'injection",
        "Rapport détaillé avec photos"
      ],
      benefits: [
        "Équipement de diagnostic professionnel multi-marques",
        "Techniciens certifiés et formés",
        "Résolution rapide des pannes",
        "Effacement codes défauts inclus",
        "Conseil personnalisé",
        "Devis précis après diagnostic"
      ]
    },
    {
      title: "Vente Occasions",
      icon: ShoppingCart,
      description: "Véhicules sélectionnés et garantis",
      img: "image/vente-occasions.jpg",
      pricing: "De 8 000€ à 25 000€",
      duration: "Essai immédiat",
      features: [
        "Sélection rigoureuse de véhicules récents",
        "Contrôle technique datant de moins de 6 mois",
        "Révision complète effectuée dans nos ateliers",
        "Garantie légale de conformité (6 mois minimum)",
        "Historique d'entretien vérifié",
        "Carnet d'entretien à jour",
        "Essai routier sans engagement",
        "Recherche personnalisée selon vos critères"
      ],
      benefits: [
        "Financement sur mesure avec nos partenaires",
        "Reprise de votre ancien véhicule",
        "Garantie panne mécanique possible",
        "Livraison à domicile disponible",
        "Suivi après-vente garanti",
        "Tous nos véhicules sont prêts à rouler"
      ]
    },
    {
      title: "Pièces Détachées",
      icon: Package,
      description: "Large stock de pièces de qualité",
      img: "image/pieces-detachees.jpg",
      pricing: "Prix compétitifs",
      duration: "Disponible immédiatement",
      features: [
        "Pièces d'origine constructeur",
        "Pièces adaptables qualité équivalente",
        "Stock permanent : freinage, filtration, éclairage",
        "Batteries toutes marques",
        "Pneus été/hiver toutes dimensions",
        "Huiles moteur et liquides",
        "Accessoires et consommables",
        "Commande express 24h pour pièces spécifiques"
      ],
      benefits: [
        "Garantie constructeur sur pièces d'origine",
        "Conseil technique gratuit",
        "Installation possible dans nos ateliers",
        "Prix attractifs pour particuliers et professionnels",
        "Vente comptoir directe",
        "Programme de fidélité"
      ]
    },
    {
      title: "Location Utilitaire",
      icon: Truck,
      description: "Sprinter et Trafic disponibles",
      img: "image/sprinter.jpg",
      pricing: "À partir de 60€/jour",
      duration: "De 1 jour à plusieurs semaines",
      features: [
        "Mercedes Sprinter 20m³ grand volume",
        "Renault Trafic 9 places confortable",
        "Véhicules récents et entretenus",
        "Assurance tous risques incluse",
        "Kilométrage illimité en option",
        "Possibilité location aller simple",
        "Véhicules propres et désinfectés",
        "Disponibilité 7j/7 sur réservation"
      ],
      benefits: [
        "Tarifs dégressifs séjours longue durée",
        "Caution demandée (empreinte CB ou chèque)",
        "Assistance dépannage 24h/24",
        "Carburant : restitution niveau identique",
        "Équipement : sangles et couvertures fournies",
        "Réservation simple par téléphone"
      ]
    },
    {
      title: "Service Premium",
      icon: Navigation,
      description: "Services à la carte pour votre confort",
      img: "image/service-premium.jpg",
      pricing: "Sur devis",
      duration: "Variable selon service",
      features: [
        "Convoyage de votre véhicule à domicile/travail",
        "Véhicule de courtoisie récent pendant réparations",
        "Service Jockey : nous récupérons et restituons votre auto",
        "Intervention à domicile pour dépannages légers",
        "Nettoyage intérieur/extérieur premium",
        "Livraison de véhicule d'occasion à domicile",
        "Assistance administrative (carte grise, contrôle technique)",
        "Suivi personnalisé SMS/Email"
      ],
      benefits: [
        "Gain de temps précieux",
        "Zéro contrainte pour vous",
        "Disponible pour professionnels et particuliers",
        "Service sur-mesure adapté à vos besoins",
        "Assistance 7j/7 pour urgences",
        "Relation de confiance et proximité"
      ]
    },
    {
      title: "SELF-GARAGE",
      icon: Settings,
      description: "Location de pont + outillages standard",
      img: "image/pont.png",
      pricing: "À partir de 35€/heure",
      duration: "Tarif dégressif",
      features: [
        "Location de pont élévateur professionnel",
        "Outillage standard fourni (clés, crics, chandelles)",
        "Espace de travail propre et sécurisé",
        "Conseils techniques gratuits sur place",
        "Accès aux équipements de diagnostic",
        "Tarif dégressif selon durée de location",
        "Réservation simple et flexible",
        "Idéal pour entretien et réparations simples"
      ],
      benefits: [
        "Économisez sur la main d'œuvre",
        "Travaillez dans de bonnes conditions",
        "Encadrement professionnel disponible",
        "Matériel professionnel à disposition",
        "Tarifs avantageux pour bricoleurs",
        "Parking sécurisé pendant les travaux"
      ]
    }
  ];

  // Détails complets des véhicules
  const vehiclesDetails: VehicleDetail[] = [
    {
      name: 'Renault Clio V',
      year: '2020',
      km: '45 000 km',
      price: '12 900€',
      features: ['Essence', 'Boîte Auto', 'Garantie 6 mois'],
      img: 'image/occasion-clio.jpg',
      images: [
        'image/occasion-clio-face.jpg',
        'image/occasion-clio-profil-gauche.jpg',
        'image/occasion-clio-profil-droit.jpg',
        'image/occasion-clio-arriere.jpg',
        'image/occasion-clio-interieur.jpg'
      ],
      description: 'Renault Clio V en excellent état, parfaite pour la ville. Entretien suivi chez Renault avec carnet à jour. Un seul propriétaire, non fumeur. Véhicule révisé et contrôlé dans nos ateliers.',
      specs: {
        carburant: 'Essence',
        transmission: 'Automatique',
        puissance: '100 ch',
        portes: '5 portes',
        places: '5 places',
        couleur: 'Gris Titanium',
        premiere_mise: '03/2020',
        controle_tech: 'OK 12/2025'
      },
      equipements: [
        'Climatisation automatique',
        'Régulateur de vitesse',
        'Aide au parking arrière',
        'Bluetooth & USB',
        'Volant multifonctions',
        'Vitres électriques',
        'Rétroviseurs électriques',
        'Ordinateur de bord',
        'ESP & ABS'
      ],
      garantie: 'Garantie légale de conformité 6 mois incluse. Extension garantie panne mécanique possible jusqu\'à 24 mois.'
    },
    {
      name: 'Peugeot 308 II',
      year: '2019',
      km: '62 000 km',
      price: '15 500€',
      features: ['Diesel', 'GPS', 'Caméra de recul'],
      img: 'image/occasion-308.jpg',
      images: [
        'image/occasion-308-face.jpg',
        'image/occasion-308-profil-gauche.jpg',
        'image/occasion-308-profil-droit.jpg',
        'image/occasion-308-arriere.jpg',
        'image/occasion-308-interieur.jpg',
        'image/occasion-308-coffre.jpg'
      ],
      description: 'Peugeot 308 Phase 2 Allure avec équipements complets. Idéale pour les longs trajets grâce à son moteur diesel économique. Entretien régulier effectué, pneus récents. État impeccable intérieur et extérieur.',
      specs: {
        carburant: 'Diesel',
        transmission: 'Manuelle 6',
        puissance: '130 ch',
        portes: '5 portes',
        places: '5 places',
        couleur: 'Blanc Nacré',
        premiere_mise: '06/2019',
        controle_tech: 'OK 01/2026'
      },
      equipements: [
        'GPS 3D connecté',
        'Caméra de recul',
        'Radar de stationnement AV/AR',
        'Climatisation bi-zone',
        'Sièges chauffants',
        'Régulateur de vitesse adaptatif',
        'Jantes alliage 17"',
        'Feux LED',
        'Écran tactile 9.7"',
        'Détecteur angle mort',
        'Frein parking électrique',
        'Bluetooth & CarPlay'
      ],
      garantie: 'Garantie constructeur transférable 12 mois incluse. Assistance dépannage 24h/24 pendant 1 an.'
    },
    {
      name: 'Volkswagen Golf VIII',
      year: '2021',
      km: '38 000 km',
      price: '18 900€',
      features: ['Hybride', 'Full Options', 'Garantie 12 mois'],
      img: 'image/occasion-golf.jpg',
      images: [
        'image/occasion-golf-face.jpg',
        'image/occasion-golf-profil-gauche.jpg',
        'image/occasion-golf-profil-droit.jpg',
        'image/occasion-golf-arriere.jpg',
        'image/occasion-golf-interieur.jpg',
        'image/occasion-golf-tableau-bord.jpg'
      ],
      description: 'Volkswagen Golf 8 eTSI hybride légère, technologie de pointe et faible consommation. Configuration haut de gamme avec tous les équipements. Garantie constructeur jusqu\'en 2026. Comme neuve.',
      specs: {
        carburant: 'Hybride Essence',
        transmission: 'Auto DSG7',
        puissance: '150 ch',
        portes: '5 portes',
        places: '5 places',
        couleur: 'Bleu Atlantique',
        premiere_mise: '02/2021',
        controle_tech: 'OK 02/2026'
      },
      equipements: [
        'GPS Digital Cockpit Pro',
        'Caméra 360°',
        'Park Assist (stationnement auto)',
        'Climatisation 3 zones',
        'Sièges cuir chauffants + massage',
        'Régulateur adaptatif ACC',
        'Lane Assist maintien voie',
        'Jantes 18" diamantées',
        'Phares Matrix LED',
        'Écran 10" tactile',
        'Chargeur sans fil',
        'Détection panneaux',
        'Hayon électrique',
        'Système audio Harman Kardon',
        'Apple CarPlay & Android Auto'
      ],
      garantie: 'Garantie constructeur Volkswagen jusqu\'en 02/2026. Extension possible. Entretien gratuit la 1ère année.'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-['Inter']">
      <Navbar />
      <ScrollToTop />
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />

      {/* --- HERO SECTION --- */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="image/hero-garage.jpg"
            className="w-full h-full object-cover grayscale-[0.3]"
            alt="Garage Background"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1486006396193-471d6f58c630?q=80&w=2000&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="space-y-8 animate-slideInLeft">
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-600/30 px-4 py-2 rounded-full glass-effect">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Ouvert : Lun - Sam / 9h - 18h</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter text-shadow-lg">
              L'Expertise<br/><span className="text-red-600 italic gradient-text">Automobile</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
              Garage Service Auto (GSA) vous accompagne à Pont-Sainte-Marie pour l'entretien, la vente et la location de véhicules. Plus de <strong className="text-white">3 ans de confiance</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-1 neon-glow">
                Prendre Rendez-vous
              </a>
              <a href="#services" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all glass-effect">
                Nos Services
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-slideInRight">
            <div className="relative group">
                <div className="absolute -inset-4 bg-red-600/20 rounded-[40px] blur-2xl group-hover:bg-red-600/40 transition-all"></div>
                <img src="/image/logo-gsa.png" alt="GSA Large" className="relative h-64 object-contain drop-shadow-2xl animate-float" onError={(e) => e.currentTarget.src = 'https://placehold.co/400x400?text=GSA'} />
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-slate-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { label: "Années d'Expérience", value: "3+", icon: Award },
            { label: "Véhicules Vendus", value: "450+", icon: Car },
            { label: "Clients Satisfaits", value: "1.2k", icon: Users },
            { label: "Pièces en Stock", value: "5k+", icon: Package }
          ].map((stat, i) => (
            <div key={i} className="text-center group animate-scaleIn" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mb-3 flex justify-center">
                <stat.icon className="text-red-600 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-red-600 transition-colors">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-red-600 font-black uppercase text-sm tracking-[0.4em]">Nos Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Tout pour votre <span className="text-slate-300">Mobilité</span>
            </h3>
            <p className="text-slate-500">Un garage moderne alliant savoir-faire traditionnel et technologies de pointe.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesDetails.map((service, idx) => (
              <ServiceCard
                key={idx}
                icon={service.icon}
                title={service.title}
                desc={service.description}
                img={service.img}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- À PROPOS SECTION --- */}
      <section id="a-propos" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-red-600 font-black uppercase text-sm tracking-[0.4em] mb-4">Notre Histoire</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                Plus de <span className="text-red-600">3 Ans</span> à Votre Service
              </h3>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="text-lg">
                Fondé en 2021, <strong className="text-slate-900">Garage Service Auto (GSA)</strong> est devenu une référence dans la région de Pont-Sainte-Marie pour la qualité de ses services automobiles.
              </p>
              <p>
                Notre équipe de <strong>mécaniciens expérimentés et passionnés</strong> met tout en œuvre pour garantir votre satisfaction. Que ce soit pour un simple entretien ou une réparation complexe, nous traitons chaque véhicule avec le même soin et la même rigueur.
              </p>
              <p>
                Au-delà de la mécanique, nous proposons également un <strong>service complet</strong> incluant la vente de véhicules d'occasion sélectionnés, la location d'utilitaires et la vente de pièces détachées de qualité.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-red-600 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">Transparence Totale</h4>
                  <p className="text-sm text-slate-500">Devis détaillés et explications claires</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-red-600 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">Expertise Certifiée</h4>
                  <p className="text-sm text-slate-500">Formation continue et équipement moderne</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/10 rounded-3xl blur-2xl"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <img
                src="image/atelier-1.jpg"
                alt="Atelier GSA"
                className="rounded-2xl shadow-xl object-cover h-64 w-full"
                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop'}
              />
              <img
                src="image/mecanicien.png"
                alt="Mécanicien GSA"
                className="rounded-2xl shadow-xl object-cover h-64 w-full mt-8"
                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1632823469621-d1b8fe0b9002?q=80&w=800&auto=format&fit=crop'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- OCCASIONS SECTION --- */}
      <section id="occasions" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-red-600 font-black uppercase text-sm tracking-[0.4em]">Véhicules Disponibles</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Nos <span className="text-slate-300">Occasions</span> Sélectionnées
            </h3>
            <p className="text-slate-500">Tous nos véhicules sont révisés, garantis et prêts à prendre la route.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {vehiclesDetails.map((car, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 card-hover">
                <div className="h-56 overflow-hidden relative image-overlay">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop'}
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase shadow-lg">
                    Disponible
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase">{car.name}</h4>
                      <p className="text-sm text-slate-500">{car.year} • {car.km}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-red-600">{car.price}</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-red-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedVehicle(car)}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    Plus d'Infos <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 neon-glow">
              Voir Tous les Véhicules <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* --- RENTAL SECTION --- */}
      <section id="location" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Besoin d'un <span className="text-red-600">Utilitaire ?</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Nous disposons d'une flotte d'utilitaires récents (Sprinter 20m³ et Trafic 9 places) entretenus par nos soins pour garantir vos trajets.
            </p>
            <ul className="space-y-4">
              {[
                "Location à la journée ou à la semaine",
                "Assurance tous risques incluse",
                "Caution demandée (empreinte CB)",
                "Véhicules propres et entretenus",
                "Assistance dépannage 24h/24"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                  <CheckCircle2 className="text-red-600" size={20} /> {item}
                </li>
              ))}
            </ul>
            <div className="pt-4">
               <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Consulter les Tarifs
               </button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all card-hover">
                  <img
                    src="image/Srpinter_Fourgon.png"
                    className="h-40 object-contain group-hover:scale-105 transition-transform"
                    alt="Mercedes Sprinter"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/400x200?text=SPRINTER'}
                  />
                  <h4 className="mt-4 font-black text-xl uppercase italic">Mercedes Sprinter</h4>
                  <span className="text-[10px] text-red-600 font-black uppercase tracking-[0.3em] mt-2">Grand Volume 20m³</span>
                  <div className="mt-4 text-2xl font-black text-slate-900">À partir de 80€/jour</div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all card-hover">
                  <img
                    src="image/trafic.jpg"
                    className="h-40 object-contain group-hover:scale-105 transition-transform"
                    alt="Renault Trafic"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/400x200?text=TRAFIC'}
                  />
                  <h4 className="mt-4 font-black text-xl uppercase italic">Renault Trafic</h4>
                  <span className="text-[10px] text-red-600 font-black uppercase tracking-[0.3em] mt-2">9 Places / Transport</span>
                  <div className="mt-4 text-2xl font-black text-slate-900">À partir de 60€/jour</div>
              </div>
          </div>
        </div>
      </section>

      {/* --- GARANTIES & CERTIFICATIONS --- */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              Nos <span className="text-red-600">Garanties</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Garantie Constructeur', desc: 'Préservée' },
              { icon: Award, title: 'Pièces d\'Origine', desc: 'Certifiées' },
              { icon: Clock, title: 'Disponibilité', desc: '7j/7' },
              { icon: TrendingUp, title: 'Prix Justes', desc: 'Transparents' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all group-hover:scale-110">
                  <item.icon size={32} />
                </div>
                <h4 className="font-black text-sm uppercase mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TÉMOIGNAGES SECTION --- */}
      <section id="temoignages" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-red-600 font-black uppercase text-sm tracking-[0.4em]">Avis Clients</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Ils Nous Font <span className="text-red-600">Confiance</span>
            </h3>
            <p className="text-slate-500">Plus de 1200 clients satisfaits nous recommandent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sophie Martin',
                role: 'Particulier',
                text: 'Service impeccable ! Mon véhicule a été réparé rapidement et le tarif était très correct. Je recommande vivement GSA pour leur professionnalisme.',
                rating: 5,
                img: 'image/temoignage-1.jpg'
              },
              {
                name: 'Marc Dubois',
                role: 'Chef d\'entreprise',
                text: 'Nous faisons appel à GSA pour l\'entretien de notre flotte de véhicules. Toujours réactifs et de bon conseil, c\'est un vrai partenaire de confiance.',
                rating: 5,
                img: 'image/temoignage-2.jpg'
              },
              {
                name: 'Caroline Petit',
                role: 'Particulier',
                text: 'J\'ai acheté ma voiture d\'occasion chez GSA il y a 6 mois. Aucun problème depuis, véhicule nickel et excellent suivi. Équipe au top !',
                rating: 5,
                img: 'image/temoignage-3.jpg'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-500 card-hover relative">
                <div className="absolute top-6 right-6 text-red-600/10">
                  <Quote size={60} strokeWidth={3} />
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-red-600/10"
                    onError={(e) => e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=e11d48&color=fff&size=128`}
                  />
                  <div>
                    <h4 className="font-black text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-red-600 text-red-600" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
              <Heart className="mx-auto mb-4 animate-pulse" size={48} />
              <h4 className="text-3xl font-black uppercase mb-4">Votre Avis Compte !</h4>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Vous avez utilisé nos services ? Partagez votre expérience pour aider d'autres clients et nous permettre de progresser.
              </p>
              <a href="/laisser-avis" className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl">
                Laisser un Avis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Contactez<br/>votre <span className="text-red-600">Garage</span></h3>
              <p className="text-slate-500">Une question ? Un devis ? Nos experts vous répondent sous 24h.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-1">Localisation</h5>
                  <p className="text-slate-900 font-bold leading-tight">6 rue Roger Salengro,<br/>10150 Pont-Sainte-Marie</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-100">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-1">Téléphone</h5>
                  <p className="text-slate-900 font-black text-2xl">06 77 34 36 73</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-100">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-1">Email</h5>
                  <p className="text-slate-900 font-bold">contact@gsautos.fr</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <Clock className="text-red-600" />
              <div className="text-xs space-y-1">
                <div className="flex gap-4">
                    <span className="font-bold w-28">Lun - Ven :</span>
                    <span className="text-slate-500">09:00 - 18:00</span>
                </div>
                <div className="flex gap-4">
                    <span className="font-bold w-28">Samedi :</span>
                    <span className="text-slate-500">09:00 - 12:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

             <form className="space-y-6 relative z-10" onSubmit={(e) => {
               e.preventDefault();
               alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
             }}>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        Nom <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                        placeholder="Votre nom"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        Prénom <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                        placeholder="Votre prénom"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     Email <span className="text-red-600">*</span>
                   </label>
                   <input
                     type="email"
                     required
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                     placeholder="exemple@mail.com"
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Téléphone</label>
                   <input
                     type="tel"
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                     placeholder="06 12 34 56 78"
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Type de demande</label>
                   <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all">
                     <option value="">Sélectionnez...</option>
                     <option value="reparation">Réparation / Entretien</option>
                     <option value="occasion">Achat véhicule d'occasion</option>
                     <option value="location">Location utilitaire</option>
                     <option value="pieces">Pièces détachées</option>
                     <option value="autre">Autre demande</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     Message <span className="text-red-600">*</span>
                   </label>
                   <textarea
                     required
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:bg-white transition-all h-32 resize-none"
                     placeholder="Comment pouvons-nous vous aider ?"
                   ></textarea>
                </div>

                <button className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 neon-glow flex items-center justify-center gap-2 group">
                   Envoyer la Demande
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-slate-400 text-center">
                  <span className="text-red-600">*</span> Champs obligatoires • Réponse sous 24h
                </p>
             </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 pt-20 pb-10 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6 col-span-1 md:col-span-2">
               <img src="/image/logo-gsa.png" alt="GSA" className="h-12 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/200x60?text=GSA'} />
               <p className="text-slate-400 max-w-sm">
                  Depuis plus de 3 ans, Garage Service Auto (GSA) est votre partenaire de confiance à Pont-Sainte-Marie pour une mobilité sans soucis.
               </p>
               <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 cursor-pointer group">
                    <Facebook size={18} className="text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 cursor-pointer group">
                    <Instagram size={18} className="text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 cursor-pointer group">
                    <Twitter size={18} className="text-white group-hover:scale-110 transition-transform" />
                  </a>
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase text-sm tracking-widest">Navigation</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#accueil" className="hover:text-red-600 transition-colors">Accueil</a></li>
                <li><a href="#services" className="hover:text-red-600 transition-colors">Services</a></li>
                <li><a href="#a-propos" className="hover:text-red-600 transition-colors">À Propos</a></li>
                <li><a href="#occasions" className="hover:text-red-600 transition-colors">Occasions</a></li>
                <li><a href="#location" className="hover:text-red-600 transition-colors">Location</a></li>
                <li><a href="#temoignages" className="hover:text-red-600 transition-colors">Témoignages</a></li>
                <li><a href="#contact" className="hover:text-red-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase text-sm tracking-widest">Informations</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-red-600" />
                  <a href="tel:0677343673" className="hover:text-white transition-colors">06 77 34 36 73</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-red-600" />
                  <a href="mailto:contact@gsautos.fr" className="hover:text-white transition-colors">contact@gsautos.fr</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-red-600 shrink-0 mt-1" />
                  <span>6 rue Roger Salengro,<br/>10150 Pont-Sainte-Marie</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-white/10">
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Horaires</h5>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>Lun - Ven : 09:00 - 18:00</li>
                  <li>Samedi : 09:00 - 12:00</li>
                  <li className="text-red-600 font-bold">Dimanche : Fermé</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
               <div className="flex flex-wrap gap-4 text-slate-500 text-xs">
                  <a href="#" className="hover:text-red-600 transition-colors">Mentions Légales</a>
                  <span>•</span>
                  <a href="#" className="hover:text-red-600 transition-colors">Politique de Confidentialité</a>
                  <span>•</span>
                  <a href="#" className="hover:text-red-600 transition-colors">CGV / CGU</a>
               </div>
               <div className="flex gap-2 items-center">
                  <Zap size={16} className="text-red-600 animate-pulse" />
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">Designed with Excellence</span>
               </div>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Garage Service Auto GSA. Tous droits réservés. Site web professionnel créé avec passion.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
