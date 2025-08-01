'use client';

import { ImagePlus, X, Loader2 } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/Form';
import { useState } from 'react';

const CDN_PREFIX = process.env.BASE_URL || '';

export function ImageUploadField({ form }: { form: any }) {
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const [uploadingIndices, setUploadingIndices] = useState<number[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File, index: number) => {
    try {
      setUploadingIndices((prev) => [...prev, index]);
      setUploadError(null);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}v1/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.filename) {
        throw new Error('Server response did not include a URL');
      }

      let fullUrl = data.filename;

      if (!/^https?:\/\//i.test(fullUrl)) {
        fullUrl = CDN_PREFIX + fullUrl;
      }

      const currentImages = form.getValues('images') || [];
      const newImages = [...currentImages];
      newImages[index] = fullUrl;
      form.setValue('images', newImages);

      return fullUrl;
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
      return null;
    } finally {
      setUploadingIndices((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleFileAdd = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const currentImages = form.getValues('images') || [];
    const newImages = [...currentImages];
    const filesToUpload = Array.from(fileList);

    // Add placeholders (File objects) for immediate preview
    filesToUpload.forEach((file) => {
      newImages.push(file);
    });
    form.setValue('images', newImages);

    // Upload files sequentially and update URLs
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const index = currentImages.length + i;
      await uploadFile(file, index);
    }
  };

  const handleFileRemove = (indexToRemove: number) => {
    if (uploadingIndices.includes(indexToRemove)) return;

    const currentImages = form.getValues('images') || [];
    const newImages = currentImages.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    form.setValue('images', newImages);
  };

  return (
    <FormField
      control={form.control}
      name='images'
      render={({ field }) => {
        const images = Array.isArray(field.value)
          ? field.value.filter(Boolean)
          : [];

        return (
          <FormItem>
            <FormLabel className='h3-regular text-black'>
              Загрузите фото (если есть){' '}
            </FormLabel>
            {uploadError && (
              <div className='text-red-500 text-sm mb-2'>{uploadError}</div>
            )}
            <FormControl>
              <div className='flex flex-wrap gap-4'>
                {images.length > 0 &&
                  images.map((image: File | string, index: number) => (
                    <div
                      key={index}
                      className='relative w-20 h-20 rounded-md overflow-hidden border'
                      onMouseEnter={() => setHoveringIndex(index)}
                      onMouseLeave={() => setHoveringIndex(null)}
                    >
                      {uploadingIndices.includes(index) ? (
                        <div className='absolute inset-0 bg-gray-100 flex items-center justify-center'>
                          <Loader2 className='h-8 w-8 text-gray-400 animate-spin' />
                        </div>
                      ) : (
                        <>
                          <img
                            src={
                              typeof image === 'string'
                                ? image
                                : URL.createObjectURL(image)
                            }
                            alt={`Preview ${index + 1}`}
                            className='object-cover w-full h-full'
                          />
                          {hoveringIndex === index && (
                            <div
                              className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer'
                              onClick={() => handleFileRemove(index)}
                            >
                              <X className='text-white' />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}

                {/* Upload placeholder */}
                <div className='text-gray-500 w-20 h-20 rounded-md bg-[#F2F4F7] flex items-center justify-center border border-gray-300'>
                  <label
                    htmlFor='image-upload'
                    className='w-full h-full flex flex-col items-center justify-center cursor-pointer'
                  >
                    <ImagePlus className='mb-1' />
                    <span className='text-xs text-gray-500'>Загрузить</span>
                    <input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={(e) => handleFileAdd(e.target.files)}
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
