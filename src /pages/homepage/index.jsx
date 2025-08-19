import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';

const Homepage = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data
  const userData = {
    name: "രാജേഷ് കുമാർ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    isPremium: false
  };

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handlePullToRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-80 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Star" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-foreground">AppName</h1>
              <p className="text-xs text-muted-foreground font-caption">Welcome</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2"
            >
              <div className="relative">
                <Image
                  src={userData?.avatar}
                  alt={userData?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {userData?.isPremium && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Crown" size={10} className="text-accent-foreground" />
                  </div>
                )}
              </div>
              <span className="hidden lg:block font-body text-sm text-foreground truncate max-w-24">
                {userData?.name}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4 bg-primary/5">
            <div className="flex items-center space-x-2 text-primary">
              <Icon name="RefreshCw" size={16} className="animate-spin" />
              <span className="text-sm font-medium">പുതുക്കുന്നു...</span>
            </div>
          </div>
        )}

        <div className="space-y-8 p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Star" size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Welcome to Your App
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-8">
              Discover amazing content and connect with your community. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/admin-dashboard')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/admin-dashboard')}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
                Features
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Dashboard', icon: 'BarChart3', description: 'Analytics & Reports', color: 'bg-blue-500' },
                { name: 'Settings', icon: 'Settings', description: 'Customize Experience', color: 'bg-green-500' },
                { name: 'Community', icon: 'Users', description: 'Connect with Others', color: 'bg-purple-500' },
                { name: 'Support', icon: 'HelpCircle', description: 'Get Help', color: 'bg-orange-500' }
              ]?.map((feature, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => navigate('/admin-dashboard')}
                  className="h-24 flex-col space-y-2 hover:shadow-soft transition-all duration-200"
                >
                  <div className={`w-8 h-8 ${feature?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={feature?.icon} size={16} className="text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-body font-medium text-sm">{feature?.name}</div>
                    <div className="text-xs text-muted-foreground font-data">{feature?.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Latest Updates</h3>
                <p className="text-sm text-muted-foreground font-caption">Recent improvements and news</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { title: 'New dashboard features added', time: '2 hours ago' },
                { title: 'Performance improvements', time: '1 day ago' },
                { title: 'Enhanced user experience', time: '3 days ago' }
              ]?.map((update, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="font-body text-sm text-foreground">{update?.title}</span>
                  <span className="text-xs text-muted-foreground font-data">{update?.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
