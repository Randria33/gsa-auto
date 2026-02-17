
import React from 'react';
import { Phone, MapPin, Mail, Clock, Star, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Recto: React.FC = () => {
  return (
    <div className="grid grid-cols-3 h-full w-full bg-white text-slate-800">
      {/* Panel 1 (Left - Inside Flap) - Présentation des Services */}
      <div className="relative h-full flex flex-col bg-slate-50 border-r border-slate-100 p-8 overflow-hidden">
        <h2 className="text-xl font-black text-red-600 uppercase leading-tight mb-2">Nos Services</h2>
        <div className="h-1 w-12 bg-red-600 mb-6"></div>
        
        <div className="space-y-4 relative z-10 flex-grow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Une solution complète pour votre mobilité</p>
          
          <ul className="space-y-2.5">
            {[
              { title: "Mécanique & Entretien", desc: "Toutes marques, garantie constructeur." },
              { title: "Diagnostic Électronique", desc: "Lecture codes défauts et pannes." },
              { title: "Location Utilitaires", desc: "Minibus 9 pl. et fourgons (Sprinter/Trafic)." },
              { title: "Vente Véhicules d'Occasion", desc: "Sélection révisée et garantie." },
              { title: "Vente de Pièces Détachées", desc: "Large stock de pièces toutes marques." }
            ].map((service, idx) => (
              <li key={idx} className="flex gap-3 items-start p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 size={14} className="text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 leading-none mb-1">{service.title}</h4>
                  <p className="text-[8px] text-slate-500">{service.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 bg-red-600 p-4 rounded-xl shadow-lg shadow-red-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-black text-white">3</span>
              <span className="text-[9px] font-bold uppercase text-white/90 leading-tight">Années<br/>d'Expérience</span>
            </div>
            <p className="text-[10px] text-white/80 leading-relaxed italic">
              "La rigueur et le savoir-faire GSA à votre service depuis plus de 3 ans."
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-red-600" /> Qualité & Transparence
        </div>
      </div>

      {/* Panel 2 (Middle - Front Cover) - Couverture DEVENUE CENTRALE */}
      <div className="blueprint-bg relative h-full flex flex-col items-center justify-center p-12 text-center border-r border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
             <img src="logo gsa.png" alt="Logo GSA" className="h-44 object-contain drop-shadow-2xl mx-auto" onError={(e) => e.currentTarget.src = 'https://placehold.co/400x200?text=GSA+LOGO'} />
             <div className="h-1.5 w-24 bg-red-600 mx-auto mt-6"></div>
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="text-4xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter">
                L'Expertise<br/><span className="text-red-600 italic">Automobile</span>
            </h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest max-w-xs mx-auto">
                Mécanique • Vente • Location
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-red-600 text-red-600" />)}
            </div>
            <div className="px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-xl shadow-red-100">
                Pont-Sainte-Marie
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3 (Right - Back) - Contact & Infos DEPLACÉ À DROITE */}
      <div className="h-full bg-white flex flex-col p-8 relative overflow-hidden text-center">
        <div className="mb-10 flex justify-center">
            <img src="logo gsa.png" alt="Logo GSA" className="h-20 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/200x100?text=GSA+LOGO'} />
        </div>

        <div className="space-y-5 relative z-10 flex-grow text-left">
          <div className="flex items-center gap-4 group">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <MapPin size={18} />
            </div>
            <div>
              <p className="font-black text-[10px] text-slate-900 uppercase">Notre Adresse</p>
              <p className="text-[11px] text-slate-500 leading-tight">6 rue Roger Salengro,<br/>10150 Pont-Sainte-Marie</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Phone size={18} />
            </div>
            <div>
              <p className="font-black text-[10px] text-slate-900 uppercase">Contact Direct</p>
              <p className="text-lg font-black text-red-600">06 77 34 36 73</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Mail size={18} />
            </div>
            <div>
              <p className="font-black text-[10px] text-slate-900 uppercase">Par Email</p>
              <p className="text-[11px] text-slate-500">contact@gsautos.fr</p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="flex items-start gap-3 justify-center">
              <Clock className="text-red-600 shrink-0 mt-0.5" size={14} />
              <div className="text-[9px] text-slate-500 space-y-1">
                <div className="flex justify-between gap-4"><span>Lundi - Vendredi :</span><span className="font-bold text-slate-900">9h - 18h</span></div>
                <div className="flex justify-between gap-4"><span>Samedi :</span><span className="font-bold text-slate-900">9h - 12h</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
            <div className="bg-slate-900 text-white py-3 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200">
                DEVIS GRATUIT & RAPIDE
            </div>
        </div>
      </div>
    </div>
  );
};

export default Recto;
