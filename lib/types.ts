export type UserRole = 'admin' | 'editor' | 'reviewer' | 'viewer';

export type Industry = 'industrial' | 'logistics' | 'industrial_real_estate';
export type Tone = 'professional' | 'technical' | 'consultative';
export type Intent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export type TaskStatus =
  | 'OUTLINE_PENDING'
  | 'OUTLINE_GENERATED'
  | 'OUTLINE_APPROVED'
  | 'DRAFT_GENERATED'
  | 'CONTENT_APPROVED'
  | 'IMAGES_READY'
  | 'WP_DRAFTED';

export interface OutlineResult {
  h1: string;
  sections: { h2: string; h3: string[] }[];
  faq_questions: string[];
  internal_link_anchors: string[];
}

export interface ArticleResult {
  markdown: string;
  meta_title: string;
  meta_description: string;
  faq_schema_jsonld: Record<string, unknown>;
}

export interface ImageNamingResult {
  filename_slug: string;
  alt_text: string;
  title_text: string;
}
