export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  hours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    google?: string;
    youtube?: string;
  };
  trustBarStats: {
    googleRating: number;
    reviewCount: number;
    projectsCompleted: number;
    turnaroundDays: string;
  };
}

export interface Material {
  _id: string;
  name: string;
  slug: { current: string };
  heroImage: SanityImage;
  overview: string;
  prosAndCons: { pros: string[]; cons: string[] };
  maintenance: string;
  priceRange: { low: number; high: number };
  colorGallery: SanityImage[];
  bestFor: string[];
  gulfCoastNote: string;
  comparisonData: MaterialComparison;
  faq: FAQ[];
}

export interface MaterialComparison {
  durability: number;
  heatResistance: number;
  stainResistance: number;
  scratchResistance: number;
  maintenanceLevel: "Low" | "Medium" | "High";
  sealingRequired: boolean;
  sealingFrequency?: string;
  priceRangeSF: { low: number; high: number };
  bestFor: string[];
  gulfCoastSuitability: number;
  gulfCoastNote: string;
  lifespan: number;
}

export interface Service {
  _id: string;
  name: string;
  slug: { current: string };
  heroImage: SanityImage;
  headline: string;
  description: string;
  whatsIncluded: string[];
  processSteps: { title: string; description: string }[];
  materialRecommendations: string[];
  pricing: string;
  faq: FAQ[];
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage: SanityImage;
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
  gallery: SanityImage[];
  materialType: { name: string; slug: { current: string } };
  serviceType: { name: string; slug: { current: string } };
  roomType: string;
  style: string;
  budgetRange: string;
  squareFootage?: number;
  edgeProfile?: string;
  description: any[];
  customerTestimonial?: { name: string; quote: string; rating: number };
  completionDate: string;
  city: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage: SanityImage;
  excerpt: string;
  body: any[];
  category: string;
  author: TeamMember;
  publishDate: string;
  relatedPosts: BlogPost[];
  seoTitle?: string;
  seoDescription?: string;
  estimatedReadTime?: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  projectType: string;
  date: string;
  city: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo: SanityImage;
  bio: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceArea {
  _id: string;
  cityName: string;
  slug: { current: string };
  intro: string;
  neighborhoods: string[];
  landmarks: string[];
  content: any[];
  mapCenter: { lat: number; lng: number };
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroBeforeImage: SanityImage;
  heroAfterImage: SanityImage;
  featuredProjects: Project[];
  ctaText: string;
  trustBarOverrides?: Partial<SiteSettings["trustBarStats"]>;
}
