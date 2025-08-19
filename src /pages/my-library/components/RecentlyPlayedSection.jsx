import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyPlayedSection = ({ 
  recentBooks = [], 
  onPlay,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleBookClick = (audiobook) => {
    navigate('/audiobook-detail', { state: { audiobook } });
  };

  const formatLastPlayed = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' });
  };

  const formatProgress = (currentTime, duration) => {
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const totalHours = Math.floor(duration / 3600);
    const totalMinutes = Math.floor((duration % 3600) / 60);
    
    return `${hours}:${minutes?.toString()?.padStart(2, '0')} / ${totalHours}:${totalMinutes?.toString()?.padStart(2, '0')}`;
  };

  if (recentBooks?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-surface ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Continue Listening
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={() => {}}
          >
            View All
          </Button>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {recentBooks?.map((book) => (
              <div 
                key={book?.id}
                className="flex-shrink-0 w-64 bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-soft transition-all duration-200"
                onClick={() => handleBookClick(book)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={book?.cover}
                      alt={book?.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="default"
                        size="icon"
                        iconName="Play"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onPlay(book);
                        }}
                        className="w-8 h-8 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-medium text-foreground text-sm truncate">
                      {book?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-caption truncate">
                      {book?.author}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground font-caption">
                        {formatLastPlayed(book?.lastPlayed)}
                      </span>
                      <span className="text-xs text-primary font-caption">
                        {book?.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${book?.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {recentBooks?.slice(0, 6)?.map((book) => (
            <div 
              key={book?.id}
              className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-soft transition-all duration-200 group"
              onClick={() => handleBookClick(book)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={book?.cover}
                    alt={book?.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-lg">
                    <Button
                      variant="default"
                      size="icon"
                      iconName="Play"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onPlay(book);
                      }}
                      className="w-10 h-10 rounded-full shadow-elevated"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-medium text-foreground truncate">
                    {book?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption truncate">
                    by {book?.author}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground font-caption">
                    <span>{formatLastPlayed(book?.lastPlayed)}</span>
                    <span className="text-primary">{book?.progress}% complete</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground font-caption">
                    {formatProgress(book?.currentTime, book?.duration)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${book?.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayedSection;