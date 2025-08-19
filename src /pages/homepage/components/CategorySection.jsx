import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySection = ({ category, className = '' }) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Mock category data
  const categoryData = {
    thriller: {
      title: "ത്രില്ലർ",
      subtitle: "ആവേശകരമായ കഥകൾ",
      icon: "Zap",
      books: [
        {
          id: 11,
          title: "കൊലപാതകത്തിന്റെ നിഴൽ",
          author: "ബെന്യാമിൻ",
          narrator: "ഇന്ദ്രൻസ്",
          cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
          duration: "7h 45m",
          price: "₹189",
          rating: 4.4,
          isPopular: true
        },
        {
          id: 12,
          title: "രാത്രിയിലെ വേട്ട",
          author: "എസ്.ഹരീഷ്",
          narrator: "പ്രിത്വിരാജ്",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          duration: "9h 20m",
          price: "₹219",
          rating: 4.6,
          isPopular: false
        },
        {
          id: 13,
          title: "മരണത്തിന്റെ മുഖം",
          author: "കെ.പി. രാമനുണ്ണി",
          narrator: "മോഹൻലാൽ",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
          duration: "8h 15m",
          price: "₹199",
          rating: 4.5,
          isPopular: true
        },
        {
          id: 14,
          title: "കാണാത്ത ശത്രു",
          author: "പി.എഫ്. മാത്യു",
          narrator: "സുരേഷ് ഗോപി",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
          duration: "6h 50m",
          price: "₹169",
          rating: 4.3,
          isPopular: false
        },
        {
          id: 15,
          title: "അപരിചിതൻ",
          author: "യു.എ. ഖാദർ",
          narrator: "ജയറാം",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
          duration: "10h 30m",
          price: "₹249",
          rating: 4.7,
          isPopular: true
        }
      ]
    },
    motivation: {
      title: "പ്രചോദനം",
      subtitle: "ജീവിതത്തെ മാറ്റുന്ന ചിന്തകൾ",
      icon: "TrendingUp",
      books: [
        {
          id: 21,
          title: "വിജയത്തിന്റെ രഹസ്യങ്ങൾ",
          author: "ഡോ. എ.പി.ജെ. അബ്ദുൽ കലാം",
          narrator: "മമ്മൂട്ടി",
          cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
          duration: "5h 30m",
          price: "₹149",
          rating: 4.8,
          isPopular: true
        },
        {
          id: 22,
          title: "മനസ്സിന്റെ ശക്തി",
          author: "സ്വാമി ചിന്മയാനന്ദ",
          narrator: "ജഗതി ശ്രീകുമാർ",
          cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
          duration: "6h 45m",
          price: "₹179",
          rating: 4.6,
          isPopular: false
        },
        {
          id: 23,
          title: "സ്വപ്നങ്ങളുടെ യാത്ര",
          author: "കെ.ജെ. യേശുദാസ്",
          narrator: "യേശുദാസ്",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          duration: "4h 20m",
          price: "₹129",
          rating: 4.9,
          isPopular: true
        },
        {
          id: 24,
          title: "ആത്മവിശ്വാസം",
          author: "ഡോ. കെ.എൻ. പിഷാരടി",
          narrator: "കൽപന",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
          duration: "7h 10m",
          price: "₹199",
          rating: 4.5,
          isPopular: false
        },
        {
          id: 25,
          title: "നേതൃത്വത്തിന്റെ കല",
          author: "ഇ. ശ്രീധരൻ",
          narrator: "ഇന്ദ്രൻസ്",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
          duration: "8h 25m",
          price: "₹229",
          rating: 4.7,
          isPopular: true
        }
      ]
    },
    stories: {
      title: "കഥകൾ",
      subtitle: "ഹൃദയസ്പർശിയായ കഥകൾ",
      icon: "BookOpen",
      books: [
        {
          id: 31,
          title: "പ്രേമകഥകൾ",
          author: "വൈക്കം മുഹമ്മദ് ബഷീർ",
          narrator: "ഉർവശി",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
          duration: "6h 15m",
          price: "₹159",
          rating: 4.6,
          isPopular: true
        },
        {
          id: 32,
          title: "ഗ്രാമത്തിലെ കഥകൾ",
          author: "തകഴി ശിവശങ്കര പിള്ള",
          narrator: "മോഹൻലാൽ",
          cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
          duration: "7h 40m",
          price: "₹189",
          rating: 4.8,
          isPopular: false
        },
        {
          id: 33,
          title: "കുട്ടികളുടെ കഥകൾ",
          author: "എൻ.എൻ. കക്കാട്",
          narrator: "കൽപന",
          cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
          duration: "4h 30m",
          price: "₹119",
          rating: 4.4,
          isPopular: true
        },
        {
          id: 34,
          title: "ഹാസ്യകഥകൾ",
          author: "സഞ്ജയൻ",
          narrator: "ജഗതി ശ്രീകുമാർ",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          duration: "5h 20m",
          price: "₹139",
          rating: 4.7,
          isPopular: false
        },
        {
          id: 35,
          title: "നാടൻ കഥകൾ",
          author: "എം.ടി. വാസുദേവൻ നായർ",
          narrator: "സുരേഷ് ഗോപി",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
          duration: "8h 55m",
          price: "₹209",
          rating: 4.9,
          isPopular: true
        }
      ]
    }
  };

  const currentCategory = categoryData?.[category];
  
  if (!currentCategory) {
    return null;
  }

  const handleBookClick = (bookId) => {
    navigate(`/audiobook-detail?id=${bookId}`);
  };

  const handleViewAll = () => {
    navigate(`/search-results?category=${category}`);
  };

  const scrollLeft = () => {
    const container = document.getElementById(`category-${category}`);
    if (container) {
      container?.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`category-${category}`);
    if (container) {
      container?.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={currentCategory?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
              {currentCategory?.title}
            </h2>
            <p className="text-sm text-muted-foreground font-caption">
              {currentCategory?.subtitle}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          എല്ലാം കാണുക
        </Button>
      </div>
      {/* Books Horizontal Scroll */}
      <div className="relative">
        {/* Navigation Arrows - Desktop Only */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-surface border border-border rounded-full shadow-soft hover:shadow-elevated transition-all duration-200 items-center justify-center hidden lg:flex"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-surface border border-border rounded-full shadow-soft hover:shadow-elevated transition-all duration-200 items-center justify-center hidden lg:flex"
        >
          <Icon name="ChevronRight" size={18} />
        </button>

        {/* Books Container */}
        <div
          id={`category-${category}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 lg:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentCategory?.books?.map((book) => (
            <div
              key={book?.id}
              className="flex-shrink-0 w-40 lg:w-48 group cursor-pointer"
              onClick={() => handleBookClick(book?.id)}
            >
              <div className="space-y-3">
                {/* Book Cover */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={book?.cover}
                      alt={book?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Popular Badge */}
                  {book?.isPopular && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                        ജനപ്രിയം
                      </span>
                    </div>
                  )}

                  {/* Quick Play Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-white/90 text-primary hover:bg-white"
                    >
                      <Icon name="Play" size={20} />
                    </Button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="font-body font-medium text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {book?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-caption truncate mt-1">
                      {book?.author}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption truncate">
                      വായിച്ചത്: {book?.narrator}
                    </p>
                  </div>

                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                      <span className="font-data">{book?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span className="font-data">{book?.duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-sm font-bold text-foreground">
                    {book?.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
