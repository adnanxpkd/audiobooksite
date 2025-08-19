import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroBanner = ({ className = '' }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock featured audiobooks data
  const featuredBooks = [
    {
      id: 1,
      title: "രണ്ടാമൂഴം",
      author: "എം.ടി. വാസുദേവൻ നായർ",
      narrator: "ജഗതി ശ്രീകുമാർ",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
      duration: "12h 45m",
      price: "₹299",
      originalPrice: "₹399",
      description: "മഹാഭാരതത്തിലെ ഭീമന്റെ കഥ പുനരാഖ്യാനം",
      isPremium: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "ബാല്യകാലസഖി",
      author: "വൈക്കം മുഹമ്മദ് ബഷീർ",
      narrator: "കൽപന",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      duration: "8h 30m",
      price: "₹199",
      originalPrice: "₹249",
      description: "പ്രണയത്തിന്റെ മനോഹരമായ കഥ",
      isPremium: false,
      rating: 4.6
    },
    {
      id: 3,
      title: "ചെമ്മീൻ",
      author: "തകഴി ശിവശങ്കര പിള്ള",
      narrator: "സുരേഷ് ഗോപി",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      duration: "10h 15m",
      price: "₹249",
      originalPrice: "₹299",
      description: "കടലിന്റെ മകളുടെ പ്രണയകഥ",
      isPremium: true,
      rating: 4.9
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredBooks?.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleBookClick = (bookId) => {
    navigate(`/audiobook-detail?id=${bookId}`);
  };

  const currentBook = featuredBooks?.[currentSlide];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl ${className}`}>
      <div className="relative h-80 lg:h-96">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentBook?.cover}
            alt={currentBook?.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center p-6 lg:p-8">
          <div className="flex-1 space-y-4">
            {/* Premium Badge */}
            {currentBook?.isPremium && (
              <div className="inline-flex items-center space-x-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Crown" size={14} />
                <span>Premium</span>
              </div>
            )}

            {/* Title & Author */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-4xl font-heading font-bold text-white leading-tight">
                {currentBook?.title}
              </h1>
              <p className="text-lg text-white/90 font-body">
                {currentBook?.author}
              </p>
              <p className="text-sm text-white/80 font-caption">
                വായിച്ചത്: {currentBook?.narrator}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/90 font-body max-w-md">
              {currentBook?.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{currentBook?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                <span>{currentBook?.rating}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  {currentBook?.price}
                </span>
                <span className="text-lg text-white/60 line-through">
                  {currentBook?.originalPrice}
                </span>
              </div>
              <Button
                variant="secondary"
                onClick={() => handleBookClick(currentBook?.id)}
                iconName="Play"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                കേൾക്കാൻ തുടങ്ങുക
              </Button>
            </div>
          </div>

          {/* Book Cover */}
          <div className="hidden lg:block flex-shrink-0 ml-8">
            <div className="w-48 h-64 rounded-xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image
                src={currentBook?.cover}
                alt={currentBook?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-6 flex space-x-2">
          {featuredBooks?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white w-6' :'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleSlideChange((currentSlide - 1 + featuredBooks?.length) % featuredBooks?.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors duration-200 lg:flex hidden"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={() => handleSlideChange((currentSlide + 1) % featuredBooks?.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors duration-200 lg:flex hidden"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;