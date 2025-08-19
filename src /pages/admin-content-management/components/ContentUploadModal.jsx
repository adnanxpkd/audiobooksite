import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    titleMalayalam: '',
    author: '',
    narrator: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    coverImage: null,
    audioFile: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const categoryOptions = [
    { value: 'thriller', label: 'Thriller' },
    { value: 'motivation', label: 'Motivation' },
    { value: 'stories', label: 'Stories' },
    { value: 'biography', label: 'Biography' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'romance', label: 'Romance' },
    { value: 'history', label: 'History' }
  ];

  const handleInputChange = (field, value) => {
    setUploadData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = e?.dataTransfer?.files;
    if (files && files?.[0]) {
      const file = files?.[0];
      if (file?.type?.startsWith('audio/')) {
        setUploadData(prev => ({ ...prev, audioFile: file }));
      }
    }
  };

  const handleFileSelect = (type) => {
    if (type === 'audio') {
      audioInputRef?.current?.click();
    } else {
      fileInputRef?.current?.click();
    }
  };

  const handleAudioFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadData(prev => ({ ...prev, audioFile: file }));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    onUpload(uploadData);
    setIsUploading(false);
    setUploadProgress(0);
    onClose();
    
    // Reset form
    setUploadData({
      title: '',
      titleMalayalam: '',
      author: '',
      narrator: '',
      description: '',
      category: '',
      duration: '',
      price: '',
      coverImage: null,
      audioFile: null
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-surface rounded-xl shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">Upload New Audiobook</h2>
            <p className="text-sm text-muted-foreground font-caption mt-1">Add a new Malayalam audiobook to the catalog</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <Input
                label="Title (English)"
                type="text"
                placeholder="Enter audiobook title"
                value={uploadData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
              />

              <Input
                label="Title (Malayalam)"
                type="text"
                placeholder="മലയാളം ശീർഷകം നൽകുക"
                value={uploadData?.titleMalayalam}
                onChange={(e) => handleInputChange('titleMalayalam', e?.target?.value)}
                required
              />

              <Input
                label="Author"
                type="text"
                placeholder="Author name"
                value={uploadData?.author}
                onChange={(e) => handleInputChange('author', e?.target?.value)}
                required
              />

              <Input
                label="Narrator"
                type="text"
                placeholder="Narrator name"
                value={uploadData?.narrator}
                onChange={(e) => handleInputChange('narrator', e?.target?.value)}
                required
              />

              <Select
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
                value={uploadData?.category}
                onChange={(value) => handleInputChange('category', value)}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Duration (minutes)"
                  type="number"
                  placeholder="120"
                  value={uploadData?.duration}
                  onChange={(e) => handleInputChange('duration', e?.target?.value)}
                  required
                />

                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="299"
                  value={uploadData?.price}
                  onChange={(e) => handleInputChange('price', e?.target?.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column - Files */}
            <div className="space-y-4">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  {uploadData?.coverImage ? (
                    <div className="space-y-2">
                      <Image
                        src={URL.createObjectURL(uploadData?.coverImage)}
                        alt="Cover preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">{uploadData?.coverImage?.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange('coverImage', null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Icon name="ImagePlus" size={32} className="text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Click to upload cover image</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileSelect('image')}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              {/* Audio File Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Audio File</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadData?.audioFile ? (
                    <div className="space-y-2">
                      <Icon name="Music" size={32} className="text-primary mx-auto" />
                      <p className="font-medium text-foreground">{uploadData?.audioFile?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadData?.audioFile?.size / (1024 * 1024))?.toFixed(2)} MB
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange('audioFile', null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Icon name="Upload" size={32} className="text-muted-foreground mx-auto" />
                      <p className="font-medium text-foreground">Drop audio file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleFileSelect('audio')}
                      >
                        Choose Audio File
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              value={uploadData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Enter audiobook description..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Uploading...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" loading={isUploading}>
              Upload Audiobook
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentUploadModal;
