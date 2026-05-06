export interface ComponentConfig {
  // JSONB kolonumuzun içindeki esnek yapının TypeScript karşılığı
  colors?: Record<string, string>;
  padding?: string;
  rounded?: string;
  variants?: string[];
  [key: string]: any; // İleride eklenebilecek ekstra dinamik ayarlar için
}

export interface ComponentEntity {
  id: number;
  name: string;
  category: string;
  slug: string;
  raw_react: string | null;
  raw_html: string | null;
  default_config: ComponentConfig;
  created_at: Date;
  updated_at: Date;
}
