import axios from 'axios';
import { SearchResult } from '../components/SearchResults';
import { QuestionnaireData } from '../components/Questionnaire';

// For demo purposes, we'll simulate API calls
export async function searchImageSources(
  imageUrl: string,
  questionnaire: QuestionnaireData
): Promise<SearchResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real application, you would make an API call to a reverse image search service
  // For demo purposes, we'll return mock results based on the questionnaire data
  const mockResults: SearchResult[] = [
    {
      url: 'https://unsplash.com/photos/example',
      title: 'Original image on Unsplash',
      confidence: 0.95,
      thumbnail: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    },
    {
      url: 'https://pexels.com/photos/example',
      title: 'Similar image on Pexels',
      confidence: 0.82,
      thumbnail: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    },
    {
      url: 'https://stockphoto.com/example',
      title: 'Related stock photo',
      confidence: 0.75,
      thumbnail: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
    },
  ];

  return mockResults.filter(result => {
    // Filter results based on questionnaire data
    if (questionnaire.sourceType === 'stock' && result.url.includes('stock')) {
      return true;
    }
    if (questionnaire.sourceType === 'social' && result.url.includes('unsplash')) {
      return true;
    }
    return questionnaire.sourceType === '';
  });
}