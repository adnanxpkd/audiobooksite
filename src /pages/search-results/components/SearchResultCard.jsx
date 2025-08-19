import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResultCard = ({ audiobook, className = '' }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/audiobook-detail', { state: { audiobook } });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-200 cursor-pointer group ${className}`}>
      <div onClick={handleCardClick} className="block">
        {/* Cover Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={audiobook?.cover}
            alt={audiobook?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-data">
              {formatDuration(audiobook?.duration)}
            </div>
          </div>
          {audiobook?.isNew && (
            <div className="absolute top-2 left-2">
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-caption">
                പുതിയത്
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-heading font-semibold text-foreground line-clamp-2 text-sm lg:text-base">
            {audiobook?.title}
          </h3>

          {/* Author */}
          <p className="text-muted-foreground font-body text-sm line-clamp-1">
            {audiobook?.author}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-data text-foreground">{audiobook?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground font-caption">
              ({audiobook?.reviewCount} reviews)
            </span>
          </div>

          {/* Narrator */}
          <div className="flex items-center space-x-2">
            <Icon name="Mic" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-caption line-clamp-1">
              {audiobook?.narrator}
            </span>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              {audiobook?.originalPrice && audiobook?.originalPrice > audiobook?.price && (
                <span className="text-xs text-muted-foreground font-data line-through">
                  {formatPrice(audiobook?.originalPrice)}
                </span>
              )}
              <div className="font-heading font-semibold text-primary">
                {formatPrice(audiobook?.price)}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ShoppingCart"
              iconPosition="left"
              iconSize={14}
              onClick={(e) => {
                e?.stopPropagation();
                // Handle add to cart
              }}
              className="flex-shrink-0"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;