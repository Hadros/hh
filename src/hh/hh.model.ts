export interface HhResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
  clusters: Cluster[];
  arguments?: any;
  alternative_url: string;
}

export interface Cluster {
  name: string;
  id: string;
  items: ClusterElement[];
}

export interface ClusterElement {
  name: string;
  url: string;
  count: number;
}

export interface Vacancy {
  id: string;
  premium: boolean;
  name: string;
  department?: any;
  has_test: boolean;
  response_letter_required: boolean;
}
