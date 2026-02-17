import React, { useState, useEffect } from 'react';
import {
  MessageSquare, ThumbsUp, ThumbsDown, Eye, EyeOff,
  Trash2, Star, Plus, Save, X, AlertCircle, CheckCircle
} from 'lucide-react';
import { supabase, TemoignageDB } from '../../../lib/supabase';

const TemoignagesManager: React.FC = () => {
  const [temoignages, setTemoignages] = useState<TemoignageDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [fonctionActive, setFonctionActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    role: '',
    texte: '',
    note: 5,
    image_url: ''
  });

  useEffect(() => {
    loadTemoignages();
    loadParametres();
  }, []);

  const loadTemoignages = async () => {
    try {
      const { data, error } = await supabase
        .from('temoignages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemoignages(data || []);
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadParametres = async () => {
    try {
      const { data, error } = await supabase
        .from('parametres')
        .select('fonction_avis_active')
        .single();

      if (error) throw error;
      setFonctionActive(data?.fonction_avis_active || false);
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
    }
  };

  const toggleFonctionAvis = async () => {
    try {
      const newValue = !fonctionActive;
      const { error } = await supabase
        .from('parametres')
        .update({ fonction_avis_active: newValue })
        .eq('id', '1'); // ID du paramètre principal

      if (error) throw error;
      setFonctionActive(newValue);
      alert(newValue
        ? 'Fonction "Laisser un avis" activée !'
        : 'Fonction "Laisser un avis" désactivée'
      );
    } catch (error) {
      console.error('Erreur mise à jour paramètres:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const approuverTemoignage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('temoignages')
        .update({ approuve: true, affiche: true })
        .eq('id', id);

      if (error) throw error;
      loadTemoignages();
      alert('Témoignage approuvé et publié !');
    } catch (error) {
      console.error('Erreur approbation:', error);
      alert('Erreur lors de l\'approbation');
    }
  };

  const rejeterTemoignage = async (id: string) => {
    if (!confirm('Rejeter ce témoignage ? Il ne sera pas visible sur le site.')) return;

    try {
      const { error } = await supabase
        .from('temoignages')
        .update({ approuve: false, affiche: false })
        .eq('id', id);

      if (error) throw error;
      loadTemoignages();
      alert('Témoignage rejeté');
    } catch (error) {
      console.error('Erreur rejet:', error);
      alert('Erreur lors du rejet');
    }
  };

  const toggleAffichage = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('temoignages')
        .update({ affiche: !currentState })
        .eq('id', id);

      if (error) throw error;
      loadTemoignages();
    } catch (error) {
      console.error('Erreur toggle affichage:', error);
      alert('Erreur lors du changement de visibilité');
    }
  };

  const supprimerTemoignage = async (id: string) => {
    if (!confirm('Supprimer définitivement ce témoignage ?')) return;

    try {
      const { error } = await supabase
        .from('temoignages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadTemoignages();
      alert('Témoignage supprimé');
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const ajouterTemoignage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('temoignages')
        .insert({
          ...formData,
          approuve: true,
          affiche: true
        });

      if (error) throw error;

      setShowForm(false);
      setFormData({ nom: '', role: '', texte: '', note: 5, image_url: '' });
      loadTemoignages();
      alert('Témoignage ajouté avec succès !');
    } catch (error) {
      console.error('Erreur ajout:', error);
      alert('Erreur lors de l\'ajout');
    }
  };

  const temoignagesEnAttente = temoignages.filter(t => !t.approuve);
  const temoignagesApprouves = temoignages.filter(t => t.approuve);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Gestion des Témoignages</h2>
          <p className="text-slate-500">Modérez et gérez les avis clients</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold"
        >
          <Plus size={20} />
          Ajouter un Avis
        </button>
      </div>

      {/* Activation Fonction Avis */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              fonctionActive ? 'bg-green-100' : 'bg-slate-100'
            }`}>
              <MessageSquare className={fonctionActive ? 'text-green-600' : 'text-slate-400'} size={24} />
            </div>
            <div>
              <h3 className="font-black text-lg">Fonction "Laisser un Avis"</h3>
              <p className="text-sm text-slate-500">
                {fonctionActive
                  ? 'Les visiteurs peuvent soumettre des avis depuis le site'
                  : 'Fonction désactivée - Les visiteurs ne peuvent pas soumettre d\'avis'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleFonctionAvis}
            className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${
              fonctionActive
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {fonctionActive ? 'ACTIVÉE' : 'DÉSACTIVÉE'}
          </button>
        </div>
      </div>

      {/* Formulaire Ajout */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Ajouter un Témoignage</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={ajouterTemoignage} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">
                    Rôle
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600"
                    placeholder="Ex: Client, Chef d'entreprise..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">
                  Note
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({ ...formData, note: n })}
                      className="p-2"
                    >
                      <Star
                        size={32}
                        className={n <= formData.note ? 'fill-red-600 text-red-600' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">
                  Témoignage
                </label>
                <textarea
                  value={formData.texte}
                  onChange={(e) => setFormData({ ...formData, texte: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 h-32 resize-none"
                  placeholder="Le témoignage du client..."
                  required
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">
                  URL Image (optionnel)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Témoignages en Attente */}
      {temoignagesEnAttente.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-orange-600" size={24} />
            <h3 className="text-xl font-black">
              En Attente de Modération ({temoignagesEnAttente.length})
            </h3>
          </div>

          <div className="space-y-4">
            {temoignagesEnAttente.map((temoignage) => (
              <div key={temoignage.id} className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center font-black text-orange-700">
                      {temoignage.nom.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black">{temoignage.nom}</h4>
                      <p className="text-sm text-slate-600">{temoignage.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(temoignage.note)].map((_, i) => (
                      <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 mb-4 italic">&ldquo;{temoignage.texte}&rdquo;</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => approuverTemoignage(temoignage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-bold text-sm"
                  >
                    <ThumbsUp size={16} />
                    Approuver
                  </button>
                  <button
                    onClick={() => rejeterTemoignage(temoignage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold text-sm"
                  >
                    <ThumbsDown size={16} />
                    Rejeter
                  </button>
                  <button
                    onClick={() => supprimerTemoignage(temoignage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all font-bold text-sm ml-auto"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Témoignages Approuvés */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-green-600" size={24} />
          <h3 className="text-xl font-black">
            Témoignages Publiés ({temoignagesApprouves.filter(t => t.affiche).length})
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {temoignagesApprouves.map((temoignage) => (
            <div key={temoignage.id} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-black text-slate-700 text-sm">
                    {temoignage.nom.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{temoignage.nom}</h4>
                    <p className="text-xs text-slate-500">{temoignage.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(temoignage.note)].map((_, i) => (
                    <Star key={i} size={14} className="fill-red-600 text-red-600" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 line-clamp-3 italic">
                &ldquo;{temoignage.texte}&rdquo;
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAffichage(temoignage.id, temoignage.affiche)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-bold text-xs ${
                    temoignage.affiche
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {temoignage.affiche ? <Eye size={14} /> : <EyeOff size={14} />}
                  {temoignage.affiche ? 'Visible' : 'Masqué'}
                </button>
                <button
                  onClick={() => supprimerTemoignage(temoignage.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-bold text-xs ml-auto"
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemoignagesManager;
