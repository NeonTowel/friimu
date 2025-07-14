CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  game_url TEXT NOT NULL,
  genre TEXT,
  platform TEXT,
  publisher TEXT,
  developer TEXT,
  release_date TEXT,
  freetogame_profile_url TEXT,
  thumbnail TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_games_genre ON games(genre);
CREATE INDEX IF NOT EXISTS idx_games_platform ON games(platform);
CREATE INDEX IF NOT EXISTS idx_games_external_id ON games(external_id);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
