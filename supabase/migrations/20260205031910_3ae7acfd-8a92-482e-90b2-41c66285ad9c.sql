-- Add validation trigger function for analytics data
CREATE OR REPLACE FUNCTION public.validate_analytics_input()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate visitor_id is UUID format (36 chars with dashes)
  IF NEW.visitor_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    RAISE EXCEPTION 'Invalid visitor_id format - must be valid UUID';
  END IF;
  
  -- Validate page_path length and format
  IF length(NEW.page_path) > 500 THEN
    RAISE EXCEPTION 'page_path exceeds maximum length of 500 characters';
  END IF;
  
  -- page_path must start with /
  IF NEW.page_path !~ '^/' THEN
    RAISE EXCEPTION 'page_path must start with /';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add validation trigger for page_views
CREATE TRIGGER validate_page_views_input
BEFORE INSERT ON public.page_views
FOR EACH ROW
EXECUTE FUNCTION public.validate_analytics_input();

-- Add validation trigger function for button_clicks with additional fields
CREATE OR REPLACE FUNCTION public.validate_button_clicks_input()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate visitor_id is UUID format
  IF NEW.visitor_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    RAISE EXCEPTION 'Invalid visitor_id format - must be valid UUID';
  END IF;
  
  -- Validate page_path length and format
  IF length(NEW.page_path) > 500 THEN
    RAISE EXCEPTION 'page_path exceeds maximum length of 500 characters';
  END IF;
  
  IF NEW.page_path !~ '^/' THEN
    RAISE EXCEPTION 'page_path must start with /';
  END IF;
  
  -- Validate button_id length
  IF length(NEW.button_id) > 100 THEN
    RAISE EXCEPTION 'button_id exceeds maximum length of 100 characters';
  END IF;
  
  -- Validate button_label length if provided
  IF NEW.button_label IS NOT NULL AND length(NEW.button_label) > 200 THEN
    RAISE EXCEPTION 'button_label exceeds maximum length of 200 characters';
  END IF;
  
  -- Validate destination_url length and format if provided
  IF NEW.destination_url IS NOT NULL THEN
    IF length(NEW.destination_url) > 2000 THEN
      RAISE EXCEPTION 'destination_url exceeds maximum length of 2000 characters';
    END IF;
    
    -- Must be a valid URL starting with http:// or https://
    IF NEW.destination_url !~ '^https?://' THEN
      RAISE EXCEPTION 'destination_url must start with http:// or https://';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add validation trigger for button_clicks
CREATE TRIGGER validate_button_clicks_input
BEFORE INSERT ON public.button_clicks
FOR EACH ROW
EXECUTE FUNCTION public.validate_button_clicks_input();