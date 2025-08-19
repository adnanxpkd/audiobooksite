import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import SearchHeader from '../../../components/ui/SearchHeader';
import Select from '../../../components/ui/Select';

const LibraryHeader = ({ 
  onSearch, 
  onSortChange, 
  onViewModeChange, 
  viewMode = 'grid',
  totalBooks = 0,
  className = '' 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' },
    { value: 'progress', label: 'Progress' },
    { value: 'purchase_date', label: 'Purchase Date' }
  ];

  const handleSortChange = (value) => {
    onSortChange(value);
  };

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="p-4 space-y-4">
        {/* Title and Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-semibold text-2xl text-foreground">My Library</h1>
            <p className="text-sm text-muted-foreground font-caption mt-1">
              {totalBooks} {totalBooks === 1 ? 'audiobook' : 'audiobooks'} in your collection
            </p>
          </div>
          
          {/* View Mode Toggle - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-surface text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid view"
            >
              <Icon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ?'bg-surface text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List view"
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchHeader
            onSearch={onSearch}
            placeholder="Search your library..."
            showVoiceSearch={false}
            className="w-full"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between space-x-4">
          {/* Sort Dropdown */}
          <div className="flex-1 max-w-xs">
            <Select
              options={sortOptions}
              value="recent"
              onChange={handleSortChange}
              placeholder="Sort by"
              className="w-full"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              showFilters
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-surface text-foreground border-border hover:bg-muted'
            }`}
          >
            <Icon name="Filter" size={16} />
            <span className="font-body text-sm">Filters</span>
          </button>

          {/* Mobile View Mode Toggle */}
          <div className="lg:hidden flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-surface text-foreground shadow-soft' :'text-muted-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ?'bg-surface text-foreground shadow-soft' :'text-muted-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-muted rounded-lg p-4 space-y-4 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Completion Status"
                options={[
                  { value: 'all', label: 'All Books' },
                  { value: 'not_started', label: 'Not Started' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' }
                ]}
                value="all"
                onChange={() => {}}
              />
              
              <Select
                label="Download Status"
                options={[
                  { value: 'all', label: 'All Books' },
                  { value: 'downloaded', label: 'Downloaded' },
                  { value: 'streaming', label: 'Streaming Only' }
                ]}
                value="all"
                onChange={() => {}}
              />
              
              <Select
                label="Purchase Period"
                options={[
                  { value: 'all', label: 'All Time' },
                  { value: 'last_week', label: 'Last Week' },
                  { value: 'last_month', label: 'Last Month' },
                  { value: 'last_year', label: 'Last Year' }
                ]}
                value="all"
                onChange={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryHeader;