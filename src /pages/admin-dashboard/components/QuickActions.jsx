import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Add New Audiobook',
      description: 'Upload and configure new content',
      icon: 'Plus',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => console.log('Navigate to add audiobook')
    },
    {
      id: 2,
      title: 'Feature Content',
      description: 'Promote audiobooks on homepage',
      icon: 'Star',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: () => console.log('Navigate to feature content')
    },
    {
      id: 3,
      title: 'Manage Users',
      description: 'View and moderate user accounts',
      icon: 'Users',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      action: () => console.log('Navigate to user management')
    },
    {
      id: 4,
      title: 'View Reports',
      description: 'Access detailed analytics',
      icon: 'BarChart3',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      action: () => console.log('Navigate to reports')
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Server Storage',
      message: 'Audio storage is 85% full',
      action: 'Manage Storage'
    },
    {
      id: 2,
      type: 'info',
      title: 'Backup Complete',
      message: 'Daily backup completed successfully',
      action: 'View Details'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Gateway',
      message: '3 failed transactions need attention',
      action: 'Resolve Issues'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Quick Actions
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Common administrative tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 text-left group"
            >
              <div className={`p-3 rounded-lg ${action?.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.textColor} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-foreground mb-1">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground font-caption">
                  {action?.description}
                </p>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </button>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              System Alerts
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Important notifications and issues
            </p>
          </div>
          
          <Button variant="outline" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>

        <div className="space-y-3">
          {systemAlerts?.map((alert) => (
            <div key={alert?.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={18} 
                  className={getAlertColor(alert?.type)} 
                />
                <div>
                  <h4 className="font-body font-medium text-foreground">
                    {alert?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-caption">
                    {alert?.message}
                  </p>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                {alert?.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" fullWidth iconName="Bell">
            View All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
