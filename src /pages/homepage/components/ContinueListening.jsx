import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContinueListening = ({ className = '' }) => {
  const navigate = useNavigate();

  // Mock continue listening data
  const continueListeningBooks = [
    {
      id: 1,
      title: "കായാമ്പൂ",
      author: "എൻ.എസ്. മാധവൻ",
      narrator: "മമ്മൂട്ടി",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      progress: 65,
      currentChapter: "അധ്യായം 8",
      totalChapters: 12,
      lastListened: "2 hours ago",
      duration: "9h 30m",
      remainingTime: "3h 20m"
    },
    {
      id: 2,
      title: "മയ്യഴിപ്പുഴയുടെ തീരങ്ങളിൽ",
      author: "എം. മുകുന്ദൻ",
      narrator: "ജയറാം",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      progress: 23,
      currentChapter: "അധ്യായം 3",
      totalChapters: 15,
      lastListened: "Yesterday",
      duration: "11h 45m",
      remainingTime: "9h 5m"
    },
    {
      id: 3,
      title: "ആത്മകഥ",
      author: "കെ.ആർ. മീര",
      narrator: "ഉർവശി",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      progress: 89,
      currentChapter: "അധ്യായം 18",
      totalChapters: 20,
      lastListened: "3 days ago",
      duration: "7h 15m",
      remainingTime: "48m"
    }
  ];

  const handleContinueReading = (bookId) => {
    navigate(`/audiobook-detail?id=${bookId}&continue=true`);
  };

  const handleViewLibrary = () => {
    navigate('/my-library');
  };

  if (continueListeningBooks?.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
            കേൾക്കാൻ തുടരുക
          </h2>
          <p className="text-sm text-muted-foreground font-caption mt-1">
            നിങ്ങൾ കേട്ടുകൊണ്ടിരിക്കുന്ന പുസ്തകങ്ങൾ
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewLibrary}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          എല്ലാം കാണുക
        </Button>
      </div>
      {/* Books List */}
      <div className="space-y-3">
        {continueListeningBooks?.map((book) => (
          <div
            key={book?.id}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-all duration-200 cursor-pointer"
            onClick={() => handleContinueReading(book?.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden">
                  <Image
                    src={book?.cover}
                    alt={book?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h3 className="font-body font-medium text-foreground truncate">
                    {book?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption truncate">
                    {book?.author} • വായിച്ചത്: {book?.narrator}
                  </p>
                </div>

                {/* Progress Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-data">
                    <span>{book?.currentChapter} / {book?.totalChapters} അധ്യായങ്ങൾ</span>
                    <span>{book?.remainingTime} ബാക്കി</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${book?.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-data">
                    <span>{book?.progress}% പൂർത്തിയായി</span>
                    <span>{book?.lastListened}</span>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleContinueReading(book?.id);
                  }}
                  className="w-12 h-12 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon name="Play" size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button for Mobile */}
      <div className="lg:hidden pt-2">
        <Button
          variant="outline"
          fullWidth
          onClick={handleViewLibrary}
          iconName="Library"
          iconPosition="left"
        >
          എന്റെ ലൈബ്രറി കാണുക
        </Button>
      </div>
    </div>
  );
};

export default ContinueListening;