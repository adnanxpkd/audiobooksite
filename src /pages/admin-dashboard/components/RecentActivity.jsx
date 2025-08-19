import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'user_registration',
      title: 'New User Registration',
      description: 'Arjun Menon joined the platform',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 2,
      type: 'audiobook_upload',
      title: 'Audiobook Uploaded',
      description: 'Chemmeen by Thakazhi added to catalog',
      timestamp: '15 minutes ago',
      icon: 'Upload',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'purchase',
      title: 'New Purchase',
      description: 'Randamoozham purchased for ₹299',
      timestamp: '32 minutes ago',
      icon: 'ShoppingCart',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10'
    },
    {
      id: 4,
      type: 'content_approval',
      title: 'Content Pending Approval',
      description: 'Balyakalasakhi requires review',
      timestamp: '1 hour ago',
      icon: 'Clock',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 5,
      type: 'payment_issue',
      title: 'Payment Failed',
      description: 'Transaction #TXN123 needs attention',
      timestamp: '2 hours ago',
      icon: 'AlertCircle',
      iconColor: 'text-error',
      iconBg: 'bg-error/10'
    }
  ];

  const getActionButton = (activity) => {
    switch (activity?.type) {
      case 'content_approval':
        return (
          <Button variant="outline" size="sm">
            Review
          </Button>
        );
      case 'payment_issue':
        return (
          <Button variant="outline" size="sm">
            Resolve
          </Button>
        );
      default:
        return (
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View
          </Button>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Latest platform events and notifications
          </p>
        </div>
        
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-lg ${activity?.iconBg} flex-shrink-0`}>
              <Icon name={activity?.icon} size={18} className={activity?.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-foreground mb-1">
                    {activity?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-caption mb-2">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground font-data">
                    {activity?.timestamp}
                  </p>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  {getActionButton(activity)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" fullWidth iconName="ArrowRight" iconPosition="right">
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;
