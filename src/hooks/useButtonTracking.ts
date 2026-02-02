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

export const useButtonTracking = () => {
  const location = useLocation();

  const trackButtonClick = async (
    buttonId: string, 
    buttonLabel?: string, 
    destinationUrl?: string
  ) => {
    const visitorId = getVisitorId();
    const pagePath = location.pathname;

    // Não rastrear em páginas de admin
    if (pagePath === '/dashboard' || pagePath === '/auth') {
      return;
    }

    await supabase.from('button_clicks').insert({
      button_id: buttonId,
      button_label: buttonLabel,
      page_path: pagePath,
      destination_url: destinationUrl,
      visitor_id: visitorId,
    });
  };

  return { trackButtonClick };
};
