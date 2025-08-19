import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ className = '' }) => {
  const navigate = useNavigate();

  // Mock featured books data
  const featuredBooks = [
    {
      id: 1,
      title: "നാലുകെട്ട്",
      author: "എം.ടി. വാസുദേവൻ നായർ",
      narrator: "മോഹൻലാൽ",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      duration: "8h 45m",
      price: "₹199",
      originalPrice: "₹249",
      rating: 4.7,
      totalRatings: 1250,
      isNew: true,
      category: "സാഹിത്യം"
    },
    {
      id: 2,
      title: "പാതുമ്മയുടെ ആട്",
      author: "വൈക്കം മുഹമ്മദ് ബഷീർ",
      narrator: "കൽപന",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      duration: "6h 30m",
      price: "₹149",
      originalPrice: "₹199",
      rating: 4.5,
      totalRatings: 890,
      isNew: false,
      category: "കഥകൾ"
    },
    {
      id: 3,
      title: "കൃഷ്ണഗാഥ",
      author: "കെ.വി. അക്ഷരൻ",
      narrator: "സുരേഷ് ഗോപി",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      duration: "12h 15m",
      price: "₹299",
      originalPrice: "₹399",
      rating: 4.8,
      totalRatings: 2100,
      isNew: false,
      category: "പുരാണം"
    },
    {
      id: 4,
      title: "മനുഷ്യനു വേണ്ടി",
      author: "സാറാ ജോസഫ്",
      narrator: "ഉർവശി",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      duration: "7h 20m",
      price: "₹179",
      originalPrice: "₹229",
      rating: 4.6,
      totalRatings: 670,
      isNew: true,
      category: "സാമൂഹിക"
    },
    {
      id: 5,
      title: "ആയുസ്സിന്റെ പുസ്തകം",
      author: "എൻ.എസ്. മാധവൻ",
      narrator: "മമ്മൂട്ടി",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      duration: "9h 10m",
      price: "₹219",
      originalPrice: "₹279",
      rating: 4.9,
      totalRatings: 1580,
      isNew: false,
      category: "ആത്മകഥ"
    },
    {
      id: 6,
      title: "കാലം",
      author: "എം.ടി. വാസുദേവൻ നായർ",
      narrator: "ജഗതി ശ്രീകുമാർ",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
      duration: "10h 35m",
      price: "₹259",
      originalPrice: "₹329",
      rating: 4.7,
      totalRatings: 940,
      isNew: false,
      category: "നോവൽ"
    }
  ];

  const handleBookClick = (bookId) => {
    navigate(`/audiobook-detail?id=${bookId}`);
  };

  const handleViewAll = () => {
    navigate('/search-results?featured=true');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
            ഈ ആഴ്ചയിലെ പ്രത്യേകങ്ങൾ
          </h2>
          <p className="text-sm text-muted-foreground font-caption mt-1">
            എഡിറ്റർമാർ തിരഞ്ഞെടുത്ത മികച്ച ഓഡിയോബുക്കുകൾ
          </p>
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
      {/* Books Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {featuredBooks?.map((book) => (
          <div
            key={book?.id}
            className="group cursor-pointer"
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
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {book?.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      പുതിയത്
                    </span>
                  )}
                </div>

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
                    <span className="font-data">({book?.totalRatings})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span className="font-data">{book?.duration}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="text-xs text-primary font-caption bg-primary/10 px-2 py-1 rounded-full inline-block">
                  {book?.category}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground">
                    {book?.price}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {book?.originalPrice}
                  </span>
                </div>
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
          onClick={handleViewAll}
          iconName="Sparkles"
          iconPosition="left"
        >
          കൂടുതൽ പ്രത്യേക പുസ്തകങ്ങൾ കാണുക
        </Button>
      </div>
    </div>
  );
};

export default FeaturedSection;