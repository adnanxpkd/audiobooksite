import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyLibraryState = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleBrowseBooks = () => {
    navigate('/homepage');
  };

  const handleSearchBooks = () => {
    navigate('/search-results');
  };

  const recommendedBooks = [
    {
      id: 1,
      title: "Randamoozham",
      author: "M.T. Vasudevan Nair",
      genre: "Epic Literature",
      rating: 4.8,
      price: "₹299"
    },
    {
      id: 2,
      title: "Balyakalasakhi",
      author: "Vaikom Muhammad Basheer",
      genre: "Romance",
      rating: 4.7,
      price: "₹199"
    },
    {
      id: 3,
      title: "Chemmeen",
      author: "Thakazhi Sivasankara Pillai",
      genre: "Drama",
      rating: 4.9,
      price: "₹249"
    }
  ];

  return (
    <div className={`flex-1 flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="BookOpen" size={48} className="text-muted-foreground" />
        </div>

        {/* Empty State Content */}
        <h2 className="font-heading font-semibold text-2xl text-foreground mb-3">
          Your Library is Empty
        </h2>
        <p className="text-muted-foreground font-body mb-8 leading-relaxed">
          Start building your personal audiobook collection. Discover amazing Malayalam stories, 
          motivational content, and more from our extensive catalog.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            onClick={handleBrowseBooks}
            className="flex-1"
          >
            Browse Audiobooks
          </Button>
          <Button
            variant="outline"
            iconName="Compass"
            iconPosition="left"
            onClick={handleSearchBooks}
            className="flex-1"
          >
            Search Library
          </Button>
        </div>

        {/* Recommended Books */}
        <div className="text-left">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
            Popular Audiobooks
          </h3>
          <div className="space-y-3">
            {recommendedBooks?.map((book) => (
              <div 
                key={book?.id}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:shadow-soft transition-all duration-200 cursor-pointer"
                onClick={handleBrowseBooks}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-foreground truncate">
                    {book?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-caption truncate">
                    by {book?.author}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground font-caption">
                        {book?.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-caption">•</span>
                    <span className="text-xs text-muted-foreground font-caption">
                      {book?.genre}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <span className="font-body font-semibold text-primary">
                    {book?.price}
                  </span>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="font-body font-medium text-foreground mb-1">
                Build Your Collection
              </h4>
              <p className="text-sm text-muted-foreground font-caption leading-relaxed">
                Purchase audiobooks to access them anytime, even offline. Your library syncs 
                across all devices, and you can resume listening from where you left off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyLibraryState;