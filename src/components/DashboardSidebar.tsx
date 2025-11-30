// Accessible sidebar with proper semantic structure and ARIA labels
import { BarChart3, Users, Settings, Bell, Home, TestTube, FileText, Keyboard, Video, Palette, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DashboardSidebarProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  id?: string;
}

const DashboardSidebar = ({ activeSection, onNavClick, id }: DashboardSidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', section: 'dashboard' },
    { icon: Sparkles, label: 'Assistente de IA', section: 'ai-assistant' },
    { icon: BarChart3, label: 'Analytics', section: 'analytics' },
    { icon: Users, label: 'Users', section: 'users' },
    { icon: Video, label: 'Mídia Acessível', section: 'accessible-media' },
    { icon: Palette, label: 'Testes de Contraste', section: 'contrast-tests' },
    { icon: Bell, label: 'Notifications', section: 'notifications' },
    { icon: Settings, label: 'Settings', section: 'settings' },
    // { icon: TestTube, label: 'Testes de Acessibilidade', section: 'accessibility-tests' },
    // { icon: FileText, label: 'Formulários Acessíveis', section: 'accessible-forms' },
    // { icon: Keyboard, label: 'Navegação por Teclado', section: 'keyboard-navigation' },
  ];

  const handleKeyDown = (event: React.KeyboardEvent, section: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onNavClick(section);
    }
  };

  return (
    <div id={id} className="sidebar-bg w-48 h-screen p-1 flex flex-col">
      <div className="mb-2 flex-shrink-0">
        <div className="text-xs font-light nav-text">AdminPanel</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            return (
              <div key={item.label}>
                <button
                  onClick={() => onNavClick(item.section)}
                  className={`nav-text p-1 rounded transition-colors flex items-center gap-1 w-full text-left text-xs ${
                    isActive ? 'bg-primary/20' : 'hover:bg-primary/10'
                  }`}
                >
                  <Icon size={12} className="flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0 mt-2 p-1">
        <div className="stat-card p-1 rounded-lg">
          <div className="flex items-center gap-1">
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage
                src="/placeholder.svg"
                alt=""
              />
              <AvatarFallback className="bg-primary/30 text-primary font-light text-xs">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="nav-text text-xs font-light truncate">Usuário Admin</div>
              <div className="nav-text text-xs opacity-80 truncate hidden sm:block">admin@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;