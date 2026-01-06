import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { getTemplateComponent } from '../templates/templateRegistry';

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans tracking-widest uppercase text-[10px]">Architecting...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans tracking-widest uppercase text-[10px]">404 | Portfolio Not Found</div>;

  const TemplateComponent = getTemplateComponent(profile.template_id);

  return <TemplateComponent data={profile.data} />;
}