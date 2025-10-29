-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text check (role in ('student', 'investor', 'university')) not null,
  wallet_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Loans table
create table loans (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references profiles(id) not null,
  student_name text not null,
  university text not null,
  amount numeric not null check (amount > 0),
  duration_months integer not null check (duration_months > 0),
  interest_rate numeric not null default 5,
  token_id text,
  status text check (status in ('open', 'funding', 'funded', 'repaying', 'completed')) default 'open',
  amount_raised numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table loans enable row level security;

create policy "Anyone can view loans"
  on loans for select
  using (true);

create policy "Students can create loans"
  on loans for insert
  with check (auth.uid() = student_id);

-- Investments table
create table investments (
  id uuid primary key default uuid_generate_v4(),
  loan_id uuid references loans(id) not null,
  investor_id uuid references profiles(id) not null,
  amount numeric not null check (amount > 0),
  tokens_received numeric not null,
  transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table investments enable row level security;

create policy "Investors can view own investments"
  on investments for select
  using (auth.uid() = investor_id);

create policy "Investors can create investments"
  on investments for insert
  with check (auth.uid() = investor_id);

-- Repayments table
create table repayments (
  id uuid primary key default uuid_generate_v4(),
  loan_id uuid references loans(id) not null,
  amount numeric not null check (amount > 0),
  payment_date timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table repayments enable row level security;

create policy "Anyone can view repayments"
  on repayments for select
  using (true);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  read_time INTEGER NOT NULL DEFAULT 5,
  is_featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts (public read access)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, read_time, is_featured) VALUES
(
  'The Future of Student Loans is On-Chain',
  'future-of-student-loans-on-chain',
  'Discover how blockchain technology is revolutionizing education financing, making it more transparent, accessible, and fair for everyone involved.',
  'Full article content here...',
  'MintEdu Team',
  'Technology',
  5,
  true
),
(
  'Understanding HTS Tokens',
  'understanding-hts-tokens',
  'A deep dive into Hedera Token Service and how we use it to tokenize student loans for maximum transparency.',
  'Full article content here...',
  'Alex Kumar',
  'Technology',
  4,
  false
),
(
  'How to Apply for Your First Loan',
  'how-to-apply-first-loan',
  'Step-by-step guide for students looking to fund their education through MintEdu''s decentralized platform.',
  'Full article content here...',
  'Sarah Martinez',
  'Student Guide',
  6,
  false
),
(
  'Maximizing Returns on Education Loans',
  'maximizing-returns-education-loans',
  'Learn strategies for building a diversified portfolio of student loans and optimizing your investment returns.',
  'Full article content here...',
  'John Lee',
  'Investor Guide',
  7,
  false
),
(
  'DeFi Meets Education Finance',
  'defi-meets-education-finance',
  'Exploring how decentralized finance principles are transforming traditional education lending models.',
  'Full article content here...',
  'Emma Park',
  'DeFi',
  5,
  false
),
(
  'From Funded Student to Graduate',
  'from-funded-student-to-graduate',
  'Meet Sarah, who funded her Master''s degree through MintEdu and is now thriving in her tech career.',
  'Full article content here...',
  'MintEdu Team',
  'Success Stories',
  8,
  false
),
(
  'How We Keep Your Data Safe',
  'how-we-keep-data-safe',
  'An overview of our security measures and how Hedera''s aBFT consensus ensures transaction integrity.',
  'Full article content here...',
  'David Wang',
  'Security',
  6,
  false
);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE profiles 
ADD COLUMN full_name TEXT,
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN phone TEXT,
ADD COLUMN country TEXT,
ADD COLUMN date_of_birth DATE;
