import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, audiobook }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  if (!isOpen) return null;

  const shareUrl = `${window.location?.origin}/audiobook-detail?id=${audiobook?.id}`;
  const shareText = `Check out "${audiobook?.title}" by ${audiobook?.author} on AudioVerse Malayalam! 🎧\n\n${audiobook?.description?.substring(0, 100)}...\n\n`;

  const sharePlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'Mail',
      color: 'bg-gray-600',
      url: `mailto:?subject=${encodeURIComponent(`Check out "${audiobook?.title}"`)}}&body=${encodeURIComponent(shareText + shareUrl)}`
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: 'MessageSquare',
      color: 'bg-green-600',
      url: `sms:?body=${encodeURIComponent(shareText + shareUrl)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePlatformClick = (platform) => {
    setSelectedPlatform(platform?.id);
    window.open(platform?.url, '_blank', 'width=600,height=400');
    setTimeout(() => setSelectedPlatform(null), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-elevated">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-heading font-semibold text-xl text-foreground">
            Share Audiobook
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Audiobook Preview */}
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <img
              src={audiobook?.cover}
              alt={audiobook?.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-semibold text-foreground truncate">
                {audiobook?.title}
              </h4>
              <p className="text-sm text-muted-foreground font-body truncate">
                by {audiobook?.author}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={`${
                      i < Math.floor(audiobook?.rating) 
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground font-data ml-1">
                  {audiobook?.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Share Platforms */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-4">
              Share on Social Media
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {sharePlatforms?.map((platform) => (
                <button
                  key={platform?.id}
                  onClick={() => handlePlatformClick(platform)}
                  disabled={selectedPlatform === platform?.id}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-soft ${
                    selectedPlatform === platform?.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className={`w-12 h-12 ${platform?.color} text-white rounded-full flex items-center justify-center`}>
                    <Icon name={platform?.icon} size={20} />
                  </div>
                  <span className="text-sm font-caption text-foreground">
                    {platform?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">
              Copy Link
            </h4>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 font-data text-sm"
              />
              <Button
                variant={copied ? 'success' : 'outline'}
                onClick={copyToClipboard}
                iconName={copied ? 'Check' : 'Copy'}
                iconPosition="left"
                className="flex-shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <h4 className="font-body font-medium text-foreground mb-3">
              QR Code
            </h4>
            <div className="inline-block p-4 bg-white rounded-lg border border-border">
              <div className="w-32 h-32 bg-muted rounded flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-caption mt-2">
              Scan to share this audiobook
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;