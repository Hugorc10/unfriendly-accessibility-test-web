// Accessible dashboard page following WCAG guidelines
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardStats from '@/components/DashboardStats';
import VideoSection from '@/components/VideoSection';
import ImageGallery from '@/components/ImageGallery';
import FormSection from '@/components/FormSection';
import AnalyticsChart from '@/components/AnalyticsChart';
// import AccessibilityToolbar from '@/components/AccessibilityToolbar';
// import { useAccessibility } from '@/hooks/useAccessibility';
import UserManagement from '@/components/UserManagement';
import NotificationPanel from '@/components/NotificationPanel';
import SettingsPanel from '@/components/SettingsPanel';
// import AccessibilityTests from '@/components/AccessibilityTests';
import AccessibleForms from '@/components/AccessibleForms';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import AccessibleMedia from '@/components/AccessibleMedia';
import ContrastTests from '@/components/ContrastTests';
import AIAccessibilityAssistant from '@/components/AIAccessibilityAssistant';
import { useState } from 'react';
import dashboardHero from '@/assets/dashboard-hero.jpg';
import TextSection from '@/components/TextSection';

const Dashboard = () => {
  // Accessible state management with proper section handling
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { isToolbarOpen, toggleToolbar } = useAccessibility();

  const handleToggleNotifications = () => {
    setIsNotificationOpen(prev => !prev);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'analytics':
        return <AnalyticsChart />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <NotificationPanel />;
      case 'settings':
        return <SettingsPanel />;
      // case 'accessibility-tests':
      //   return <AccessibilityTests />;
      case 'accessible-forms':
        return <AccessibleForms />;
      case 'keyboard-navigation':
        return <KeyboardNavigation />;
      case 'accessible-media':
        return <AccessibleMedia />;
      case 'contrast-tests':
        return <ContrastTests />;
      case 'ai-assistant':
        return <AIAccessibilityAssistant />;
      default:
        return (
          <>
            {/* Hero section */}
            <div className="relative h-40 sm:h-48 lg:h-56 rounded-lg mb-4 sm:mb-6 overflow-hidden mx-2 sm:mx-0">
              <img
              src={dashboardHero}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">Bem-vindo ao Painel</div>
                <div className="text-sm sm:text-base text-white/90">Monitore o desempenho do seu negócio com análises abrangentes</div>
              </div>
            </div>

            <DashboardStats />
            <TextSection />
            {/* <AnalyticsChart /> */}
            <VideoSection />
            <ImageGallery />
            <FormSection />
          </>
        );
    }
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, section: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(section);
    }
  };


  return (
    <div className="min-h-screen dashboard-bg">

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      <div className={`fixed left-0 top-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
        <DashboardSidebar
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
      </div>

      <div className="lg:ml-48 min-h-screen flex flex-col">
        <DashboardHeader
          isNotificationOpen={isNotificationOpen}
          onToggleNotifications={handleToggleNotifications}
          onToggleSidebar={handleToggleSidebar}
        />

        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="max-w-full overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 lg:right-6 stat-card p-2 sm:p-3 lg:p-4 rounded-lg z-30 shadow-lg">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 bg-success-low rounded-full"></div>
          <span className="nav-text text-xs sm:text-sm font-medium">Sistema Online</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;