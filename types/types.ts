export type Pathway = {
  id: number;
  title: string;
  internal_title: string;
  url: string;
  intro: string;
  duration: string;
  image: string;
  type: string;
  has_summative_assessment: boolean;
};

export type PathwayFilters = {
  assessment: boolean;
};
