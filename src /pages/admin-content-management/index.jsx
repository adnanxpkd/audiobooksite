import React, { useState, useEffect } from 'react';
import AdminSidebarNavigation from '../../components/ui/AdminSidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContentUploadModal from './components/ContentUploadModal';
import ContentTable from './components/ContentTable';
import ContentFilters from './components/ContentFilters';
import AnalyticsModal from './components/AnalyticsModal';

const AdminContentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [selectedAudiobook, setSelectedAudiobook] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'uploadDate', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'uploadDate-desc'
  });

  // Mock audiobooks data
  const [audiobooks, setAudiobooks] = useState([
    {
      id: 1,
      title: 'Randamoozham',
      titleMalayalam: 'രണ്ടാമൂഴം',
      author: 'M.T. Vasudevan Nair',
      narrator: 'Jagathy Sreekumar',
      category: 'Stories',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      uploadDate: '2024-08-15',
      status: 'published',
      featured: true,
      downloads: 2847,
      revenue: 851490,
      duration: 720,
      price: 299
    },
    {
      id: 2,
      title: 'Balyakalasakhi',
      titleMalayalam: 'ബാല്യകാലസഖി',
      author: 'Vaikom Muhammad Basheer',
      narrator: 'Nedumudi Venu',
      category: 'Romance',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      uploadDate: '2024-08-12',
      status: 'published',
      featured: false,
      downloads: 1923,
      revenue: 574890,
      duration: 480,
      price: 299
    },
    {
      id: 3,
      title: 'Chemmeen',
      titleMalayalam: 'ചെമ്മീൻ',
      author: 'Thakazhi Sivasankara Pillai',
      narrator: 'Mammootty',
      category: 'Stories',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      uploadDate: '2024-08-10',
      status: 'draft',
      featured: false,
      downloads: 0,
      revenue: 0,
      duration: 600,
      price: 349
    },
    {
      id: 4,
      title: 'Motivation Mastery',
      titleMalayalam: 'പ്രചോദന വൈദഗ്ധ്യം',
      author: 'Dr. Rajeev Kumar',
      narrator: 'Suresh Gopi',
      category: 'Motivation',
      cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop',
      uploadDate: '2024-08-08',
      status: 'pending',
      featured: true,
      downloads: 1456,
      revenue: 436800,
      duration: 360,
      price: 199
    },
    {
      id: 5,
      title: 'Kerala History',
      titleMalayalam: 'കേരള ചരിത്രം',
      author: 'Prof. K.N. Panikkar',
      narrator: 'Mohanlal',
      category: 'History',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      uploadDate: '2024-08-05',
      status: 'published',
      featured: false,
      downloads: 892,
      revenue: 267600,
      duration: 900,
      price: 399
    }
  ]);

  const [filteredAudiobooks, setFilteredAudiobooks] = useState(audiobooks);

  // Filter and sort audiobooks
  useEffect(() => {
    let filtered = [...audiobooks];

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(book =>
        book?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        book?.titleMalayalam?.includes(filters?.search) ||
        book?.author?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(book => book?.status === filters?.status);
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(book => book?.category?.toLowerCase() === filters?.category);
    }

    // Apply date filters
    if (filters?.dateFrom) {
      filtered = filtered?.filter(book => new Date(book.uploadDate) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(book => new Date(book.uploadDate) <= new Date(filters.dateTo));
    }

    // Apply sorting
    if (filters?.sortBy) {
      const [key, direction] = filters?.sortBy?.split('-');
      filtered?.sort((a, b) => {
        let aValue = a?.[key];
        let bValue = b?.[key];

        if (key === 'uploadDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    setFilteredAudiobooks(filtered);
  }, [audiobooks, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'uploadDate-desc'
    });
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev?.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredAudiobooks?.map(book => book?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    handleFilterChange('sortBy', `${key}-${direction}`);
  };

  const handleUpload = (uploadData) => {
    const newAudiobook = {
      id: audiobooks?.length + 1,
      title: uploadData?.title,
      titleMalayalam: uploadData?.titleMalayalam,
      author: uploadData?.author,
      narrator: uploadData?.narrator,
      category: uploadData?.category,
      cover: uploadData?.coverImage ? URL.createObjectURL(uploadData?.coverImage) : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      uploadDate: new Date()?.toISOString()?.split('T')?.[0],
      status: 'draft',
      featured: false,
      downloads: 0,
      revenue: 0,
      duration: parseInt(uploadData?.duration),
      price: parseInt(uploadData?.price)
    };

    setAudiobooks(prev => [newAudiobook, ...prev]);
  };

  const handleEdit = (audiobook) => {
    // In a real app, this would open an edit modal
    console.log('Edit audiobook:', audiobook);
  };

  const handleToggleFeature = (id) => {
    setAudiobooks(prev =>
      prev?.map(book =>
        book?.id === id ? { ...book, featured: !book?.featured } : book
      )
    );
  };

  const handleViewAnalytics = (audiobook) => {
    setSelectedAudiobook(audiobook);
    setAnalyticsModalOpen(true);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'publish':
        setAudiobooks(prev =>
          prev?.map(book =>
            selectedItems?.includes(book?.id) ? { ...book, status: 'published' } : book
          )
        );
        break;
      case 'draft':
        setAudiobooks(prev =>
          prev?.map(book =>
            selectedItems?.includes(book?.id) ? { ...book, status: 'draft' } : book
          )
        );
        break;
      case 'feature':
        setAudiobooks(prev =>
          prev?.map(book =>
            selectedItems?.includes(book?.id) ? { ...book, featured: true } : book
          )
        );
        break;
      case 'unfeature':
        setAudiobooks(prev =>
          prev?.map(book =>
            selectedItems?.includes(book?.id) ? { ...book, featured: false } : book
          )
        );
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete the selected audiobooks?')) {
          setAudiobooks(prev => prev?.filter(book => !selectedItems?.includes(book?.id)));
        }
        break;
    }
    setSelectedItems([]);
  };

  const stats = [
    {
      label: 'Total Audiobooks',
      value: audiobooks?.length?.toString(),
      change: '+3 this week',
      icon: 'BookOpen',
      color: 'text-primary'
    },
    {
      label: 'Published',
      value: audiobooks?.filter(book => book?.status === 'published')?.length?.toString(),
      change: `${Math.round((audiobooks?.filter(book => book?.status === 'published')?.length / audiobooks?.length) * 100)}% of total`,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Total Downloads',
      value: audiobooks?.reduce((sum, book) => sum + book?.downloads, 0)?.toLocaleString('en-IN'),
      change: '+12% this month',
      icon: 'Download',
      color: 'text-accent'
    },
    {
      label: 'Total Revenue',
      value: `₹${audiobooks?.reduce((sum, book) => sum + book?.revenue, 0)?.toLocaleString('en-IN')}`,
      change: '+8.5% this month',
      icon: 'DollarSign',
      color: 'text-warning'
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
                Content Management
              </h1>
              <p className="text-muted-foreground font-caption mt-1">
                Manage your Malayalam audiobook catalog and track performance
              </p>
            </div>
            
            <Button
              onClick={() => setUploadModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              className="lg:w-auto"
            >
              Upload Audiobook
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats?.map((stat, index) => (
              <div key={index} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {stat?.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <ContentFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onBulkAction={handleBulkAction}
            selectedCount={selectedItems?.length}
          />

          {/* Content Table */}
          <ContentTable
            audiobooks={filteredAudiobooks}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onEdit={handleEdit}
            onToggleFeature={handleToggleFeature}
            onViewAnalytics={handleViewAnalytics}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Empty State */}
          {filteredAudiobooks?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                No audiobooks found
              </h3>
              <p className="text-muted-foreground mb-4">
                {filters?.search || filters?.status || filters?.category
                  ? 'Try adjusting your filters to see more results.' :'Get started by uploading your first Malayalam audiobook.'}
              </p>
              {!filters?.search && !filters?.status && !filters?.category && (
                <Button
                  onClick={() => setUploadModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Upload First Audiobook
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <ContentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />
      <AnalyticsModal
        isOpen={analyticsModalOpen}
        onClose={() => setAnalyticsModalOpen(false)}
        audiobook={selectedAudiobook}
      />
    </div>
  );
};

export default AdminContentManagement;
