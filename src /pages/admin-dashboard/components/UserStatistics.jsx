import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserStatistics = () => {
  const [activeTab, setActiveTab] = useState('demographics');

  const demographicsData = [
    { name: 'Kerala', value: 45, color: '#2D5A5A' },
    { name: 'Karnataka', value: 25, color: '#D4A574' },
    { name: 'Tamil Nadu', value: 15, color: '#E67E22' },
    { name: 'Other States', value: 15, color: '#10B981' }
  ];

  const engagementData = [
    { name: 'Daily Active', value: 35, color: '#2D5A5A' },
    { name: 'Weekly Active', value: 40, color: '#D4A574' },
    { name: 'Monthly Active', value: 20, color: '#E67E22' },
    { name: 'Inactive', value: 5, color: '#EF4444' }
  ];

  const userGrowth = [
    { period: 'This Week', new: 156, returning: 1240 },
    { period: 'This Month', new: 678, returning: 4520 },
    { period: 'This Quarter', new: 2340, returning: 12800 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-body font-medium text-foreground">
            {data?.name}: {data?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const currentData = activeTab === 'demographics' ? demographicsData : engagementData;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            User Statistics
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            User distribution and engagement metrics
          </p>
        </div>
        
        <Button variant="outline" size="sm" iconName="Download">
          Export
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex items-center bg-muted rounded-lg p-1 mb-6">
        <Button
          variant={activeTab === 'demographics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('demographics')}
        >
          Demographics
        </Button>
        <Button
          variant={activeTab === 'engagement' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('engagement')}
        >
          Engagement
        </Button>
      </div>
      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {currentData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {currentData?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="font-body text-foreground">{item?.name}</span>
              </div>
              <span className="font-data font-medium text-foreground">
                {item?.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Growth Metrics */}
      <div>
        <h4 className="font-body font-medium text-foreground mb-4">
          User Growth Trends
        </h4>
        <div className="space-y-3">
          {userGrowth?.map((growth, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="font-body text-foreground">{growth?.period}</span>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="UserPlus" size={16} className="text-success" />
                  <span className="text-sm font-data text-foreground">
                    {growth?.new?.toLocaleString('en-IN')} new
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-data text-foreground">
                    {growth?.returning?.toLocaleString('en-IN')} returning
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
