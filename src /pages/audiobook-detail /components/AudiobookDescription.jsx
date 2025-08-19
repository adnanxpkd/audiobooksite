import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudiobookDescription = ({ audiobook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'chapters', label: 'Chapters', icon: 'List' },
    { id: 'details', label: 'Details', icon: 'Info' }
  ];

  const shouldShowReadMore = audiobook?.description?.length > 300;
  const displayDescription = isExpanded || !shouldShowReadMore 
    ? audiobook?.description 
    : audiobook?.description?.substring(0, 300) + '...';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <div className="prose prose-gray max-w-none">
              <p className="text-foreground font-body leading-relaxed whitespace-pre-line">
                {displayDescription}
              </p>
              {shouldShowReadMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                  iconPosition="right"
                  className="mt-2 p-0 h-auto"
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>
            {/* Key Themes */}
            {audiobook?.themes && audiobook?.themes?.length > 0 && (
              <div className="pt-4 border-t border-border">
                <h4 className="font-body font-semibold text-foreground mb-3">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {audiobook?.themes?.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-caption"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'chapters':
        return (
          <div className="space-y-3">
            {audiobook?.chapters?.map((chapter, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-data font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-body font-medium text-foreground">
                      {chapter?.title}
                    </h5>
                    <p className="text-sm text-muted-foreground font-caption">
                      {Math.floor(chapter?.duration / 60)}m {chapter?.duration % 60}s
                    </p>
                  </div>
                </div>
                <Icon name="Play" size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            {/* Technical Details */}
            <div>
              <h4 className="font-body font-semibold text-foreground mb-4">Technical Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">Format</span>
                    <span className="font-data text-foreground">{audiobook?.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">Bitrate</span>
                    <span className="font-data text-foreground">{audiobook?.bitrate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">File Size</span>
                    <span className="font-data text-foreground">{audiobook?.fileSize}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">Sample Rate</span>
                    <span className="font-data text-foreground">{audiobook?.sampleRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">Channels</span>
                    <span className="font-data text-foreground">{audiobook?.channels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-caption">DRM</span>
                    <span className="font-data text-foreground">{audiobook?.drm}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Publication Details */}
            <div className="pt-6 border-t border-border">
              <h4 className="font-body font-semibold text-foreground mb-4">Publication Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-caption">ISBN</span>
                  <span className="font-data text-foreground">{audiobook?.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-caption">Original Publication</span>
                  <span className="font-data text-foreground">{audiobook?.originalPublicationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-caption">Audio Release</span>
                  <span className="font-data text-foreground">{audiobook?.releaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-caption">Copyright</span>
                  <span className="font-data text-foreground">{audiobook?.copyright}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-soft">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-4 text-sm font-body transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AudiobookDescription;
