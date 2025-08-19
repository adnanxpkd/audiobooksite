import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsModal = ({ isOpen, onClose, audiobook }) => {
  const [timeRange, setTimeRange] = useState('30d');

  if (!isOpen || !audiobook) return null;

  // Mock analytics data
  const downloadData = [
    { date: '01/08', downloads: 45 },
    { date: '02/08', downloads: 52 },
    { date: '03/08', downloads: 38 },
    { date: '04/08', downloads: 67 },
    { date: '05/08', downloads: 71 },
    { date: '06/08', downloads: 58 },
    { date: '07/08', downloads: 63 }
  ];

  const revenueData = [
    { date: '01/08', revenue: 13450 },
    { date: '02/08', revenue: 15560 },
    { date: '03/08', revenue: 11370 },
    { date: '04/08', revenue: 20030 },
    { date: '05/08', revenue: 21230 },
    { date: '06/08', revenue: 17340 },
    { date: '07/08', revenue: 18850 }
  ];

  const demographicData = [
    { name: '18-25', value: 25, color: '#2D5A5A' },
    { name: '26-35', value: 35, color: '#D4A574' },
    { name: '36-45', value: 28, color: '#E67E22' },
    { name: '46+', value: 12, color: '#10B981' }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const stats = [
    {
      label: 'Total Downloads',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: 'Download'
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(851490),
      change: '+8.2%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      label: 'Avg. Rating',
      value: '4.6',
      change: '+0.3',
      trend: 'up',
      icon: 'Star'
    },
    {
      label: 'Completion Rate',
      value: '78%',
      change: '-2.1%',
      trend: 'down',
      icon: 'PlayCircle'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-surface rounded-xl shadow-elevated max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={audiobook?.cover}
              alt={audiobook?.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">{audiobook?.title}</h2>
              <p className="text-muted-foreground font-caption">{audiobook?.titleMalayalam}</p>
              <p className="text-sm text-muted-foreground">by {audiobook?.author}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats?.map((stat, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                  <span className={`text-xs font-medium flex items-center space-x-1 ${
                    stat?.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                    <span>{stat?.change}</span>
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Downloads Chart */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Downloads Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={downloadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-popover)', 
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="downloads" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Revenue Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-popover)', 
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [formatCurrency(value), 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-accent)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Demographics and Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Age Demographics */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Age Demographics</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {demographicData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {demographicData?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item?.color }}
                      />
                      <span className="text-sm text-foreground">{item?.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item?.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Regions */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Top Regions</h3>
              <div className="space-y-3">
                {[
                  { region: 'Kerala', percentage: 45, downloads: 1280 },
                  { region: 'Karnataka', percentage: 22, downloads: 626 },
                  { region: 'Tamil Nadu', percentage: 18, downloads: 512 },
                  { region: 'Maharashtra', percentage: 10, downloads: 285 },
                  { region: 'Others', percentage: 5, downloads: 144 }
                ]?.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item?.region}</span>
                      <span className="text-sm text-muted-foreground">{item?.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item?.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item?.downloads} downloads</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Reviews</h3>
              <div className="space-y-3">
                {[
                  { user: 'Rajesh Kumar', rating: 5, comment: 'Excellent narration and story quality.' },
                  { user: 'Priya Nair', rating: 4, comment: 'Good content, enjoyed listening.' },
                  { user: 'Arun Menon', rating: 5, comment: 'Outstanding Malayalam audiobook experience.' }
                ]?.map((review, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{review?.user}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{review?.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
