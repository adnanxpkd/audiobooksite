import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ query, onSuggestionClick, className = '' }) => {
  const suggestions = [
    {
      type: 'popular',
      title: 'Popular searches',
      items: [
        'രണ്ടാമൂഴം',
        'ബാല്യകാലസഖി',
        'ചെമ്മീൻ',
        'എം.ടി. വാസുദേവൻ നായർ',
        'വൈക്കം മുഹമ്മദ് ബഷീർ'
      ]
    },
    {
      type: 'category',
      title: 'Browse by category',
      items: [
        { name: 'ത്രില്ലർ കഥകൾ', icon: 'Zap' },
        { name: 'പ്രചോദന പുസ്തകങ്ങൾ', icon: 'TrendingUp' },
        { name: 'ക്ലാസിക് സാഹിത്യം', icon: 'BookOpen' },
        { name: 'ആത്മകഥകൾ', icon: 'User' }
      ]
    },
    {
      type: 'trending',
      title: 'Trending now',
      items: [
        'കാലാപാനി',
        'മയ്യഴിപ്പുഴയുടെ തീരങ്ങളിൽ',
        'നാലുകെട്ട്',
        'ഒരു ദേശത്തിന്റെ കഥ'
      ]
    }
  ];

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 space-y-6 ${className}`}>
      {/* No Results Message */}
      {query && (
        <div className="text-center space-y-2">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            No results for "{query}"
          </h3>
          <p className="text-muted-foreground font-body">
            Try adjusting your search or browse our suggestions below
          </p>
        </div>
      )}
      {/* Suggestions */}
      {suggestions?.map((section, index) => (
        <div key={index} className="space-y-3">
          <h4 className="font-body font-medium text-foreground flex items-center space-x-2">
            {section?.type === 'popular' && <Icon name="TrendingUp" size={16} />}
            {section?.type === 'category' && <Icon name="Grid3X3" size={16} />}
            {section?.type === 'trending' && <Icon name="Flame" size={16} />}
            <span>{section?.title}</span>
          </h4>
          
          <div className="space-y-2">
            {section?.items?.map((item, itemIndex) => (
              <Button
                key={itemIndex}
                variant="ghost"
                size="sm"
                onClick={() => onSuggestionClick(typeof item === 'string' ? item : item?.name)}
                className="w-full justify-start text-left h-auto py-2"
                iconName={typeof item === 'object' ? item?.icon : 'Search'}
                iconPosition="left"
                iconSize={14}
              >
                <span className="truncate">
                  {typeof item === 'string' ? item : item?.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      ))}
      {/* Help Text */}
      <div className="pt-4 border-t border-border">
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <h5 className="font-body font-medium text-foreground text-sm">Search Tips:</h5>
          <ul className="text-sm text-muted-foreground font-caption space-y-1">
            <li>• Try different keywords or spellings</li>
            <li>• Use Malayalam or English terms</li>
            <li>• Search by author, narrator, or title</li>
            <li>• Browse categories for inspiration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;