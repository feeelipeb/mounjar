
-- Fix: Restrict SELECT on page_views and button_clicks to admins only
DROP POLICY IF EXISTS "Authenticated users can view page views" ON public.page_views;
DROP POLICY IF EXISTS "Authenticated users can view button clicks" ON public.button_clicks;

CREATE POLICY "Only admins can view page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can view button clicks"
ON public.button_clicks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix: Add explicit UPDATE denial policies for analytics tables
CREATE POLICY "No updates allowed on page_views"
ON public.page_views
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No updates allowed on button_clicks"
ON public.button_clicks
FOR UPDATE
TO authenticated
USING (false);
