// Accessible dashboard header with proper semantic structure
import { Bell, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import NotificationPanel from '@/components/NotificationPanel';
import { useTheme } from '@/hooks/useTheme';
import userAvatar from '@/assets/user-avatar.png';

interface DashboardHeaderProps {
  isNotificationOpen: boolean;
  onToggleNotifications: () => void;
  onToggleSidebar: () => void;
}

const DashboardHeader = ({ isNotificationOpen, onToggleNotifications, onToggleSidebar }: DashboardHeaderProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between p-1 sm:p-1.5 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50 min-h-[30px] sm:min-h-[35px] overflow-x-auto">
      <div className="flex items-center gap-1 min-w-0 flex-1">
        <button
          className="lg:hidden p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
          onClick={onToggleSidebar}
        >
          <Menu className="h-3 w-3 nav-text" />
        </button>

        <div className="min-w-0 flex-1 mr-1 sm:mr-2">
          <div className="text-xs font-light text-primary truncate">Painel de Controle</div>
          <div className="nav-text text-xs hidden sm:block opacity-60 truncate">Bem-vindo de volta, Admin</div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        <div className="hidden md:flex items-center bg-input rounded px-1 py-0 min-w-0">
          <Search className="h-2 w-2 nav-text mr-1 flex-shrink-0" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-transparent border-none outline-none nav-text w-16 sm:w-20 text-xs min-w-0"
          />
        </div>

        <div className="relative">
          <button
            className="relative p-1 rounded hover:bg-muted transition-colors"
            onClick={onToggleNotifications}
          >
            {isNotificationOpen ? (
              <X className="h-3 w-3 nav-text" />
            ) : (
              <Bell className="h-3 w-3 nav-text" />
            )}
            {!isNotificationOpen && (
              <span className="absolute -top-0.5 -right-0.5 bg-danger-low text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                3
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-1 w-64 sm:w-80 max-w-[calc(100vw-2rem)] stat-card rounded shadow-lg z-[9999] bg-background border overflow-hidden">
              <NotificationPanel />
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-3 w-3 nav-text" />
          ) : (
            <Moon className="h-3 w-3 nav-text" />
          )}
        </button>

        <button className="flex items-center gap-1 p-1 rounded hover:bg-muted transition-colors">
          <Avatar className="h-4 w-4">
            <AvatarImage
              src={userAvatar}
              alt=""
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-light">
              AU
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block nav-text text-xs">Usuário Admin</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;