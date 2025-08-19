import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConsumerTabNavigation from '../../components/ui/ConsumerTabNavigation';
import AudioPlayerGlobal from '../../components/ui/AudioPlayerGlobal';

// Import components
import AudiobookHero from './components/AudiobookHero';
import AudioPreviewPlayer from './components/AudioPreviewPlayer';
import AudiobookDescription from './components/AudiobookDescription';
import ReviewsSection from './components/ReviewsSection';
import RelatedAudiobooks from './components/RelatedAudiobooks';
import ShareModal from './components/ShareModal';
import PurchaseModal from './components/PurchaseModal';

const AudiobookDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const audiobookId = searchParams?.get('id') || '1';
  
  const [audiobook, setAudiobook] = useState(null);
  const [isOwned, setIsOwned] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock audiobook data
  const mockAudiobook = {
    id: audiobookId,
    title: 'രണ്ടാമൂഴം',
    author: 'എം.ടി. വാസുദേവൻ നായർ',
    narrator: 'ജഗതി ശ്രീകുമാർ',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviewCount: 1247,
    duration: 480, // 8 hours
    listenerCount: 15420,
    genres: ['Classic Literature', 'Malayalam Fiction', 'Historical'],
    releaseDate: '15/08/2024',
    publisher: 'DC Books Audio',
    fileSize: '245 MB',
    language: 'Malayalam',
    format: 'MP3',
    bitrate: '128 kbps',
    sampleRate: '44.1 kHz',
    channels: 'Stereo',
    drm: 'None',
    isbn: '978-81-264-1234-5',
    originalPublicationDate: '1984',
    copyright: '© 2024 DC Books',
    previewUrl: '/assets/audio/randamoozham-preview.mp3',
    description: `രണ്ടാമൂഴം എം.ടി. വാസുദേവൻ നായരുടെ ഏറ്റവും പ്രശസ്തമായ നോവലുകളിൽ ഒന്നാണ്. മഹാഭാരതത്തിലെ ഭീമസേനന്റെ കണ്ണിലൂടെ കാണുന്ന കഥയാണിത്.

ഈ കൃതി മലയാള സാഹിത്യത്തിലെ ഒരു നാഴികക്കല്ലായി കണക്കാക്കപ്പെടുന്നു. പുരാണകഥയെ ആധുനിക കാലത്തിന്റെ പശ്ചാത്തലത്തിൽ പുനർവ്യാഖ്യാനം ചെയ്യുന്ന ഈ നോവൽ വായനക്കാരെ ആഴത്തിൽ സ്വാധീനിച്ചിട്ടുണ്ട്.

ജഗതി ശ്രീകുമാറിന്റെ മനോഹരമായ ആഖ്യാനത്തിലൂടെ ഈ മഹത്തായ കൃതി കേൾക്കാനുള്ള അവസരം നിങ്ങൾക്ക് ലഭിക്കുന്നു.`,
    themes: ['Power and Politics', 'Family Dynamics', 'Moral Dilemmas', 'Historical Perspective'],
    chapters: [
      { title: 'ആമുഖം', duration: 1200 },
      { title: 'ബാല്യകാലം', duration: 1800 },
      { title: 'യുവത്വം', duration: 2100 },
      { title: 'യുദ്ധത്തിന്റെ തുടക്കം', duration: 1950 },
      { title: 'കുരുക്ഷേത്രം', duration: 2400 },
      { title: 'വിജയവും പരാജയവും', duration: 1650 },
      { title: 'അന്ത്യം', duration: 1500 }
    ],
    ratingDistribution: {
      5: 847,
      4: 312,
      3: 67,
      2: 15,
      1: 6
    },
    reviews: [
      {
        id: 1,
        user: {
          name: 'രാജേഷ് കുമാർ',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        rating: 5,
        title: 'അതിമനോഹരമായ ആഖ്യാനം',
        content: `എം.ടി.യുടെ ഈ മഹത്തായ കൃതി ജഗതി ശ്രീകുമാറിന്റെ ശബ്ദത്തിൽ കേൾക്കുന്നത് അവിസ്മരണീയമായ അനുഭവമാണ്. ഓരോ കഥാപാത്രത്തിനും വ്യത്യസ്ത ശബ്ദം നൽകിയിരിക്കുന്നത് വളരെ മികച്ചതാണ്.

ഭീമസേനന്റെ കണ്ണിലൂടെ കാണുന്ന മഹാഭാരതം തികച്ചും വ്യത്യസ്തമായ അനുഭവമാണ്. ഓഡിയോ ക്വാളിറ്റിയും മികച്ചതാണ്.`,
        date: '2024-08-10',
        verified: true,
        helpfulCount: 89,
        notHelpfulCount: 3
      },
      {
        id: 2,
        user: {
          name: 'പ്രിയ നായർ',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        rating: 5,
        title: 'മലയാള സാഹിത്യത്തിന്റെ രത്നം',
        content: `ഈ ഓഡിയോബുക്ക് വാങ്ങിയത് എന്റെ ജീവിതത്തിലെ ഏറ്റവും നല്ല തീരുമാനങ്ങളിൽ ഒന്നാണ്. ജഗതി സാറിന്റെ ശബ്ദത്തിൽ എം.ടി.യുടെ വാക്കുകൾ കേൾക്കുമ്പോൾ ഒരു മാജിക് അനുഭവപ്പെടുന്നു.

യാത്രയിൽ കേൾക്കാൻ വാങ്ങിയതാണ്, പക്ഷേ വീട്ടിലിരുന്ന് മുഴുവൻ കേട്ടു തീർത്തു.`,
        date: '2024-08-05',
        verified: true,
        helpfulCount: 67,
        notHelpfulCount: 1
      },
      {
        id: 3,
        user: {
          name: 'അനിൽ കുമാർ',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        },
        rating: 4,
        title: 'നല്ല അനുഭവം',
        content: `കഥ വളരെ നല്ലതാണ്. ആഖ്യാനവും മികച്ചതാണ്. ചില ഭാഗങ്ങളിൽ ശബ്ദം അൽപ്പം മങ്ങിയതായി തോന്നി, പക്ഷേ മൊത്തത്തിൽ വളരെ സന്തോഷകരമായ അനുഭവമാണ്.`,
        date: '2024-07-28',
        verified: false,
        helpfulCount: 23,
        notHelpfulCount: 8
      }
    ],
    similarBooks: [
      {
        id: 2,
        title: 'ചെമ്മീൻ',
        author: 'തകഴി ശിവശങ്കര പിള്ള',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
        price: 249,
        rating: 4.5,
        reviewCount: 892,
        duration: 360,
        genres: ['Classic Literature', 'Romance']
      },
      {
        id: 3,
        title: 'ബാല്യകാലസഖി',
        author: 'വൈക്കം മുഹമ്മദ് ബഷീർ',
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        price: 199,
        rating: 4.7,
        reviewCount: 1156,
        duration: 240,
        genres: ['Classic Literature', 'Romance']
      }
    ],
    moreByAuthor: [
      {
        id: 4,
        title: 'നാലുകെട്ട്',
        author: 'എം.ടി. വാസുദേവൻ നായർ',
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop',
        price: 279,
        rating: 4.4,
        reviewCount: 678,
        duration: 420,
        genres: ['Classic Literature', 'Family Drama']
      }
    ],
    sameNarrator: [
      {
        id: 5,
        title: 'കഥാമുഖം',
        author: 'ഒ.വി. വിജയൻ',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop',
        price: 329,
        rating: 4.3,
        reviewCount: 445,
        duration: 480,
        genres: ['Modern Literature', 'Experimental']
      }
    ],
    sameGenre: [
      {
        id: 6,
        title: 'ആയുഷ്കാലം',
        author: 'എൻ.എസ്. മാധവൻ',
        cover: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop',
        price: 259,
        rating: 4.2,
        reviewCount: 334,
        duration: 390,
        genres: ['Classic Literature', 'Social Drama']
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAudiobook(mockAudiobook);
      setIsLoading(false);
      
      // Check if user owns this book (mock check)
      const ownedBooks = JSON.parse(localStorage.getItem('ownedBooks') || '[]');
      setIsOwned(ownedBooks?.includes(audiobookId));
      
      // Check wishlist status
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist?.includes(audiobookId));
    }, 1000);

    return () => clearTimeout(timer);
  }, [audiobookId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const handlePlay = () => {
    setShowAudioPlayer(true);
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isInWishlist) {
      const updatedWishlist = wishlist?.filter(id => id !== audiobookId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      wishlist?.push(audiobookId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  const handlePurchaseComplete = (purchasedAudiobook) => {
    // Add to owned books
    const ownedBooks = JSON.parse(localStorage.getItem('ownedBooks') || '[]');
    ownedBooks?.push(purchasedAudiobook?.id);
    localStorage.setItem('ownedBooks', JSON.stringify(ownedBooks));
    setIsOwned(true);
    
    // Remove from wishlist if present
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlist?.filter(id => id !== purchasedAudiobook?.id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setIsInWishlist(false);
    
    // Navigate to library
    setTimeout(() => {
      navigate('/my-library');
    }, 3000);
  };

  const handleAudiobookClick = (bookId) => {
    navigate(`/audiobook-detail?id=${bookId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ConsumerTabNavigation />
        
        {/* Loading Header */}
        <div className="sticky top-0 lg:top-16 bg-surface/95 backdrop-blur-sm border-b border-border z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="w-32 h-6 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-64 h-64 lg:w-80 lg:h-80 bg-muted rounded-2xl animate-pulse mx-auto lg:mx-0" />
            <div className="flex-1 space-y-4">
              <div className="w-3/4 h-8 bg-muted rounded animate-pulse" />
              <div className="w-1/2 h-6 bg-muted rounded animate-pulse" />
              <div className="w-1/3 h-6 bg-muted rounded animate-pulse" />
              <div className="w-full h-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!audiobook) {
    return (
      <div className="min-h-screen bg-background">
        <ConsumerTabNavigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Icon name="BookOpen" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
            Audiobook Not Found
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            The audiobook you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/homepage')} iconName="Home" iconPosition="left">
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <ConsumerTabNavigation />
      {/* Header */}
      <div className="sticky top-0 lg:top-16 bg-surface/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Go back"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <h1 className="font-heading font-semibold text-lg text-foreground truncate">
                {audiobook?.title}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Share audiobook"
              >
                <Icon name="Share" size={20} />
              </button>
              <button
                onClick={() => navigate('/search-results')}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Search"
              >
                <Icon name="Search" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="space-y-8">
        {/* Hero Section */}
        <AudiobookHero
          audiobook={audiobook}
          onPurchase={handlePurchase}
          onPlay={handlePlay}
          onAddToWishlist={handleAddToWishlist}
          isOwned={isOwned}
          isInWishlist={isInWishlist}
        />

        <div className="container mx-auto px-4 space-y-8">
          {/* Audio Preview Player */}
          {!isOwned && (
            <AudioPreviewPlayer audiobook={audiobook} />
          )}

          {/* Description and Details */}
          <AudiobookDescription audiobook={audiobook} />

          {/* Reviews Section */}
          <ReviewsSection audiobook={audiobook} />

          {/* Related Audiobooks */}
          <RelatedAudiobooks 
            audiobook={audiobook} 
            onAudiobookClick={handleAudiobookClick}
          />
        </div>
      </div>
      {/* Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        audiobook={audiobook}
      />
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        audiobook={audiobook}
        onPurchaseComplete={handlePurchaseComplete}
      />
      {/* Global Audio Player */}
      <AudioPlayerGlobal
        isVisible={showAudioPlayer}
        audioData={audiobook}
        onClose={() => setShowAudioPlayer(false)}
      />
    </div>
  );
};

export default AudiobookDetail;
