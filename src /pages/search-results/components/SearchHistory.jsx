import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHistory = ({ history, onHistoryClick, onClearHistory, className = '' }) => {
  if (!history || history?.length === 0) return null;

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-body font-medium text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>Recent Searches</span>
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          iconName="Trash2"
          iconSize={14}
          className="text-muted-foreground hover:text-destructive"
        >
          Clear
        </Button>
      </div>
      <div className="space-y-1">
        {history?.slice(0, 5)?.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onHistoryClick(item?.query)}
            className="w-full justify-start text-left h-auto py-2"
            iconName="Search"
            iconPosition="left"
            iconSize={14}
          >
            <div className="flex-1 min-w-0">
              <span className="truncate text-foreground">{item?.query}</span>
              <div className="text-xs text-muted-foreground font-caption">
                {new Date(item.timestamp)?.toLocaleDateString('en-IN')}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;