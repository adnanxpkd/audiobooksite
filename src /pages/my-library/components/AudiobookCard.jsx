import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AudiobookCard = ({ 
  audiobook, 
  viewMode = 'grid',
  onDownload,
  onRemoveDownload,
  onPlay,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/audiobook-detail', { state: { audiobook } });
  };

  const handleActionClick = (e, action) => {
    e?.stopPropagation();
    action();
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer ${className}`}
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={audiobook?.cover}
                alt={audiobook?.title}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover"
              />
              {/* Progress Overlay */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent">
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-lg"
                  style={{ width: `${audiobook?.progress}%` }}
                />
              </div>
              {/* Download Status */}
              {audiobook?.isDownloaded && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Download" size={12} className="text-success-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-foreground truncate">
                  {audiobook?.title}
                </h3>
                <p className="text-sm text-muted-foreground font-caption truncate">
                  by {audiobook?.author}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground font-caption">
                  <span>{formatDuration(audiobook?.duration)}</span>
                  <span>•</span>
                  <span>Purchased {formatDate(audiobook?.purchaseDate)}</span>
                  <span>•</span>
                  <span>{audiobook?.progress}% complete</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Play"
                  onClick={(e) => handleActionClick(e, () => onPlay(audiobook))}
                  className="flex-shrink-0"
                >
                  Play
                </Button>
                
                {audiobook?.isDownloaded ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={(e) => handleActionClick(e, () => onRemoveDownload(audiobook?.id))}
                    className="flex-shrink-0"
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={(e) => handleActionClick(e, () => onDownload(audiobook?.id))}
                    className="flex-shrink-0"
                  >
                    Download
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-caption mb-1">
                <span>Progress</span>
                <span>{audiobook?.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${audiobook?.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div 
      className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft transition-all duration-200 cursor-pointer group ${className}`}
      onClick={handleCardClick}
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={audiobook?.cover}
          alt={audiobook?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Progress Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${audiobook?.progress}%` }}
          />
        </div>

        {/* Download Status */}
        {audiobook?.isDownloaded && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="Download" size={14} className="text-success-foreground" />
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="default"
            size="icon"
            iconName="Play"
            onClick={(e) => handleActionClick(e, () => onPlay(audiobook))}
            className="w-12 h-12 rounded-full shadow-elevated"
          />
        </div>

        {/* Progress Text */}
        <div className="absolute bottom-2 left-2 text-white text-xs font-caption">
          {audiobook?.progress}% complete
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-body font-medium text-foreground truncate mb-1">
          {audiobook?.title}
        </h3>
        <p className="text-sm text-muted-foreground font-caption truncate mb-2">
          by {audiobook?.author}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
          <span>{formatDuration(audiobook?.duration)}</span>
          <span>{formatDate(audiobook?.purchaseDate)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            onClick={(e) => handleActionClick(e, () => onPlay(audiobook))}
            className="flex-1"
          >
            Play
          </Button>
          
          {audiobook?.isDownloaded ? (
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={(e) => handleActionClick(e, () => onRemoveDownload(audiobook?.id))}
            />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={(e) => handleActionClick(e, () => onDownload(audiobook?.id))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AudiobookCard;
