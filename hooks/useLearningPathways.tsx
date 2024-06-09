import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLearningPathways = async () => {
  const { data } = await axios.get('https://www.blackbullion.com/api/_dev/pathways');
  return data;
};

export const useLearningPathways = () => useQuery({queryKey: ['learningPathways'], queryFn: fetchLearningPathways});
