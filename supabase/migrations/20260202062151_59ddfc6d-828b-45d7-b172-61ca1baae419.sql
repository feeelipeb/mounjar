-- Tabela para rastrear cliques em botões
CREATE TABLE public.button_clicks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    button_id TEXT NOT NULL,
    button_label TEXT,
    page_path TEXT NOT NULL,
    destination_url TEXT,
    visitor_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.button_clicks ENABLE ROW LEVEL SECURITY;

-- Política para inserir (qualquer um pode inserir)
CREATE POLICY "Anyone can insert button clicks" 
ON public.button_clicks 
FOR INSERT 
WITH CHECK (true);

-- Política para selecionar (apenas usuários autenticados)
CREATE POLICY "Authenticated users can view button clicks" 
ON public.button_clicks 
FOR SELECT 
TO authenticated
USING (true);

-- Política para deletar (apenas usuários autenticados)
CREATE POLICY "Authenticated users can delete button clicks" 
ON public.button_clicks 
FOR DELETE 
TO authenticated
USING (true);

-- Adicionar política de delete na tabela page_views
CREATE POLICY "Authenticated users can delete page views" 
ON public.page_views 
FOR DELETE 
TO authenticated
USING (true);

-- Índices para performance
CREATE INDEX idx_button_clicks_button_id ON public.button_clicks(button_id);
CREATE INDEX idx_button_clicks_created_at ON public.button_clicks(created_at);