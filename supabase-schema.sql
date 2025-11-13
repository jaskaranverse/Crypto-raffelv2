-- Supabase Database Schema for Crypto Raffle
-- Copy and paste this entire file into Supabase SQL Editor

-- Create raffles table
CREATE TABLE raffles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  prize_pool DECIMAL NOT NULL,
  entry_fee DECIMAL NOT NULL,
  total_spots INTEGER NOT NULL,
  max_per_wallet INTEGER NOT NULL,
  end_time BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  status TEXT DEFAULT 'active',
  winner TEXT,
  winner_avatar TEXT,
  completed_at BIGINT,
  winner_drawn_at BIGINT,
  auto_draw_enabled BOOLEAN DEFAULT true
);

-- Create participants table
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL,
  address TEXT NOT NULL,
  entries INTEGER DEFAULT 1,
  avatar TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  tx_hash TEXT NOT NULL,
  FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE
);

-- Create transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL,
  from_address TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  timestamp BIGINT NOT NULL,
  tx_hash TEXT NOT NULL,
  FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE
);

-- Create winners table
CREATE TABLE winners (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL UNIQUE,
  raffle_title TEXT NOT NULL,
  winner_address TEXT NOT NULL,
  prize_amount DECIMAL NOT NULL,
  drawn_at BIGINT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_at BIGINT,
  participant_number INTEGER NOT NULL,
  total_participants INTEGER NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write access
-- (In production, you'd want more restrictive policies)

-- Raffles policies
CREATE POLICY "Allow public read access on raffles" 
  ON raffles FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on raffles" 
  ON raffles FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update on raffles" 
  ON raffles FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete on raffles" 
  ON raffles FOR DELETE 
  USING (true);

-- Participants policies
CREATE POLICY "Allow public read access on participants" 
  ON participants FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on participants" 
  ON participants FOR INSERT 
  WITH CHECK (true);

-- Transactions policies
CREATE POLICY "Allow public read access on transactions" 
  ON transactions FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on transactions" 
  ON transactions FOR INSERT 
  WITH CHECK (true);

-- Winners policies
CREATE POLICY "Allow public read access on winners" 
  ON winners FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on winners" 
  ON winners FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update on winners" 
  ON winners FOR UPDATE 
  USING (true);