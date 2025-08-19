import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ConsumerTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'Home',
      path: '/homepage',
      activeIcon: 'Home'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      path: '/admin-dashboard',
      activeIcon: 'BarChart3'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-90 ${className}`}>
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems?.map((item) => {
            const active = isActive(item?.path);
            return (
              <button
                key={item?.id}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ease-smooth min-w-0 flex-1 ${
                  active
                    ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon
                  name={active ? item?.activeIcon : item?.icon}
                  size={20}
                  className={`mb-1 ${active ? 'text-primary' : 'text-current'}`}
                />
                <span className={`text-xs font-caption truncate ${
                  active ? 'font-medium text-primary' : 'text-current'
                }`}>
                  {item?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Top Navigation */}
      <nav className={`hidden lg:flex items-center justify-center bg-surface border-b border-border sticky top-0 z-80 ${className}`}>
        <div className="flex items-center space-x-8 px-6 py-4">
          {navigationItems?.map((item) => {
            const active = isActive(item?.path);
            return (
              <button
                key={item?.id}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ease-smooth ${
                  active
                    ? 'text-primary bg-primary/5 font-medium' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon
                  name={active ? item?.activeIcon : item?.icon}
                  size={18}
                  className={active ? 'text-primary' : 'text-current'}
                />
                <span className={`font-body ${active ? 'font-medium text-primary' : 'text-current'}`}>
                  {item?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ConsumerTabNavigation;