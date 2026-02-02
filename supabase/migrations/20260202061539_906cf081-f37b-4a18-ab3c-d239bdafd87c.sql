-- Tabela para rastrear visitas em cada página do funil
CREATE TABLE public.page_views (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Política para inserir (qualquer um pode inserir)
CREATE POLICY "Anyone can insert page views" 
ON public.page_views 
FOR INSERT 
WITH CHECK (true);

-- Política para selecionar (apenas usuários autenticados)
CREATE POLICY "Authenticated users can view page views" 
ON public.page_views 
FOR SELECT 
TO authenticated
USING (true);

-- Índices para performance
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);