import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PAGE_PATH_LENGTH = 500;
const MAX_BUTTON_ID_LENGTH = 100;
const MAX_BUTTON_LABEL_LENGTH = 200;
const MAX_URL_LENGTH = 2000;

const isValidUUID = (id: string): boolean => UUID_REGEX.test(id);
const isValidPagePath = (path: string): boolean => 
  path.startsWith('/') && path.length <= MAX_PAGE_PATH_LENGTH;
const isValidButtonId = (id: string): boolean => 
  id.length > 0 && id.length <= MAX_BUTTON_ID_LENGTH;
const isValidUrl = (url: string): boolean => 
  url.length <= MAX_URL_LENGTH && /^https?:\/\//.test(url);

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId || !isValidUUID(visitorId)) {
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

    // Client-side validation
    if (!isValidUUID(visitorId) || !isValidPagePath(pagePath) || !isValidButtonId(buttonId)) {
      return;
    }

    // Sanitize optional fields
    const sanitizedLabel = buttonLabel 
      ? buttonLabel.slice(0, MAX_BUTTON_LABEL_LENGTH) 
      : undefined;
    const sanitizedUrl = destinationUrl && isValidUrl(destinationUrl) 
      ? destinationUrl 
      : undefined;

    await supabase.from('button_clicks').insert({
      button_id: buttonId,
      button_label: sanitizedLabel,
      page_path: pagePath,
      destination_url: sanitizedUrl,
      visitor_id: visitorId,
    });
  };

  return { trackButtonClick };
};
