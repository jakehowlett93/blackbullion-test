import axios from "axios";

export const fetchLearningPathways = async () => {
  const { data } = await axios.get(
    "https://www.blackbullion.com/api/_dev/pathways",
  );

  return data;
};
