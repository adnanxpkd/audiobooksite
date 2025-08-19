import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContentTable = ({ 
  audiobooks, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onEdit, 
  onToggleFeature, 
  onViewAnalytics,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-success text-success-foreground', label: 'Published' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      pending: { color: 'bg-accent text-accent-foreground', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedItems?.length === audiobooks?.length && audiobooks?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('title')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Title</span>
                  {getSortIcon('title')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('author')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Author</span>
                  {getSortIcon('author')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Category</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('uploadDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Upload Date</span>
                  {getSortIcon('uploadDate')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('sales')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Sales</span>
                  {getSortIcon('sales')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audiobooks?.map((audiobook) => (
              <tr
                key={audiobook?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  selectedItems?.includes(audiobook?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(audiobook?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedItems?.includes(audiobook?.id)}
                    onChange={(e) => onSelectItem(audiobook?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={audiobook?.cover}
                      alt={audiobook?.title}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{audiobook?.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{audiobook?.titleMalayalam}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{audiobook?.author}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                    {audiobook?.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground font-data">
                  {formatDate(audiobook?.uploadDate)}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(audiobook?.status)}
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{formatCurrency(audiobook?.revenue)}</p>
                    <p className="text-xs text-muted-foreground">{audiobook?.downloads} downloads</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(audiobook)}
                      title="Edit"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleFeature(audiobook?.id)}
                      title={audiobook?.featured ? "Remove from featured" : "Add to featured"}
                    >
                      <Icon 
                        name={audiobook?.featured ? "Star" : "StarOff"} 
                        size={16} 
                        className={audiobook?.featured ? "text-warning" : ""}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewAnalytics(audiobook)}
                      title="View analytics"
                    >
                      <Icon name="BarChart3" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {audiobooks?.map((audiobook) => (
          <div
            key={audiobook?.id}
            className={`bg-surface border border-border rounded-lg p-4 ${
              selectedItems?.includes(audiobook?.id) ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedItems?.includes(audiobook?.id)}
                onChange={(e) => onSelectItem(audiobook?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <Image
                src={audiobook?.cover}
                alt={audiobook?.title}
                className="w-16 h-16 rounded object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h3 className="font-medium text-foreground truncate">{audiobook?.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{audiobook?.titleMalayalam}</p>
                  <p className="text-sm text-muted-foreground">by {audiobook?.author}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusBadge(audiobook?.status)}
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                    {audiobook?.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{formatCurrency(audiobook?.revenue)}</p>
                    <p className="text-muted-foreground">{audiobook?.downloads} downloads</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(audiobook)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleFeature(audiobook?.id)}
                    >
                      <Icon 
                        name={audiobook?.featured ? "Star" : "StarOff"} 
                        size={16} 
                        className={audiobook?.featured ? "text-warning" : ""}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewAnalytics(audiobook)}
                    >
                      <Icon name="BarChart3" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTable;
