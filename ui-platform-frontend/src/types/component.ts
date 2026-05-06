export interface UIComponent {
    id: number;
    name: string;
    category: string;
    slug: string;
    raw_react: string | null;
    raw_html: string | null;
    default_config: Record<string, any>;
}