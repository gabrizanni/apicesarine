// Demo data types

export interface DemoEducator {
  slug: string;
  name: string;
  bio: string;
  specialization: string;
  avatar_url: string;
  cover_image_url?: string;
  cover_image_alt?: string;
  email?: string;
  phone?: string;
  available_days: string[];
  available_regions: string[];
  availability_notes?: string;
  is_active: boolean;
}

export interface DemoWorkshop {
  slug: string;
  title: string;
  description: string;
  duration_minutes: number;
  max_participants: number;
  price?: number;
  cover_image_url?: string;
  cover_image_alt?: string;
  is_active: boolean;
}

export interface DemoPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  status: 'draft' | 'published';
  published_at?: string;
}

export interface DemoFaq {
  question: string;
  answer: string;
  category?: string;
  display_order: number;
  is_active: boolean;
}

export interface DemoPartner {
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  display_order: number;
  is_active: boolean;
}

export interface DemoGalleryItem {
  title: string;
  description?: string;
  image_url: string;
  image_alt?: string;
  category?: string;
  display_order: number;
  is_active: boolean;
}

export interface DemoResource {
  title: string;
  description?: string;
  file_type: string;
  file_url?: string;
  file_size?: string;
  target_age_group?: string;
  tags?: string[];
  is_premium: boolean;
}
