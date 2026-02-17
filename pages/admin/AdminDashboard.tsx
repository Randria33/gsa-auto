import React, { useState, useEffect } from 'react';
import {
  Car, Wrench, Truck, MessageSquare, Settings, LogOut,
  TrendingUp, Users, Eye, DollarSign, Menu, X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Import des composants de gestion
import VehiculesManager from './components/VehiculesManager';
import ServicesManager from './components/ServicesManager';
import LocationManager from './components/LocationManager';
import TemoignagesManager from './components/TemoignagesManager';
import ParametresManager from './components/ParametresManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    vehicules: 0,
    services: 6,
    temoignages: 0,
    vues: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
    loadStats();
  }, []);

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const loadStats = async () => {
    try {
      const { count: vehiculesCount } = await supabase
        .from('vehicules')
        .select('*', { count: 'exact', head: true });

      const { count: temoignagesCount } = await supabase
        .from('temoignages')
        .select('*', { count: 'exact', head: true });

      setStats({
        vehicules: vehiculesCount || 0,
        services: 6,
        temoignages: temoignagesCount || 0,
        vues: 0 // À implémenter avec analytics
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: TrendingUp },
    { id: 'vehicules', label: 'Véhicules', icon: Car },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'location', label: 'Location', icon: Truck },
    { id: 'temoignages', label: 'Témoignages', icon: MessageSquare },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                GSA <span className="text-red-600">Admin</span>
              </h1>
              <p className="text-xs text-slate-500">Interface de gestion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.email}</p>
              <p className="text-xs text-slate-500">Administrateur</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)] p-4`}>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-black mb-6">Tableau de Bord</h2>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Car className="text-red-600" size={24} />
                    </div>
                    <span className="text-3xl font-black">{stats.vehicules}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">Véhicules Disponibles</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Wrench className="text-blue-600" size={24} />
                    </div>
                    <span className="text-3xl font-black">{stats.services}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">Services Actifs</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="text-green-600" size={24} />
                    </div>
                    <span className="text-3xl font-black">{stats.temoignages}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">Témoignages</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Eye className="text-purple-600" size={24} />
                    </div>
                    <span className="text-3xl font-black">{stats.vues}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">Vues ce Mois</p>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-black mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('vehicules')}
                    className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all border border-slate-200"
                  >
                    <Car className="text-red-600 mb-2" size={24} />
                    <p className="font-bold text-sm">Ajouter un Véhicule</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('location')}
                    className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all border border-slate-200"
                  >
                    <DollarSign className="text-blue-600 mb-2" size={24} />
                    <p className="font-bold text-sm">Modifier les Tarifs</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('temoignages')}
                    className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all border border-slate-200"
                  >
                    <Users className="text-green-600 mb-2" size={24} />
                    <p className="font-bold text-sm">Modérer les Avis</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicules' && <VehiculesManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'location' && <LocationManager />}
          {activeTab === 'temoignages' && <TemoignagesManager />}
          {activeTab === 'parametres' && <ParametresManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
