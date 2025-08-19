import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPreviewPlayer = ({ audiobook, isVisible = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes preview
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio?.currentTime);
    const updateDuration = () => setDuration(Math.min(audio?.duration, 120)); // Max 2 minutes
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateDuration);
    audio?.addEventListener('loadstart', handleLoadStart);
    audio?.addEventListener('canplay', handleCanPlay);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateDuration);
      audio?.removeEventListener('loadstart', handleLoadStart);
      audio?.removeEventListener('canplay', handleCanPlay);
      audio?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef?.current;
    const progress = progressRef?.current;
    if (!audio || !progress) return;

    const rect = progress?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <audio ref={audioRef} preload="metadata" src={audiobook?.previewUrl} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-body font-semibold text-foreground mb-1">
            Free Preview
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Listen to a 2-minute sample
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground font-data">
          <Icon name="Clock" size={14} />
          <span>2:00 max</span>
        </div>
      </div>
      {/* Player Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div
            ref={progressRef}
            className="w-full h-2 bg-muted rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
            {/* Preview limit indicator */}
            <div
              className="absolute top-0 right-0 w-1 h-full bg-accent opacity-60"
              title="Preview ends here"
            />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground font-data">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => {
              const audio = audioRef?.current;
              if (audio) {
                audio.currentTime = Math.max(0, currentTime - 15);
              }
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            title="Rewind 15s"
          >
            <Icon name="RotateCcw" size={20} />
          </button>

          <Button
            variant="default"
            size="lg"
            onClick={togglePlayPause}
            disabled={isLoading}
            iconName={isLoading ? 'Loader2' : (isPlaying ? 'Pause' : 'Play')}
            iconPosition="left"
            className={`px-8 ${isLoading ? 'animate-spin' : ''}`}
          >
            {isLoading ? 'Loading...' : (isPlaying ? 'Pause' : 'Play Preview')}
          </Button>

          <button
            onClick={() => {
              const audio = audioRef?.current;
              if (audio) {
                audio.currentTime = Math.min(duration, currentTime + 15);
              }
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            title="Forward 15s"
          >
            <Icon name="RotateCw" size={20} />
          </button>
        </div>

        {/* Preview Notice */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-accent font-medium font-body mb-1">Preview Mode</p>
              <p className="text-muted-foreground font-caption">
                This is a limited preview. Purchase to access the full audiobook with all chapters and features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPreviewPlayer;
