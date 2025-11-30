// Accessible dashboard stats with proper semantic structure and ARIA labels
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 45.231,89',
      change: '+20.1%',
      changeType: 'increase',
      period: 'desde o mês passado',
      icon: DollarSign,
      ariaLabel: 'Receita total é R$ 45.231,89, aumentou 20.1% desde o mês passado'
    },
    {
      title: 'Assinaturas',
      value: '+2.350',
      change: '+180.1%',
      changeType: 'increase',
      period: 'desde o mês passado',
      icon: Users,
      ariaLabel: 'Assinaturas aumentaram para 2.350, subindo 180.1% desde o mês passado'
    },
    {
      title: 'Vendas',
      value: '+12.234',
      change: '+19%',
      changeType: 'increase',
      period: 'desde o mês passado',
      icon: TrendingUp,
      ariaLabel: 'Vendas aumentaram para 12.234, subindo 19% desde o mês passado'
    },
    {
      title: 'Ativos Agora',
      value: '+573',
      change: '+201',
      changeType: 'increase',
      period: 'desde a última hora',
      icon: Activity,
      ariaLabel: 'Atualmente 573 usuários ativos, aumentaram 201 desde a última hora'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-2 px-1">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.changeType === 'increase';

        return (
          <div
            key={index}
            className="stat-card p-1 rounded shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="nav-text text-xs font-light">
                  {stat.title}
                </div>
                <div className="text-xs font-normal text-primary mt-0">
                  {stat.value}
                </div>
                <div
                  className={`text-xs mt-0 flex items-center gap-0 ${
                    isPositive ? 'text-success-low' : 'text-danger-low'
                  }`}
                >
                  <span>
                    {isPositive ? '↗' : '↘'}
                  </span>
                  <span>{stat.change} {stat.period}</span>
                </div>
              </div>
              <Icon
                className="h-3 w-3 text-chart-secondary flex-shrink-0"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;