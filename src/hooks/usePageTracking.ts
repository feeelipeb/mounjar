import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      const visitorId = getVisitorId();
      const pagePath = location.pathname;

      // Não rastrear páginas de admin
      if (pagePath === '/dashboard' || pagePath === '/auth') {
        return;
      }

      await supabase.from('page_views').insert({
        page_path: pagePath,
        visitor_id: visitorId,
      });
    };

    trackPageView();
  }, [location.pathname]);
};
