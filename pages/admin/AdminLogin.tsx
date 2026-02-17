import React, { useState } from 'react';
import { LogIn, Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-4">
            <Lock size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
            GSA Admin
          </h1>
          <p className="text-slate-400 text-sm">
            Interface de gestion du site
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-all"
                placeholder="admin@gsautos.fr"
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <Lock size={14} /> Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Se Connecter
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Réservé aux employés GSA autorisés
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
