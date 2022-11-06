import {LngLatBoundsLike} from "mapbox-gl";

export interface Community {
  pk: number;
  name: string;
  description: string;
  approved: boolean;
  published: boolean;
  bbox: LngLatBoundsLike;
  path_slug: string;
}

export interface Location {
  pk: number;
  community: number;
  category: string; // slug
  name: string;
  address: string;
  website: string;
  email: string;
  description: string;
  phone: string;
  geographic_entity: boolean;
  inexact_location: boolean;
  published: boolean;
  pin_color: string;
  category_label: string;
}

export interface User {
  approved: boolean;
}
