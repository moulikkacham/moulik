-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('buyer', 'uploader', 'admin')),
  avatar_url VARCHAR(255),
  bio TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'))
);

-- Create food listings table
CREATE TABLE IF NOT EXISTS food_listings (
  id SERIAL PRIMARY KEY,
  uploader_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity VARCHAR(100) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  listing_price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  allergens TEXT,
  storage_type VARCHAR(100),
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'claimed', 'expired', 'removed')),
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id SERIAL PRIMARY KEY,
  listing_id INT NOT NULL REFERENCES food_listings(id) ON DELETE CASCADE,
  buyer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  reviewer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewed_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  claim_id INT REFERENCES claims(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  reporter_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id INT REFERENCES users(id) ON DELETE CASCADE,
  reported_listing_id INT REFERENCES food_listings(id) ON DELETE CASCADE,
  report_type VARCHAR(100) NOT NULL CHECK (report_type IN ('inappropriate', 'fraud', 'spam', 'other')),
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create impact tracking table
CREATE TABLE IF NOT EXISTS impact_tracking (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  food_items_shared INT DEFAULT 0,
  people_helped INT DEFAULT 0,
  waste_prevented_kg DECIMAL(10, 2) DEFAULT 0,
  total_value_shared DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_listings_uploader ON food_listings(uploader_id);
CREATE INDEX idx_listings_status ON food_listings(status);
CREATE INDEX idx_listings_category ON food_listings(category);
CREATE INDEX idx_listings_expires ON food_listings(expires_at);
CREATE INDEX idx_claims_listing ON claims(listing_id);
CREATE INDEX idx_claims_buyer ON claims(buyer_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewed ON reviews(reviewed_user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_impact_user ON impact_tracking(user_id);
