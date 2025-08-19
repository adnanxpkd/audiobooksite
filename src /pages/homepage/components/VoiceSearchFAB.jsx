import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceSearchFAB = ({ onVoiceSearch, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('വോയ്സ് സെർച്ച് നിങ്ങളുടെ ബ്രൗസറിൽ പിന്തുണയ്ക്കുന്നില്ല');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ml-IN'; // Malayalam language
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setShowTooltip(false);
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      if (onVoiceSearch) {
        onVoiceSearch(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
      
      let errorMessage = 'വോയ്സ് സെർച്ചിൽ പിശക് സംഭവിച്ചു';
      switch (event?.error) {
        case 'no-speech':
          errorMessage = 'ശബ്ദം കേൾക്കാനായില്ല. വീണ്ടും ശ്രമിക്കുക';
          break;
        case 'network':
          errorMessage = 'നെറ്റ്‌വർക്ക് പിശക്. ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക';
          break;
        case 'not-allowed':
          errorMessage = 'മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു';
          break;
      }
      
      alert(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  return (
    <div className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-90 ${className}`}>
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && !isListening && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-elevated whitespace-nowrap animate-slide-up">
            വോയ്സ് സെർച്ച്
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
          </div>
        )}

        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg shadow-elevated animate-slide-up">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm font-medium">കേൾക്കുന്നു...</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent" />
          </div>
        )}

        {/* FAB Button */}
        <Button
          variant={isListening ? "default" : "secondary"}
          size="icon"
          onClick={startVoiceSearch}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          disabled={isListening}
          className={`w-14 h-14 rounded-full shadow-elevated hover:shadow-soft transition-all duration-200 ${
            isListening 
              ? 'bg-accent text-accent-foreground animate-pulse' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          <Icon 
            name={isListening ? "MicOff" : "Mic"} 
            size={24} 
            className={isListening ? "animate-pulse" : ""} 
          />
        </Button>

        {/* Ripple Effect for Listening State */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceSearchFAB;