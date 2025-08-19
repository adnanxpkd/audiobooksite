import React, { useState, useEffect } from 'react';
import ConsumerTabNavigation from '../../components/ui/ConsumerTabNavigation';
import AudioPlayerGlobal from '../../components/ui/AudioPlayerGlobal';
import LibraryHeader from './components/LibraryHeader';
import AudiobookCard from './components/AudiobookCard';
import RecentlyPlayedSection from './components/RecentlyPlayedSection';
import EmptyLibraryState from './components/EmptyLibraryState';
import BulkActionsBar from './components/BulkActionsBar';

const MyLibrary = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Mock library data
  const libraryBooks = [
    {
      id: 1,
      title: "Randamoozham",
      author: "M.T. Vasudevan Nair",
      narrator: "Jagathy Sreekumar",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      duration: 14400, // 4 hours
      progress: 65,
      currentTime: 9360,
      purchaseDate: "2024-08-15T10:30:00Z",
      lastPlayed: "2024-08-18T15:45:00Z",
      isDownloaded: true,
      genre: "Epic Literature",
      rating: 4.8,
      price: "₹299"
    },
    {
      id: 2,
      title: "Balyakalasakhi",
      author: "Vaikom Muhammad Basheer",
      narrator: "Nedumudi Venu",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      duration: 10800, // 3 hours
      progress: 100,
      currentTime: 10800,
      purchaseDate: "2024-08-10T14:20:00Z",
      lastPlayed: "2024-08-17T20:15:00Z",
      isDownloaded: false,
      genre: "Romance",
      rating: 4.7,
      price: "₹199"
    },
    {
      id: 3,
      title: "Chemmeen",
      author: "Thakazhi Sivasankara Pillai",
      narrator: "Mammootty",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      duration: 12600, // 3.5 hours
      progress: 23,
      currentTime: 2898,
      purchaseDate: "2024-08-12T09:15:00Z",
      lastPlayed: "2024-08-16T11:30:00Z",
      isDownloaded: true,
      genre: "Drama",
      rating: 4.9,
      price: "₹249"
    },
    {
      id: 4,
      title: "Aadujeevitham",
      author: "Benyamin",
      narrator: "Prithviraj Sukumaran",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
      duration: 16200, // 4.5 hours
      progress: 0,
      currentTime: 0,
      purchaseDate: "2024-08-14T16:45:00Z",
      lastPlayed: null,
      isDownloaded: false,
      genre: "Contemporary Fiction",
      rating: 4.6,
      price: "₹349"
    },
    {
      id: 5,
      title: "Pathummayude Aadu",
      author: "Vaikom Muhammad Basheer",
      narrator: "Mohanlal",
      cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
      duration: 7200, // 2 hours
      progress: 45,
      currentTime: 3240,
      purchaseDate: "2024-08-08T12:00:00Z",
      lastPlayed: "2024-08-15T18:20:00Z",
      isDownloaded: true,
      genre: "Short Stories",
      rating: 4.5,
      price: "₹149"
    }
  ];

  const recentlyPlayed = libraryBooks?.filter(book => book?.lastPlayed && book?.progress > 0 && book?.progress < 100)?.sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))?.slice(0, 6);

  useEffect(() => {
    let filtered = [...libraryBooks];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(book => 
        book?.title?.toLowerCase()?.includes(query) ||
        book?.author?.toLowerCase()?.includes(query) ||
        book?.narrator?.toLowerCase()?.includes(query) ||
        book?.genre?.toLowerCase()?.includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'title':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'author':
        filtered?.sort((a, b) => a?.author?.localeCompare(b?.author));
        break;
      case 'progress':
        filtered?.sort((a, b) => b?.progress - a?.progress);
        break;
      case 'purchase_date':
        filtered?.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        break;
      default: // recent
        filtered?.sort((a, b) => {
          const aDate = new Date(a.lastPlayed || a.purchaseDate);
          const bDate = new Date(b.lastPlayed || b.purchaseDate);
          return bDate - aDate;
        });
    }

    setFilteredBooks(filtered);
  }, [searchQuery, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePlay = (audiobook) => {
    setCurrentAudio(audiobook);
    setIsPlayerVisible(true);
  };

  const handleDownload = (bookId) => {
    // Mock download functionality
    console.log('Downloading book:', bookId);
    // In real app, this would trigger download process
  };

  const handleRemoveDownload = (bookId) => {
    // Mock remove download functionality
    console.log('Removing download for book:', bookId);
    // In real app, this would remove downloaded files
  };

  const handleBookSelect = (bookId, isSelected) => {
    if (isSelected) {
      setSelectedBooks(prev => [...prev, bookId]);
    } else {
      setSelectedBooks(prev => prev?.filter(id => id !== bookId));
    }
  };

  const handleSelectAll = () => {
    setSelectedBooks(filteredBooks?.map(book => book?.id));
  };

  const handleDeselectAll = () => {
    setSelectedBooks([]);
    setIsSelectionMode(false);
  };

  const handleBulkDownload = (books) => {
    console.log('Bulk downloading books:', books);
    // In real app, this would trigger bulk download
  };

  const handleBulkRemoveDownload = (books) => {
    console.log('Bulk removing downloads for books:', books);
    // In real app, this would remove bulk downloads
  };

  const handleBulkDelete = (books) => {
    console.log('Bulk deleting books:', books);
    // In real app, this would remove books from library
    setSelectedBooks([]);
    setIsSelectionMode(false);
  };

  const selectedBooksData = filteredBooks?.filter(book => selectedBooks?.includes(book?.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <ConsumerTabNavigation />
      {/* Main Content */}
      <div className="pb-16 lg:pb-0">
        {/* Header */}
        <LibraryHeader
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onViewModeChange={handleViewModeChange}
          viewMode={viewMode}
          totalBooks={filteredBooks?.length}
        />

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedBooks={selectedBooksData}
          totalBooks={filteredBooks?.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onBulkDownload={handleBulkDownload}
          onBulkRemoveDownload={handleBulkRemoveDownload}
          onBulkDelete={handleBulkDelete}
        />

        {/* Content */}
        {filteredBooks?.length === 0 ? (
          <EmptyLibraryState />
        ) : (
          <div className="space-y-6">
            {/* Recently Played Section */}
            {recentlyPlayed?.length > 0 && !searchQuery && (
              <RecentlyPlayedSection
                recentBooks={recentlyPlayed}
                onPlay={handlePlay}
              />
            )}

            {/* Library Grid/List */}
            <div className="p-4">
              {searchQuery && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground font-caption">
                    {filteredBooks?.length} result{filteredBooks?.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                </div>
              )}

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredBooks?.map((book) => (
                    <AudiobookCard
                      key={book?.id}
                      audiobook={book}
                      viewMode="grid"
                      onDownload={handleDownload}
                      onRemoveDownload={handleRemoveDownload}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBooks?.map((book) => (
                    <AudiobookCard
                      key={book?.id}
                      audiobook={book}
                      viewMode="list"
                      onDownload={handleDownload}
                      onRemoveDownload={handleRemoveDownload}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Global Audio Player */}
      <AudioPlayerGlobal
        isVisible={isPlayerVisible}
        audioData={currentAudio}
        onClose={() => setIsPlayerVisible(false)}
      />
    </div>
  );
};

export default MyLibrary;
