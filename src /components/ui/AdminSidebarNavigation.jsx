import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebarNavigation = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      path: '/admin-dashboard'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      path: '/admin-users'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/admin-settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev?.[menuId]
    }));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggleCollapse}
        className="lg:hidden fixed top-4 left-4 z-100 p-2 bg-surface border border-border rounded-lg shadow-soft"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-surface border-r border-border z-90 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-foreground">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground font-caption">Management</p>
                </div>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems?.map((item) => {
              const active = isActive(item?.path);
              
              return (
                <div key={item?.id}>
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      className={active ? 'text-primary-foreground' : 'text-current'}
                    />
                    {!isCollapsed && (
                      <>
                        <span className={`flex-1 font-body text-left ${
                          active ? 'font-medium text-primary-foreground' : 'text-current'
                        }`}>
                          {item?.label}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-80"
          onClick={onToggleCollapse}
        />
      )}
    </>
  );
};

export default AdminSidebarNavigation;
