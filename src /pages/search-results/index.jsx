 import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchHeader from '../../components/ui/SearchHeader';
import ConsumerTabNavigation from '../../components/ui/ConsumerTabNavigation';
import SearchResultCard from './components/SearchResultCard';
import SearchFilters from './components/SearchFilters';
import SearchSortOptions from './components/SearchSortOptions';
import SearchSuggestions from './components/SearchSuggestions';
import SearchHistory from './components/SearchHistory';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    duration: '',
    rating: '',
    narrator: '',
    releaseYear: ''
  });
  const [searchHistory, setSearchHistory] = useState([]);

  // Mock audiobook data
  const mockAudiobooks = [
    {
      id: 1,
      title: 'രണ്ടാമൂഴം',
      author: 'എം.ടി. വാസുദേവൻ നായർ',
      narrator: 'ജഗതി ശ്രീകുമാർ',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
      duration: 480,
      rating: 4.8,
      reviewCount: 1247,
      price: 299,
      originalPrice: 399,
      category: 'stories',
      releaseYear: 2023,
      isNew: true
    },
    {
      id: 2,
      title: 'ബാല്യകാലസഖി',
      author: 'വൈക്കം മുഹമ്മദ് ബഷീർ',
      narrator: 'മുകേഷ്',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      duration: 180,
      rating: 4.6,
      reviewCount: 892,
      price: 199,
      category: 'romance',
      releaseYear: 2023
    },
    {
      id: 3,
      title: 'ചെമ്മീൻ',
      author: 'തകഴി ശിവശങ്കര പിള്ള',
      narrator: 'കെ.പി.എ.സി. ലളിത',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      duration: 360,
      rating: 4.9,
      reviewCount: 2156,
      price: 349,
      originalPrice: 449,
      category: 'stories',
      releaseYear: 2022
    },
    {
      id: 4,
      title: 'മയ്യഴിപ്പുഴയുടെ തീരങ്ങളിൽ',
      author: 'എം. മുകുന്ദൻ',
      narrator: 'സുരേഷ് ഗോപി',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      duration: 420,
      rating: 4.5,
      reviewCount: 634,
      price: 279,
      category: 'thriller',
      releaseYear: 2024,
      isNew: true
    },
    {
      id: 5,
      title: 'നാലുകെട്ട്',
      author: 'എം.ടി. വാസുദേവൻ നായർ',
      narrator: 'മമ്മൂട്ടി',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      duration: 540,
      rating: 4.7,
      reviewCount: 1089,
      price: 399,
      category: 'stories',
      releaseYear: 2023
    },
    {
      id: 6,
      title: 'ആത്മകഥ',
      author: 'കെ.ആർ. മീര',
      narrator: 'ശോഭന',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
      duration: 300,
      rating: 4.4,
      reviewCount: 456,
      price: 249,
      category: 'biography',
      releaseYear: 2024
    }
  ];

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('audioverse_search_history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
      // Add to search history
      addToSearchHistory(searchQuery);
    } else {
      setResults([]);
      setFilteredResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [results, filters, sortBy]);

  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const searchResults = mockAudiobooks?.filter(book => 
        book?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        book?.author?.toLowerCase()?.includes(query?.toLowerCase()) ||
        book?.narrator?.toLowerCase()?.includes(query?.toLowerCase())
      );
      
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...results];

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(book => filters?.categories?.includes(book?.category));
    }

    // Apply price range filter
    if (filters?.priceRange?.min > 0 || filters?.priceRange?.max < 1000) {
      filtered = filtered?.filter(book => 
        book?.price >= filters?.priceRange?.min && book?.price <= filters?.priceRange?.max
      );
    }

    // Apply duration filter
    if (filters?.duration) {
      const [min, max] = filters?.duration?.split('-')?.map(Number);
      if (max) {
        filtered = filtered?.filter(book => book?.duration >= min && book?.duration <= max);
      } else {
        filtered = filtered?.filter(book => book?.duration >= min);
      }
    }

    // Apply rating filter
    if (filters?.rating) {
      filtered = filtered?.filter(book => book?.rating >= parseFloat(filters?.rating));
    }

    // Apply narrator filter
    if (filters?.narrator) {
      filtered = filtered?.filter(book => 
        book?.narrator?.toLowerCase()?.includes(filters?.narrator?.toLowerCase())
      );
    }

    // Apply release year filter
    if (filters?.releaseYear) {
      filtered = filtered?.filter(book => book?.releaseYear === parseInt(filters?.releaseYear));
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'price_low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price_high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.releaseYear - a?.releaseYear);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'title':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      default: // relevance
        break;
    }

    setFilteredResults(filtered);
  };

  const addToSearchHistory = (query) => {
    const newHistoryItem = {
      query,
      timestamp: new Date()?.toISOString()
    };
    
    const updatedHistory = [
      newHistoryItem,
      ...searchHistory?.filter(item => item?.query !== query)
    ]?.slice(0, 10);
    
    setSearchHistory(updatedHistory);
    localStorage.setItem('audioverse_search_history', JSON.stringify(updatedHistory));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const handleHistoryClick = (query) => {
    handleSearch(query);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('audioverse_search_history');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <ConsumerTabNavigation />
      {/* Main Content */}
      <div className="lg:pt-0 pb-20 lg:pb-8">
        {/* Search Header */}
        <div className="sticky top-0 lg:top-16 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <SearchHeader
                  onSearch={handleSearch}
                  placeholder="Search Malayalam audiobooks..."
                  showVoiceSearch={true}
                />
              </div>
              <Button
                variant="outline"
                size="default"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setShowFilters(true)}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <SearchFilters
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  className="relative"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Sort Options */}
              <SearchSortOptions
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultCount={filteredResults?.length}
                className="mb-6"
              />

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground font-body">Searching...</span>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {!isLoading && filteredResults?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredResults?.map((audiobook) => (
                    <SearchResultCard
                      key={audiobook?.id}
                      audiobook={audiobook}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && searchQuery && filteredResults?.length === 0 && results?.length === 0 && (
                <SearchSuggestions
                  query={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}

              {/* No Results After Filtering */}
              {!isLoading && searchQuery && filteredResults?.length === 0 && results?.length > 0 && (
                <div className="text-center py-12">
                  <Icon name="Filter" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No results match your filters
                  </h3>
                  <p className="text-muted-foreground font-body mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      categories: [],
                      priceRange: { min: 0, max: 1000 },
                      duration: '',
                      rating: '',
                      narrator: '',
                      releaseYear: ''
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !searchQuery && (
                <div className="space-y-6">
                  <SearchHistory
                    history={searchHistory}
                    onHistoryClick={handleHistoryClick}
                    onClearHistory={handleClearHistory}
                  />
                  <SearchSuggestions
                    query=""
                    onSuggestionClick={handleSuggestionClick}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Filters */}
      <SearchFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        className="lg:hidden"
      />
    </div>
  );
};

export default SearchResults;
