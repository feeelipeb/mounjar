import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LogOut, Users, TrendingDown, RefreshCw } from 'lucide-react';

interface PageStats {
  page: string;
  label: string;
  count: number;
  retention: number;
}

interface DropoffData {
  transition: string;
  dropoff: number;
}

const FUNNEL_PAGES = [
  { path: '/', label: 'Início' },
  { path: '/quiz1', label: 'Quiz 1 - Faixa Etária' },
  { path: '/quiz2', label: 'Quiz 2 - Tipo de Corpo' },
  { path: '/quiz3', label: 'Quiz 3 - Área Alvo' },
  { path: '/quiz4', label: 'Quiz 4 - Nome' },
  { path: '/quiz5', label: 'Quiz 5 - Impacto' },
  { path: '/quiz6', label: 'Quiz 6 - Satisfação' },
  { path: '/quiz7', label: 'Quiz 7 - Obstáculos' },
  { path: '/quiz8', label: 'Quiz 8 - Protocolo' },
  { path: '/quiz9', label: 'Quiz 9 - Benefícios' },
  { path: '/quiz10', label: 'Quiz 10 - Depoimento' },
  { path: '/quiz11', label: 'Quiz 11 - Peso' },
  { path: '/quiz12', label: 'Quiz 12 - Altura' },
  { path: '/quiz13', label: 'Quiz 13 - Peso Desejado' },
  { path: '/quiz14', label: 'Quiz 14 - Rotina' },
  { path: '/quiz15', label: 'Quiz 15 - Sono' },
  { path: '/quiz16', label: 'Quiz 16 - Água' },
  { path: '/quiz17', label: 'Quiz 17 - Carregamento' },
  { path: '/quiz18', label: 'Quiz 18 - IMC' },
  { path: '/quiz19', label: 'Quiz 19 - Corpo Sonhos' },
  { path: '/quiz20', label: 'Quiz 20 - Oferta' },
];

const Dashboard = () => {
  const [stats, setStats] = useState<PageStats[]>([]);
  const [dropoffs, setDropoffs] = useState<DropoffData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        fetchStats();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchStats = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('page_views')
      .select('page_path, visitor_id');

    if (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
      return;
    }

    // Contar visitantes únicos por página
    const pageVisitors: Record<string, Set<string>> = {};
    
    data?.forEach((view) => {
      if (!pageVisitors[view.page_path]) {
        pageVisitors[view.page_path] = new Set();
      }
      pageVisitors[view.page_path].add(view.visitor_id);
    });

    // Pegar contagem da primeira página como base
    const firstPageCount = pageVisitors['/']?.size || 0;
    setTotalVisitors(firstPageCount);

    // Calcular stats para cada página
    const pageStats: PageStats[] = FUNNEL_PAGES.map((page) => {
      const count = pageVisitors[page.path]?.size || 0;
      const retention = firstPageCount > 0 ? (count / firstPageCount) * 100 : 0;
      return {
        page: page.path,
        label: page.label,
        count,
        retention,
      };
    });

    setStats(pageStats);

    // Calcular dropoffs entre páginas
    const dropoffData: DropoffData[] = [];
    for (let i = 0; i < pageStats.length - 1; i++) {
      const current = pageStats[i];
      const next = pageStats[i + 1];
      const dropoff = current.count > 0 
        ? ((current.count - next.count) / current.count) * 100 
        : 0;
      
      if (dropoff > 0) {
        dropoffData.push({
          transition: `${i} → ${i + 1}`,
          dropoff: Math.round(dropoff),
        });
      }
    }

    // Ordenar por maior dropoff
    dropoffData.sort((a, b) => b.dropoff - a.dropoff);
    setDropoffs(dropoffData.slice(0, 10)); // Top 10 piores

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const getBarColor = (dropoff: number) => {
    if (dropoff >= 50) return '#ef4444'; // red
    if (dropoff >= 30) return '#f97316'; // orange
    if (dropoff >= 20) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard de Métricas</h1>
            <p className="text-muted-foreground">Análise do funil de conversão</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchStats} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Visitantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisitors}</div>
              <p className="text-xs text-muted-foreground">Na página inicial</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Chegaram na Oferta</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.find(s => s.page === '/quiz20')?.count || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.find(s => s.page === '/quiz20')?.retention.toFixed(1) || 0}% de retenção
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Maior Dropoff</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {dropoffs[0]?.dropoff || 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {dropoffs[0]?.transition || '-'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Dropoffs */}
        <Card>
          <CardHeader>
            <CardTitle>Piores Retenções Entre Etapas</CardTitle>
            <CardDescription>
              Porcentagem de visitantes que saíram em cada transição
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dropoffs.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dropoffs} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="transition" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Dropoff']}
                  />
                  <Bar dataKey="dropoff" radius={[0, 4, 4, 0]}>
                    {dropoffs.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.dropoff)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum dado disponível ainda
              </p>
            )}
          </CardContent>
        </Card>

        {/* Tabela de todas as etapas */}
        <Card>
          <CardHeader>
            <CardTitle>Todas as Etapas do Funil</CardTitle>
            <CardDescription>
              Visitantes únicos e retenção em cada página
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={stat.page} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {index}. {stat.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.count} visitantes ({stat.retention.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress 
                    value={stat.retention} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
