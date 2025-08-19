import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudiobookHero = ({ audiobook, onPurchase, onPlay, onAddToWishlist, isOwned = false, isInWishlist = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cover Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <Image
                src={audiobook?.cover}
                alt={audiobook?.title}
                className={`w-full h-full object-cover rounded-2xl shadow-elevated transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted rounded-2xl animate-pulse flex items-center justify-center">
                  <Icon name="BookOpen" size={48} className="text-muted-foreground" />
                </div>
              )}
              
              {/* Wishlist Button */}
              <button
                onClick={onAddToWishlist}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isInWishlist 
                    ? 'bg-accent text-accent-foreground shadow-soft' 
                    : 'bg-black/20 text-white hover:bg-black/30'
                }`}
                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Icon name="Heart" size={20} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title and Author */}
            <div className="mb-6">
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-3 leading-tight">
                {audiobook?.title}
              </h1>
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground font-body">
                  <span className="font-medium">രചന:</span> {audiobook?.author}
                </p>
                <p className="text-lg text-muted-foreground font-body">
                  <span className="font-medium">ആഖ്യാനം:</span> {audiobook?.narrator}
                </p>
              </div>
            </div>

            {/* Rating and Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={`${
                        i < Math.floor(audiobook?.rating) 
                          ? 'text-warning fill-current' :'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-data text-sm text-muted-foreground">
                  {audiobook?.rating} ({audiobook?.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground font-data">
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatDuration(audiobook?.duration)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{audiobook?.listenerCount?.toLocaleString('en-IN')} listeners</span>
                </span>
              </div>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {audiobook?.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-caption"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isOwned ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={onPlay}
                    iconName="Play"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Play Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                    className="flex-1 sm:flex-none"
                  >
                    Download
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <span className="text-2xl font-bold text-foreground font-data">
                      {formatPrice(audiobook?.price)}
                    </span>
                    {audiobook?.originalPrice && audiobook?.originalPrice > audiobook?.price && (
                      <span className="text-lg text-muted-foreground line-through font-data">
                        {formatPrice(audiobook?.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={onPurchase}
                      iconName="ShoppingCart"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Purchase & Listen
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Play"
                      iconPosition="left"
                      className="flex-1 sm:flex-none"
                    >
                      Free Preview
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Language</p>
                  <p className="font-body font-medium text-foreground">Malayalam</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Release Date</p>
                  <p className="font-body font-medium text-foreground">{audiobook?.releaseDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Publisher</p>
                  <p className="font-body font-medium text-foreground">{audiobook?.publisher}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-caption">File Size</p>
                  <p className="font-body font-medium text-foreground">{audiobook?.fileSize}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiobookHero;
