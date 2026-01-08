import { useState } from 'react';
import { supabase } from '../supabaseClient';

export function useImageUpload() {
  const [uploadingState, setUploadingState] = useState({});

  // 1. Helper: Compress Image
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.7);
        };
      };
    });
  };

  // 2. Helper: Upload Logic
  const uploadImage = async (file, loaderKey) => {
    if (!file) return null;

    try {
      setUploadingState((prev) => ({ ...prev, [loaderKey]: true }));
      
      const compressedFile = await compressImage(file);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      
      const { error } = await supabase.storage.from('portfolio-assets').upload(fileName, compressedFile);
      if (error) throw error;
      
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
      return data.publicUrl;

    } catch (error) {
      alert('Upload failed: ' + error.message);
      return null;
    } finally {
      setUploadingState((prev) => ({ ...prev, [loaderKey]: false }));
    }
  };

  return { uploadImage, uploadingState };
}