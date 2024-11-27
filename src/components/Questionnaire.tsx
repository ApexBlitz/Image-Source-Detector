import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface QuestionnaireProps {
  onSubmit: (answers: QuestionnaireData) => void;
}

export interface QuestionnaireData {
  purpose: string;
  keywords: string[];
  sourceType: string;
}

export function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [purpose, setPurpose] = useState('');
  const [keywords, setKeywords] = useState('');
  const [sourceType, setSourceType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      purpose,
      keywords: keywords.split(',').map(k => k.trim()),
      sourceType
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Help us find the image source</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What's the purpose of this image?
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a purpose...</option>
            <option value="commercial">Commercial Use</option>
            <option value="editorial">Editorial</option>
            <option value="personal">Personal Use</option>
            <option value="research">Research</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter relevant keywords (comma-separated)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., nature, landscape, mountain"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected source type
          </label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select source type...</option>
            <option value="stock">Stock Photo Website</option>
            <option value="social">Social Media</option>
            <option value="news">News Website</option>
            <option value="blog">Blog/Personal Website</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Search className="w-4 h-4 mr-2" />
          Search Source
        </button>
      </form>
    </div>
  );
}