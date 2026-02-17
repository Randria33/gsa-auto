import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      vehicules: {
        Row: VehiculeDB;
        Insert: Omit<VehiculeDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<VehiculeDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      services: {
        Row: ServiceDB;
        Insert: Omit<ServiceDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ServiceDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      tarifs_location: {
        Row: TarifLocationDB;
        Insert: Omit<TarifLocationDB, 'id' | 'created_at'>;
        Update: Partial<Omit<TarifLocationDB, 'id' | 'created_at'>>;
      };
      temoignages: {
        Row: TemoignageDB;
        Insert: Omit<TemoignageDB, 'id' | 'created_at'>;
        Update: Partial<Omit<TemoignageDB, 'id' | 'created_at'>>;
      };
      parametres: {
        Row: ParametresDB;
        Insert: Omit<ParametresDB, 'id' | 'updated_at'>;
        Update: Partial<Omit<ParametresDB, 'id' | 'updated_at'>>;
      };
    };
  };
}

// Interfaces TypeScript
export interface VehiculeDB {
  id: string;
  nom: string;
  annee: string;
  kilometrage: string;
  prix: string;
  carburant: string;
  transmission: string;
  puissance: string;
  portes: string;
  places: string;
  couleur: string;
  premiere_mise: string;
  controle_technique: string;
  description: string;
  equipements: string[];
  garantie: string;
  disponible: boolean;
  image_principale: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceDB {
  id: string;
  titre: string;
  description: string;
  image_url: string;
  tarif: string;
  duree: string;
  prestations: string[];
  avantages: string[];
  ordre: number;
  actif: boolean;
  created_at: string;
  updated_at: string;
}

export interface TarifLocationDB {
  id: string;
  vehicule: string;
  tarif_jour: number;
  tarif_semaine: number;
  caution: number;
  image_url: string;
  description: string;
  actif: boolean;
  created_at: string;
}

export interface TemoignageDB {
  id: string;
  nom: string;
  role: string;
  texte: string;
  note: number;
  image_url: string;
  approuve: boolean;
  affiche: boolean;
  created_at: string;
}

export interface ParametresDB {
  id: string;
  telephone: string;
  email: string;
  adresse: string;
  horaires: {
    lundi_vendredi: string;
    samedi: string;
    dimanche: string;
  };
  reseaux_sociaux: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  fonction_avis_active: boolean;
  updated_at: string;
}

// Helper pour l'upload d'images
export async function uploadImage(file: File, bucket: string, path: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}
