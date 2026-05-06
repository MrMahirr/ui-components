-- Up Migration

CREATE TABLE components (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            category VARCHAR(100) NOT NULL,
                            slug VARCHAR(255) NOT NULL UNIQUE,
                            raw_react TEXT,
                            raw_html TEXT,
                            default_config JSONB NOT NULL DEFAULT '{}',
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN components.default_config IS 'Bileşenin dinamik renk, boyut, padding gibi ayarlarını tutar';

CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_slug ON components(slug);

-- Down Migration

DROP TABLE IF EXISTS components;