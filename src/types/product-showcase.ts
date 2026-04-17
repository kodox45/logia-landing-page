export type BlockType = 'heading' | 'text' | 'list' | 'media' | 'button' | 'spacer';

export interface BaseBlock {
  id: string;
  type: BlockType;
  className?: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  text: string;
  level: 1 | 2 | 3 | 4;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: string[];
  icon?: string; // Default icon for all items
  icons?: string[]; // Specific icons for each item
}

export interface MediaBlock extends BaseBlock {
  type: 'media';
  mediaType: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: string; // e.g., '1rem', '24px'
}

export type ProductBlock = 
  | HeadingBlock 
  | TextBlock 
  | ListBlock 
  | MediaBlock 
  | ButtonBlock 
  | SpacerBlock;

export interface CanvasConfig {
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  fontFamily?: string;
  padding?: string;
  customCss?: string; // For advanced AI-generated styles
}

export interface ProductData {
  id: string;
  slug: string;
  canvasConfig: CanvasConfig;
  layoutType: 'split-left' | 'split-right' | 'centered' | 'bento';
  blocks: ProductBlock[];
}
