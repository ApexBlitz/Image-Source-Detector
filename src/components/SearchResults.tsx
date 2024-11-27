import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export interface SearchResult {
  url: string;
  title: string;
  confidence: number;
  thumbnail?: string;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Possible Sources Found</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{result.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Visit Source
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}