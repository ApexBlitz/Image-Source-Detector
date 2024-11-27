import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  metadata: ImageMetadata | null;
  isLoading: boolean;
}

interface ImageMetadata {
  source: string;
  dimensions: {
    width: number;
    height: number;
  };
  created?: string;
}

export function ImagePreview({ imageUrl, metadata, isLoading }: ImagePreviewProps) {
  if (!imageUrl) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="rounded-lg max-h-[400px] w-full object-contain bg-gray-50"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Image Information</h3>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : metadata ? (
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Source</dt>
                <dd className="mt-1 text-sm text-gray-900">{metadata.source}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {metadata.dimensions.width} x {metadata.dimensions.height}
                </dd>
              </div>
              {metadata.created && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">{metadata.created}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="text-sm text-gray-500">No metadata available</p>
          )}
        </div>
      </div>
    </div>
  );
}