import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PAGE_PATH_LENGTH = 500;

const isValidUUID = (id: string): boolean => UUID_REGEX.test(id);
const isValidPagePath = (path: string): boolean => 
  path.startsWith('/') && path.length <= MAX_PAGE_PATH_LENGTH;

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId || !isValidUUID(visitorId)) {
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

      // Client-side validation
      if (!isValidUUID(visitorId) || !isValidPagePath(pagePath)) {
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
