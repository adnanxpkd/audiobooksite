import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import Button from '../../../components/ui/Button';

const SalesChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('7days');

  const salesData = [
    { name: 'Jan', sales: 45000, users: 120 },
    { name: 'Feb', sales: 52000, users: 145 },
    { name: 'Mar', sales: 48000, users: 135 },
    { name: 'Apr', sales: 61000, users: 180 },
    { name: 'May', sales: 55000, users: 165 },
    { name: 'Jun', sales: 67000, users: 200 },
    { name: 'Jul', sales: 72000, users: 220 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-body font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm font-data" style={{ color: entry?.color }}>
              {entry?.dataKey === 'sales' ? 'Sales: ₹' : 'Users: '}
              {entry?.value?.toLocaleString('en-IN')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Sales Analytics
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Revenue and user growth trends
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              iconName="BarChart3"
              onClick={() => setChartType('bar')}
            >
              Bar
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              iconName="TrendingUp"
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>
      <div className="h-80" aria-label="Sales Analytics Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-data)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-data)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
