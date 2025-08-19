import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentOverview = () => {
  const contentStats = [
    {
      type: 'Articles',
      count: 127,
      published: 89,
      draft: 38,
      icon: 'FileText',
      trend: '+12%'
    },
    {
      type: 'Videos',
      count: 45,
      published: 32,
      draft: 13,
      icon: 'Video',
      trend: '+8%'
    },
    {
      type: 'Images',
      count: 234,
      published: 198,
      draft: 36,
      icon: 'Image',
      trend: '+15%'
    },
    {
      type: 'Documents',
      count: 78,
      published: 56,
      draft: 22,
      icon: 'File',
      trend: '+5%'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Content Overview
        </h3>
        <button className="text-primary hover:text-primary/80 font-body text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {contentStats?.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-body font-medium text-foreground">{stat?.type}</h4>
                <p className="text-sm text-muted-foreground font-caption">
                  {stat?.published} published, {stat?.draft} draft
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading font-semibold text-lg text-foreground">{stat?.count}</p>
              <p className="text-sm text-success font-data">{stat?.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentOverview;
