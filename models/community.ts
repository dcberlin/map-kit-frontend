export interface Community {
  pk: number;
  name: string;
  description: string;
  approved: boolean;
  published: boolean;
  bbox: number[];
  path_slug: string;
}
