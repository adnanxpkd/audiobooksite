import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchHeader = ({ 
  onSearch, 
  placeholder = "Search audiobooks, authors, narrators...",
  showVoiceSearch = true,
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'book', title: 'Randamoozham', author: 'M.T. Vasudevan Nair' },
    { type: 'book', title: 'Balyakalasakhi', author: 'Vaikom Muhammad Basheer' },
    { type: 'author', name: 'Thakazhi Sivasankara Pillai' },
    { type: 'narrator', name: 'Jagathy Sreekumar' },
    { type: 'genre', name: 'Malayalam Literature' },
    { type: 'book', title: 'Chemmeen', author: 'Thakazhi Sivasankara Pillai' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter suggestions based on search query
    if (searchQuery?.trim()?.length > 0) {
      const filtered = mockSuggestions?.filter(item => {
        let searchTerm = searchQuery?.toLowerCase();
        if (item?.type === 'book') {
          return item?.title?.toLowerCase()?.includes(searchTerm) || 
                 item?.author?.toLowerCase()?.includes(searchTerm);
        } else if (item?.type === 'author' || item?.type === 'narrator') {
          return item?.name?.toLowerCase()?.includes(searchTerm);
        } else if (item?.type === 'genre') {
          return item?.name?.toLowerCase()?.includes(searchTerm);
        }
        return false;
      })?.slice(0, 6);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      performSearch(searchQuery?.trim());
    }
  };

  const performSearch = (query) => {
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(query);
    }
    // Navigate to search results if not already there
    if (location?.pathname !== '/search-results') {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    let searchTerm = '';
    if (suggestion?.type === 'book') {
      searchTerm = suggestion?.title;
    } else if (suggestion?.type === 'author' || suggestion?.type === 'narrator' || suggestion?.type === 'genre') {
      searchTerm = suggestion?.name;
    }
    
    setSearchQuery(searchTerm);
    performSearch(searchTerm);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ml-IN'; // Malayalam language
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      setSearchQuery(transcript);
      performSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'book': return 'BookOpen';
      case 'author': return 'User';
      case 'narrator': return 'Mic';
      case 'genre': return 'Tag';
      default: return 'Search';
    }
  };

  const getSuggestionLabel = (type) => {
    switch (type) {
      case 'book': return 'Book';
      case 'author': return 'Author';
      case 'narrator': return 'Narrator';
      case 'genre': return 'Genre';
      default: return '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </div>
          
          <Input
            ref={searchRef}
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="pl-10 pr-20 w-full"
            onFocus={() => searchQuery?.trim() && setShowSuggestions(suggestions?.length > 0)}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {showVoiceSearch && (
              <button
                type="button"
                onClick={startVoiceSearch}
                disabled={isListening}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isListening 
                    ? 'bg-accent text-accent-foreground animate-pulse' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
                title="Voice search"
              >
                <Icon name="Mic" size={16} />
              </button>
            )}
            
            <button
              type="submit"
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              title="Search"
            >
              <Icon name="Search" size={16} />
            </button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-70 animate-slide-down"
        >
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-colors duration-200 text-left"
              >
                <Icon 
                  name={getSuggestionIcon(suggestion?.type)} 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-body text-foreground truncate">
                      {suggestion?.type === 'book' ? suggestion?.title : suggestion?.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-caption bg-muted px-2 py-1 rounded-full flex-shrink-0">
                      {getSuggestionLabel(suggestion?.type)}
                    </span>
                  </div>
                  {suggestion?.type === 'book' && (
                    <div className="text-sm text-muted-foreground font-caption truncate">
                      by {suggestion?.author}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;