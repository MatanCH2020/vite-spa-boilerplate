-- D1 Database Schema for AI Family Album Application
-- Hebrew RTL Family Photo Album with AI Integration

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Families table
CREATE TABLE IF NOT EXISTS families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'training', 'processing', 'completed', 'failed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Family members table
CREATE TABLE IF NOT EXISTS family_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    role TEXT CHECK (role IN ('dad', 'mom', 'child', 'other')),
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (family_id) REFERENCES families (id) ON DELETE CASCADE
);

-- Images table
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_member_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    file_size INTEGER,
    analysis_data TEXT, -- JSON data from AI analysis
    quality_score REAL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (family_member_id) REFERENCES family_members (id) ON DELETE CASCADE
);

-- Training jobs table
CREATE TABLE IF NOT EXISTS training_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    replicate_training_id TEXT,
    model_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (family_id) REFERENCES families (id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES family_members (id) ON DELETE CASCADE
);

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    style_type TEXT NOT NULL CHECK (style_type IN ('classic', 'modern', 'artistic', 'vintage', 'minimalist')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'failed')),
    result_urls TEXT, -- JSON array of generated image URLs
    metadata TEXT, -- JSON metadata
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (family_id) REFERENCES families (id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_families_user_id ON families (user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_family_id ON family_members (family_id);
CREATE INDEX IF NOT EXISTS idx_images_family_member_id ON images (family_member_id);
CREATE INDEX IF NOT EXISTS idx_training_jobs_family_id ON training_jobs (family_id);
CREATE INDEX IF NOT EXISTS idx_training_jobs_member_id ON training_jobs (member_id);
CREATE INDEX IF NOT EXISTS idx_albums_family_id ON albums (family_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Create triggers for updated_at timestamps
CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_families_updated_at 
    AFTER UPDATE ON families
    BEGIN
        UPDATE families SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_family_members_updated_at 
    AFTER UPDATE ON family_members
    BEGIN
        UPDATE family_members SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_images_updated_at 
    AFTER UPDATE ON images
    BEGIN
        UPDATE images SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_training_jobs_updated_at 
    AFTER UPDATE ON training_jobs
    BEGIN
        UPDATE training_jobs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_albums_updated_at 
    AFTER UPDATE ON albums
    BEGIN
        UPDATE albums SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;