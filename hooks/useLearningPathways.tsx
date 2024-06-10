import { useQuery } from "@tanstack/react-query";

import { Pathway } from "@/types/types";
import { fetchLearningPathways } from "@/api/fetchLearningPathways";

export const useLearningPathways = () =>
  useQuery<Pathway[], Error>({
    queryKey: ["learningPathways"],
    queryFn: fetchLearningPathways,
  });
