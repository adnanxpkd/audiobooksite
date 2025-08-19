import React, { useState } from 'react';
import AdminSidebarNavigation from '../../components/ui/AdminSidebarNavigation';
import Icon from '../../components/AppIcon';
import StatsCard from './components/StatsCard';
import SalesChart from './components/SalesChart';
import RecentActivity from './components/RecentActivity';
import UserStatistics from './components/UserStatistics';
import ContentOverview from './components/ContentOverview';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock dashboard data
  const dashboardStats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Active users this month'
    },
    {
      title: 'Revenue',
      value: '₹2,45,890',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Total revenue this month'
    },
    {
      title: 'Engagement',
      value: '89.5%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'TrendingUp',
      description: 'User engagement rate'
    },
    {
      title: 'Support Tickets',
      value: '127',
      change: '+15.3%',
      changeType: 'negative',
      icon: 'HelpCircle',
      description: 'Open support tickets'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebarNavigation
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground font-caption mt-1">
                Overview of your application performance and metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span className="font-body font-medium">Export Report</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {dashboardStats?.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart />
            <UserStatistics />
          </div>

          {/* Content Overview and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentOverview />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
