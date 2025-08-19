import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedBooks = [], 
  totalBooks = 0,
  onSelectAll,
  onDeselectAll,
  onBulkDownload,
  onBulkRemoveDownload,
  onBulkDelete,
  className = '' 
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const isAllSelected = selectedBooks?.length === totalBooks && totalBooks > 0;
  const hasSelection = selectedBooks?.length > 0;

  const handleSelectToggle = () => {
    if (isAllSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleBulkAction = (action, actionFn) => {
    if (action === 'delete') {
      setConfirmAction(() => actionFn);
      setShowConfirmDialog(true);
    } else {
      actionFn(selectedBooks);
    }
  };

  const confirmBulkAction = () => {
    if (confirmAction) {
      confirmAction(selectedBooks);
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const getDownloadableCount = () => {
    return selectedBooks?.filter(book => !book?.isDownloaded)?.length;
  };

  const getDownloadedCount = () => {
    return selectedBooks?.filter(book => book?.isDownloaded)?.length;
  };

  if (!hasSelection) {
    return null;
  }

  return (
    <>
      <div className={`bg-primary text-primary-foreground border-t border-primary/20 ${className}`}>
        <div className="flex items-center justify-between p-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectToggle}
              className="flex items-center space-x-2 hover:bg-primary-foreground/10 rounded-lg px-2 py-1 transition-colors duration-200"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectToggle}
                  className="w-5 h-5 rounded border-2 border-primary-foreground/30 bg-transparent checked:bg-primary-foreground checked:border-primary-foreground"
                />
                {isAllSelected && (
                  <Icon 
                    name="Check" 
                    size={12} 
                    className="absolute top-0.5 left-0.5 text-primary pointer-events-none" 
                  />
                )}
              </div>
              <span className="font-body text-sm">
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </span>
            </button>
            
            <div className="text-sm font-caption">
              {selectedBooks?.length} of {totalBooks} selected
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            {getDownloadableCount() > 0 && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleBulkAction('download', onBulkDownload)}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Download ({getDownloadableCount()})
              </Button>
            )}

            {getDownloadedCount() > 0 && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => handleBulkAction('removeDownload', onBulkRemoveDownload)}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Remove ({getDownloadedCount()})
              </Button>
            )}

            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => handleBulkAction('delete', onBulkDelete)}
              className="bg-error text-error-foreground hover:bg-error/90"
            >
              Delete ({selectedBooks?.length})
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onDeselectAll}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            />
          </div>
        </div>

        {/* Progress Bar for Bulk Operations */}
        <div className="px-4 pb-2">
          <div className="text-xs font-caption mb-1 opacity-80">
            Storage: {getDownloadedCount()} downloaded • {getDownloadableCount()} available for download
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
          <div className="bg-surface border border-border rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Confirm Deletion
                </h3>
                <p className="text-sm text-muted-foreground font-caption">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-foreground font-body mb-6">
              Are you sure you want to delete {selectedBooks?.length} selected audiobook{selectedBooks?.length > 1 ? 's' : ''} from your library? 
              You will need to purchase them again to access the content.
            </p>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmBulkAction}
                className="flex-1"
              >
                Delete {selectedBooks?.length} Book{selectedBooks?.length > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsBar;