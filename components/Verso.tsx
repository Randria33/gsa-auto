
import React from 'react';
import { Wrench, Package, Shield, Car, Truck, ShoppingCart, CheckCircle2, Navigation, Star, Gauge, Settings2, Tag } from 'lucide-react';

const ServiceCard: React.FC<{ icon: any, title: string, items: string[], highlight?: boolean }> = ({ icon: Icon, title, items, highlight }) => (
  <div className={`p-6 rounded-2xl border transition-all duration-300 ${highlight ? 'bg-red-600 text-white border-red-700 shadow-xl shadow-red-100' : 'bg-white text-slate-800 border-slate-100 hover:border-red-200 hover:shadow-lg'}`}>
    <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-white/20' : 'bg-red-50 text-red-600'}`}>
      <Icon size={24} />
    </div>
    <h4 className="font-black uppercase text-sm mb-4 tracking-tight">{title}</h4>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className={`text-[10px] flex items-start gap-2 ${highlight ? 'text-white/90' : 'text-slate-500'}`}>
          <CheckCircle2 size={12} className={`shrink-0 mt-0.5 ${highlight ? 'text-white' : 'text-red-500'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Verso: React.FC = () => {
  return (
    <div className="grid grid-cols-3 h-full w-full bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

      {/* Panel 1 (Left) - Technique */}
      <div className="p-10 flex flex-col h-full border-r border-slate-50 relative z-10">
        <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Technique <span className="text-red-600">&</span> Diagnostic</h3>
        </div>
        
        <div className="space-y-6">
          <ServiceCard 
            icon={Wrench} 
            title="Mécanique de Précision" 
            items={[
              "Réparation moteur & distribution",
              "Freinage, suspension et trains roulants",
              "Embrayage et boîte de vitesse",
              "Révision complète constructeur"
            ]} 
          />

          <ServiceCard 
            icon={Gauge} 
            title="Électronique Avancée" 
            items={[
              "Lecture et effacement des codes défauts",
              "Reprogrammation calculateurs",
              "Diagnostic électrique complexe",
              "Mise à jour systèmes embarqués"
            ]} 
          />
        </div>

        <div className="mt-auto pt-6 flex items-center gap-3">
            <img src="logo gsa.png" alt="Mini GSA" className="h-8 grayscale opacity-20" onError={(e) => e.currentTarget.style.display = 'none'} />
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-tight">
                Interventions certifiées<br/>garantie constructeur préservée
            </p>
        </div>
      </div>

      {/* Panel 2 (Middle) - Services Premium */}
      <div className="p-10 flex flex-col h-full border-r border-slate-50 relative z-10 bg-slate-50/40">
        <div className="flex items-center gap-3 mb-10 justify-center">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Services <span className="text-red-600">Premium</span></h3>
        </div>
        
        <div className="space-y-6">
          <ServiceCard 
            highlight
            icon={Navigation} 
            title="Mobilité Sans Contrainte" 
            items={[
              "Convoyage de votre véhicule à domicile",
              "Véhicule de prêt récent gratuit",
              "Service Jockey : nous gérons tout",
              "Intervention à domicile ou au bureau"
            ]} 
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                <Shield className="text-red-600 mb-2" size={20} />
                <span className="text-[9px] font-black text-slate-900 uppercase">Sécurité</span>
                <span className="text-[8px] text-slate-400">Contrôle 50 points</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                <Car className="text-red-600 mb-2" size={20} />
                <span className="text-[9px] font-black text-slate-900 uppercase">Carrosserie</span>
                <span className="text-[8px] text-slate-400">Remise en état neuf</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-4">
             <div className="animate-pulse bg-red-600 p-2 rounded-lg"><Star size={16} /></div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase">Assistance 7j/7</span>
                <span className="text-[8px] text-slate-400">Remorquage & Dépannage</span>
             </div>
          </div>
        </div>
      </div>

      {/* Panel 3 (Right) - Vente & Location */}
      <div className="p-10 flex flex-col h-full relative z-10">
        <div className="flex items-center gap-3 mb-8">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Mobilité <span className="text-red-600">&</span> Vente</h3>
        </div>
        
        <div className="space-y-4 flex-grow overflow-hidden">
          {/* Bloc Location */}
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-3">
                <Truck className="text-red-600" size={18} />
                <h4 className="text-[11px] font-black uppercase text-slate-900">Location Utilitaires</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="relative">
                    <img src="sprinter.png" className="w-full h-16 object-contain rounded bg-slate-50" alt="Sprinter" onError={(e) => e.currentTarget.src = 'https://placehold.co/150x100?text=SPRINTER'} />
                    <p className="text-[7px] text-center font-bold mt-1 uppercase">Mercedes Sprinter</p>
                </div>
                <div className="relative">
                    <img src="trafic.png" className="w-full h-16 object-contain rounded bg-slate-50" alt="Trafic" onError={(e) => e.currentTarget.src = 'https://placehold.co/150x100?text=TRAFIC'} />
                    <p className="text-[7px] text-center font-bold mt-1 uppercase">Renault Trafic</p>
                </div>
            </div>
          </div>

          {/* Bloc Vente Véhicules */}
          <div className="bg-slate-900 text-white p-4 rounded-xl border-l-4 border-red-600 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="text-red-600" size={18} />
                <h4 className="text-[11px] font-black uppercase">Véhicules d'Occasion</h4>
            </div>
            <p className="text-[9px] text-slate-300 leading-tight">
                Sélection rigoureuse de véhicules révisés et garantis. Recherche personnalisée selon votre budget.
            </p>
          </div>

          {/* Bloc Pièces Détachées */}
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <Package className="text-red-600" size={18} />
                <h4 className="text-[11px] font-black uppercase text-slate-900">Magasin de Pièces</h4>
            </div>
            <p className="text-[9px] text-slate-500 mb-3">
                Toutes marques : freinage, filtration, éclairage, batteries. Qualité d'origine.
            </p>
            <div className="flex items-center gap-2">
                <Tag size={12} className="text-red-600" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Conseil technique inclus</span>
            </div>
          </div>

          {/* Pourquoi GSA compact */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-900 uppercase">Pourquoi GSA ?</span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-red-600"></div>
                    <div className="w-1 h-1 rounded-full bg-red-600"></div>
                    <div className="w-1 h-1 rounded-full bg-red-600"></div>
                </div>
            </div>
            <p className="text-[8px] text-slate-500 mt-1 italic">Proximité • Transparence • 3+ ans d'expertise</p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-end">
            <div className="flex flex-col">
                <span className="text-[8px] uppercase text-slate-400 font-bold tracking-tight">Partenaire de votre route</span>
                <span className="text-xl font-black text-slate-900">GSA<span className="text-red-600">.</span></span>
            </div>
            <Settings2 size={24} className="text-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default Verso;
