import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ isOpen, onClose, filters, onFiltersChange, className = '' }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: 'thriller', label: 'ത്രില്ലർ' },
    { value: 'motivation', label: 'പ്രചോദനം' },
    { value: 'stories', label: 'കഥകൾ' },
    { value: 'biography', label: 'ജീവചരിത്രം' },
    { value: 'spiritual', label: 'ആത്മീയം' },
    { value: 'romance', label: 'പ്രണയം' },
    { value: 'mystery', label: 'രഹസ്യം' },
    { value: 'comedy', label: 'ഹാസ്യം' }
  ];

  const durations = [
    { value: '0-60', label: 'Under 1 hour' },
    { value: '60-180', label: '1-3 hours' },
    { value: '180-360', label: '3-6 hours' },
    { value: '360-600', label: '6-10 hours' },
    { value: '600+', label: 'Over 10 hours' }
  ];

  const ratings = [
    { value: '4.5', label: '4.5 & above' },
    { value: '4.0', label: '4.0 & above' },
    { value: '3.5', label: '3.5 & above' },
    { value: '3.0', label: '3.0 & above' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleCategoryChange = (categoryValue, checked) => {
    const currentCategories = localFilters?.categories || [];
    const updatedCategories = checked
      ? [...currentCategories, categoryValue]
      : currentCategories?.filter(cat => cat !== categoryValue);
    
    handleFilterChange('categories', updatedCategories);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: 0, max: 1000 },
      duration: '',
      rating: '',
      narrator: '',
      releaseYear: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-90" onClick={onClose} />
      {/* Filter Panel */}
      <div className={`fixed lg:static inset-x-0 bottom-0 lg:inset-auto bg-surface border-t lg:border border-border rounded-t-2xl lg:rounded-lg z-100 lg:z-auto max-h-[80vh] lg:max-h-none overflow-hidden ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] lg:max-h-none">
          <div className="p-4 space-y-6">
            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Categories</h4>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <Checkbox
                    key={category?.value}
                    label={category?.label}
                    checked={localFilters?.categories?.includes(category?.value) || false}
                    onChange={(e) => handleCategoryChange(category?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Price Range</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Min Price"
                  placeholder="₹0"
                  value={localFilters?.priceRange?.min || ''}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...localFilters?.priceRange,
                    min: parseInt(e?.target?.value) || 0
                  })}
                />
                <Input
                  type="number"
                  label="Max Price"
                  placeholder="₹1000"
                  value={localFilters?.priceRange?.max || ''}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...localFilters?.priceRange,
                    max: parseInt(e?.target?.value) || 1000
                  })}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Duration</h4>
              <Select
                options={durations}
                value={localFilters?.duration || ''}
                onChange={(value) => handleFilterChange('duration', value)}
                placeholder="Select duration"
              />
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Rating</h4>
              <Select
                options={ratings}
                value={localFilters?.rating || ''}
                onChange={(value) => handleFilterChange('rating', value)}
                placeholder="Select minimum rating"
              />
            </div>

            {/* Narrator */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Narrator</h4>
              <Input
                type="text"
                placeholder="Search narrator"
                value={localFilters?.narrator || ''}
                onChange={(e) => handleFilterChange('narrator', e?.target?.value)}
              />
            </div>

            {/* Release Year */}
            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Release Year</h4>
              <Input
                type="number"
                placeholder="2024"
                min="1990"
                max="2024"
                value={localFilters?.releaseYear || ''}
                onChange={(e) => handleFilterChange('releaseYear', e?.target?.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;