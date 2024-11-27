import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ImagePreview } from './components/ImagePreview';
import { Questionnaire, QuestionnaireData } from './components/Questionnaire';
import { SearchResults, SearchResult } from './components/SearchResults';
import { analyzeImage } from './utils/imageAnalysis';
import { searchImageSources } from './utils/api';
import { Camera } from 'lucide-react';

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleFileSelect = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setIsAnalyzing(true);
    setSearchResults([]);

    try {
      const result = await analyzeImage(file);
      setMetadata(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuestionnaireSubmit = async (answers: QuestionnaireData) => {
    if (!imageUrl) return;
    
    setIsSearching(true);
    try {
      const results = await searchImageSources(imageUrl, answers);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for image sources:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Camera className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Image Source Detector
          </h1>
          <p className="mt-2 text-gray-600">
            Upload an image and we'll help you find its source
          </p>
        </div>

        <FileUpload onFileSelect={handleFileSelect} />
        
        {imageUrl && (
          <>
            <ImagePreview
              imageUrl={imageUrl}
              metadata={metadata}
              isLoading={isAnalyzing}
            />
            <Questionnaire onSubmit={handleQuestionnaireSubmit} />
            <SearchResults
              results={searchResults}
              isLoading={isSearching}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;