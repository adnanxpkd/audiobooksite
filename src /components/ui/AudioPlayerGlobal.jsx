import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const AudioPlayerGlobal = ({ 
  isVisible = false, 
  audioData = null, 
  onClose,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  // Mock audio data for demonstration
  const defaultAudioData = {
    title: 'Sample Malayalam Audiobook',
    author: 'Author Name',
    narrator: 'Narrator Name',
    cover: '/assets/images/audiobook-cover.jpg',
    duration: 3600, // 1 hour in seconds
    currentChapter: 'Chapter 1: Introduction',
    totalChapters: 12
  };

  const currentAudio = audioData || defaultAudioData;

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio?.currentTime);
    const updateDuration = () => setDuration(audio?.duration);

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateDuration);
    audio?.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateDuration);
      audio?.removeEventListener('ended', () => setIsPlaying(false));
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
    if (!audio) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skipTime = (seconds) => {
    const audio = audioRef?.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates?.indexOf(playbackRate);
    const nextRate = rates?.[(currentIndex + 1) % rates?.length];
    setPlaybackRate(nextRate);
    if (audioRef?.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      {/* Compact Player */}
      {!isExpanded && (
        <div className={`fixed bottom-0 left-0 right-0 lg:bottom-16 bg-surface border-t border-border shadow-elevated z-100 ${className}`}>
          <div className="flex items-center p-4 space-x-4">
            {/* Album Art */}
            <div className="flex-shrink-0">
              <Image
                src={currentAudio?.cover}
                alt={currentAudio?.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-foreground truncate">
                {currentAudio?.title}
              </h4>
              <p className="text-sm text-muted-foreground font-caption truncate">
                {currentAudio?.author}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => skipTime(-15)}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Rewind 15s"
              >
                <Icon name="RotateCcw" size={18} />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
              </button>
              
              <button
                onClick={() => skipTime(15)}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Forward 15s"
              >
                <Icon name="RotateCw" size={18} />
              </button>
            </div>

            {/* Expand/Close */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Expand player"
              >
                <Icon name="ChevronUp" size={18} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                title="Close player"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-4">
            <div
              className="w-full h-1 bg-muted rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Expanded Player */}
      {isExpanded && (
        <div className="fixed inset-0 bg-surface z-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            >
              <Icon name="ChevronDown" size={20} />
            </button>
            
            <div className="text-center">
              <h3 className="font-body font-medium text-foreground">Now Playing</h3>
              <p className="text-sm text-muted-foreground font-caption">
                {currentAudio?.currentChapter}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
            {/* Large Album Art */}
            <div className="w-64 h-64 lg:w-80 lg:h-80">
              <Image
                src={currentAudio?.cover}
                alt={currentAudio?.title}
                className="w-full h-full rounded-2xl object-cover shadow-elevated"
              />
            </div>

            {/* Track Info */}
            <div className="text-center space-y-2 max-w-md">
              <h2 className="font-heading font-semibold text-2xl text-foreground">
                {currentAudio?.title}
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                {currentAudio?.author}
              </p>
              <p className="text-sm text-muted-foreground font-caption">
                Narrated by {currentAudio?.narrator}
              </p>
            </div>

            {/* Progress */}
            <div className="w-full max-w-md space-y-2">
              <div
                className="w-full h-2 bg-muted rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground font-data">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6">
              <button
                onClick={changePlaybackRate}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 font-data text-sm"
              >
                {playbackRate}x
              </button>
              
              <button
                onClick={() => skipTime(-30)}
                className="p-3 rounded-full hover:bg-muted transition-colors duration-200"
                title="Rewind 30s"
              >
                <Icon name="RotateCcw" size={24} />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-soft"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} />
              </button>
              
              <button
                onClick={() => skipTime(30)}
                className="p-3 rounded-full hover:bg-muted transition-colors duration-200"
                title="Forward 30s"
              >
                <Icon name="RotateCw" size={24} />
              </button>

              <div className="flex items-center space-x-2">
                <Icon name="Volume2" size={20} className="text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayerGlobal;