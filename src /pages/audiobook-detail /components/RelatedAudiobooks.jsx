import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedAudiobooks = ({ audiobook, onAudiobookClick }) => {
  const [activeTab, setActiveTab] = useState('similar');

  const tabs = [
    { id: 'similar', label: 'Similar Books', icon: 'BookOpen' },
    { id: 'author', label: 'More by Author', icon: 'User' },
    { id: 'narrator', label: 'Same Narrator', icon: 'Mic' },
    { id: 'genre', label: 'Same Genre', icon: 'Tag' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={`${
          i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'similar':
        return audiobook?.similarBooks;
      case 'author':
        return audiobook?.moreByAuthor;
      case 'narrator':
        return audiobook?.sameNarrator;
      case 'genre':
        return audiobook?.sameGenre;
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'similar':
        return 'Books Similar to This';
      case 'author':
        return `More Books by ${audiobook?.author}`;
      case 'narrator':
        return `More Books Narrated by ${audiobook?.narrator}`;
      case 'genre':
        return `More ${audiobook?.genres?.[0]} Books`;
      default:
        return 'Related Books';
    }
  };

  const books = getTabContent();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-soft">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-4 text-sm font-body whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
          {getTabTitle()}
        </h3>

        {books?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books?.map((book) => (
              <div
                key={book?.id}
                className="group cursor-pointer"
                onClick={() => onAudiobookClick(book?.id)}
              >
                <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-soft transition-all duration-200 group-hover:border-primary/20">
                  {/* Cover Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={book?.cover}
                      alt={book?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
                        <Icon name="Play" size={20} />
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-data">
                      {formatPrice(book?.price)}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h4 className="font-body font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {book?.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground font-body mb-2 line-clamp-1">
                      by {book?.author}
                    </p>

                    {/* Rating and Duration */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(book?.rating)}
                        <span className="text-xs text-muted-foreground font-data ml-1">
                          ({book?.reviewCount})
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-data">
                        {formatDuration(book?.duration)}
                      </span>
                    </div>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {book?.genres?.slice(0, 2)?.map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded text-xs font-caption"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle add to cart
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-body font-medium text-foreground mb-2">
              No Related Books Found
            </h4>
            <p className="text-muted-foreground font-caption">
              We couldn't find any books in this category at the moment.
            </p>
          </div>
        )}

        {/* View All Button */}
        {books?.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => {
                // Navigate to category page or search results
              }}
            >
              View All {getTabTitle()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedAudiobooks;