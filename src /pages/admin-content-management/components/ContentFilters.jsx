import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onBulkAction,
  selectedCount 
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending Review' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'motivation', label: 'Motivation' },
    { value: 'stories', label: 'Stories' },
    { value: 'biography', label: 'Biography' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'romance', label: 'Romance' },
    { value: 'history', label: 'History' }
  ];

  const sortOptions = [
    { value: 'uploadDate-desc', label: 'Latest First' },
    { value: 'uploadDate-asc', label: 'Oldest First' },
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'sales-desc', label: 'Highest Sales' },
    { value: 'sales-asc', label: 'Lowest Sales' }
  ];

  const bulkActions = [
    { value: 'publish', label: 'Publish Selected', icon: 'CheckCircle' },
    { value: 'draft', label: 'Move to Draft', icon: 'Edit' },
    { value: 'feature', label: 'Add to Featured', icon: 'Star' },
    { value: 'unfeature', label: 'Remove from Featured', icon: 'StarOff' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' }
  ];

  const hasActiveFilters = filters?.search || filters?.status || filters?.category || filters?.dateFrom || filters?.dateTo;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search audiobooks, authors..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            <div className="flex items-center space-x-1">
              {bulkActions?.map((action) => (
                <Button
                  key={action?.value}
                  variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => onBulkAction(action?.value)}
                  iconName={action?.icon}
                  iconSize={16}
                  title={action?.label}
                >
                  <span className="hidden sm:inline">{action?.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Filter by category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Input
          type="date"
          placeholder="From date"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          placeholder="To date"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
        />

        <Select
          placeholder="Sort by"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>
      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters?.search && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center space-x-1">
                <span>Search: "{filters?.search}"</span>
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.status && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center space-x-1">
                <span>Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}</span>
                <button
                  onClick={() => onFilterChange('status', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.category && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center space-x-1">
                <span>Category: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}</span>
                <button
                  onClick={() => onFilterChange('category', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconSize={14}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentFilters;
