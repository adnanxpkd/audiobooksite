import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ audiobook }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingFilters = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const handleHelpfulVote = (reviewId, isHelpful) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: {
        ...prev?.[reviewId],
        [isHelpful ? 'helpful' : 'notHelpful']: (prev?.[reviewId]?.[isHelpful ? 'helpful' : 'notHelpful'] || 0) + 1,
        userVoted: isHelpful ? 'helpful' : 'notHelpful'
      }
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={`${
          i < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const renderRatingDistribution = () => {
    const distribution = audiobook?.ratingDistribution;
    const total = Object.values(distribution)?.reduce((sum, count) => sum + count, 0);

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1]?.map((rating) => (
          <div key={rating} className="flex items-center space-x-3">
            <span className="text-sm font-data text-muted-foreground w-6">
              {rating}
            </span>
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-warning rounded-full transition-all duration-300"
                style={{ width: `${total ? (distribution?.[rating] / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-data text-muted-foreground w-8">
              {distribution?.[rating]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Rating Summary */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground font-data mb-1">
                {audiobook?.rating}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.floor(audiobook?.rating))}
              </div>
              <div className="text-sm text-muted-foreground font-caption">
                {audiobook?.reviewCount} reviews
              </div>
            </div>
            
            <div className="flex-1 max-w-xs">
              {renderRatingDistribution()}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {ratingFilters?.map((filter) => (
                <option key={filter?.value} value={filter?.value}>
                  {filter?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="divide-y divide-border">
        {audiobook?.reviews?.map((review) => {
          const votes = helpfulVotes?.[review?.id] || { helpful: review?.helpfulCount, notHelpful: review?.notHelpfulCount };
          
          return (
            <div key={review?.id} className="p-6">
              <div className="flex items-start space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={review?.user?.avatar}
                    alt={review?.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info and Rating */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-body font-medium text-foreground">
                        {review?.user?.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground font-caption">
                      <span>{formatDate(review?.date)}</span>
                      {review?.verified && (
                        <span className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={12} />
                          <span>Verified Purchase</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review Title */}
                  {review?.title && (
                    <h5 className="font-body font-semibold text-foreground mb-2">
                      {review?.title}
                    </h5>
                  )}

                  {/* Review Text */}
                  <p className="text-foreground font-body leading-relaxed mb-4 whitespace-pre-line">
                    {review?.content}
                  </p>

                  {/* Helpful Votes */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground font-caption">
                        Was this review helpful?
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleHelpfulVote(review?.id, true)}
                          disabled={votes?.userVoted}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                            votes?.userVoted === 'helpful' ?'bg-success/10 text-success' :'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon name="ThumbsUp" size={14} />
                          <span className="font-data">{votes?.helpful}</span>
                        </button>
                        <button
                          onClick={() => handleHelpfulVote(review?.id, false)}
                          disabled={votes?.userVoted}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                            votes?.userVoted === 'notHelpful' ?'bg-error/10 text-error' :'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon name="ThumbsDown" size={14} />
                          <span className="font-data">{votes?.notHelpful}</span>
                        </button>
                      </div>
                    </div>

                    {/* Report Button */}
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-caption">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Load More */}
      <div className="p-6 border-t border-border text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;