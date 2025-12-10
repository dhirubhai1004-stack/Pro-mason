
import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, Upload } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  image: string | null;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  t: (key: string) => string;
  className?: string;
  aspectRatio?: 'square' | 'video'; // 'video' acts as the rectangular ID card shape
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, image, onImageChange, t, className = '', aspectRatio = 'video' }) => {
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      onImageChange(file, url);
      setShowOptions(false);
    }
  };

  const handleOptionClick = (type: 'camera' | 'gallery') => {
    if (fileInputRef.current) {
      if (type === 'camera') {
        fileInputRef.current.setAttribute('capture', 'environment');
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div 
        onClick={() => !image && setShowOptions(true)}
        className={`relative border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center
          ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/2]'}
        `}
      >
        {image ? (
          <>
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <Upload size={24} className="mb-2" />
            <span className="text-xs font-medium">{t('upload_documents')}</span>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Action Sheet Modal */}
      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowOptions(false)}></div>
          <div className="bg-white w-full max-w-md rounded-t-2xl p-6 relative z-10 animate-slide-up space-y-4">
            <h3 className="font-bold text-lg text-center mb-2">{t('choose_action')}</h3>
            
            <button 
              onClick={() => handleOptionClick('camera')}
              className="w-full bg-gray-50 p-4 rounded-xl flex items-center gap-4 hover:bg-gray-100 border border-gray-100"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Camera size={20} />
              </div>
              <span className="font-bold">{t('camera')}</span>
            </button>

            <button 
              onClick={() => handleOptionClick('gallery')}
              className="w-full bg-gray-50 p-4 rounded-xl flex items-center gap-4 hover:bg-gray-100 border border-gray-100"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <ImageIcon size={20} />
              </div>
              <span className="font-bold">{t('gallery')}</span>
            </button>

            <button 
              onClick={() => setShowOptions(false)}
              className="w-full py-4 text-center font-bold text-red-500"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
