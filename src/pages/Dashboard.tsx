import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LogOut, Users, TrendingDown, RefreshCw, MousePointer, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface ButtonClickStats {
  buttonId: string;
  label: string;
  count: number;
  uniqueVisitors: number;
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
  const [buttonClicks, setButtonClicks] = useState<ButtonClickStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalButtonClicks, setTotalButtonClicks] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

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

    // Buscar page views
    const { data: pageViewsData, error: pageViewsError } = await supabase
      .from('page_views')
      .select('page_path, visitor_id');

    if (pageViewsError) {
      console.error('Error fetching page views:', pageViewsError);
    }

    // Buscar button clicks
    const { data: buttonClicksData, error: buttonClicksError } = await supabase
      .from('button_clicks')
      .select('button_id, button_label, visitor_id');

    if (buttonClicksError) {
      console.error('Error fetching button clicks:', buttonClicksError);
    }

    // Processar page views
    const pageVisitors: Record<string, Set<string>> = {};
    
    pageViewsData?.forEach((view) => {
      if (!pageVisitors[view.page_path]) {
        pageVisitors[view.page_path] = new Set();
      }
      pageVisitors[view.page_path].add(view.visitor_id);
    });

    const firstPageCount = pageVisitors['/']?.size || 0;
    setTotalVisitors(firstPageCount);

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

    // Calcular dropoffs
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

    dropoffData.sort((a, b) => b.dropoff - a.dropoff);
    setDropoffs(dropoffData.slice(0, 10));

    // Processar button clicks
    const buttonStats: Record<string, { label: string; clicks: number; visitors: Set<string> }> = {};
    
    buttonClicksData?.forEach((click) => {
      if (!buttonStats[click.button_id]) {
        buttonStats[click.button_id] = {
          label: click.button_label || click.button_id,
          clicks: 0,
          visitors: new Set(),
        };
      }
      buttonStats[click.button_id].clicks++;
      buttonStats[click.button_id].visitors.add(click.visitor_id);
    });

    const buttonClickStats: ButtonClickStats[] = Object.entries(buttonStats).map(([id, data]) => ({
      buttonId: id,
      label: data.label,
      count: data.clicks,
      uniqueVisitors: data.visitors.size,
    }));

    buttonClickStats.sort((a, b) => b.count - a.count);
    setButtonClicks(buttonClickStats);
    setTotalButtonClicks(buttonClicksData?.length || 0);

    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    
    // Deletar todos os page views
    const { error: pageViewsError } = await supabase
      .from('page_views')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Hack para deletar todos

    if (pageViewsError) {
      toast({
        title: 'Erro ao resetar page views',
        description: pageViewsError.message,
        variant: 'destructive',
      });
    }

    // Deletar todos os button clicks
    const { error: buttonClicksError } = await supabase
      .from('button_clicks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (buttonClicksError) {
      toast({
        title: 'Erro ao resetar button clicks',
        description: buttonClicksError.message,
        variant: 'destructive',
      });
    }

    if (!pageViewsError && !buttonClicksError) {
      toast({
        title: 'Métricas resetadas',
        description: 'Todas as métricas foram resetadas com sucesso.',
      });
    }

    fetchStats();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const getBarColor = (dropoff: number) => {
    if (dropoff >= 50) return '#ef4444';
    if (dropoff >= 30) return '#f97316';
    if (dropoff >= 20) return '#eab308';
    return '#22c55e';
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
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={fetchStats} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Resetar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Resetar todas as métricas?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Todos os dados de page views e cliques em botões serão permanentemente deletados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-red-500 hover:bg-red-600">
                    Resetar Tudo
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <CardTitle className="text-sm font-medium">Cliques em Botões</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalButtonClicks}</div>
              <p className="text-xs text-muted-foreground">
                {buttonClicks.length} botões diferentes
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

        {/* Cliques em Botões */}
        {buttonClicks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Cliques em Botões de Redirecionamento</CardTitle>
              <CardDescription>
                Botões que levam para páginas externas (checkout, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buttonClicks.map((btn) => (
                  <div key={btn.buttonId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{btn.label}</p>
                      <p className="text-sm text-muted-foreground">ID: {btn.buttonId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{btn.count} cliques</p>
                      <p className="text-sm text-muted-foreground">{btn.uniqueVisitors} visitantes únicos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
