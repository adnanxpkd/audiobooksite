import React from 'react';
import Select from '../../../components/ui/Select';

const SearchSortOptions = ({ sortBy, onSortChange, resultCount, className = '' }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Releases' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title A-Z' }
  ];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Result Count */}
      <div className="text-sm text-muted-foreground font-caption">
        {resultCount > 0 ? (
          <>
            Showing <span className="font-medium text-foreground">{resultCount}</span> results
          </>
        ) : (
          'No results found'
        )}
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground font-caption hidden sm:block">
          Sort by:
        </span>
        <div className="w-40 sm:w-48">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSortOptions;