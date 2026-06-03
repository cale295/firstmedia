-- Database migration script to support multiple package categories and enforce unique popular package.
-- Run this script in the Supabase SQL Editor.

-- 1. Add the category column with a default of 'internet_only' if it doesn't already exist
ALTER TABLE packages ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'internet_only';

-- 2. Add check constraint to restrict category values
ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_category_check;
ALTER TABLE packages ADD CONSTRAINT packages_category_check CHECK (category IN ('internet_only', 'internet_tv'));

-- 3. Cleanup existing duplicates of is_popular (ensure at most one is true)
-- This query keeps the most recently updated popular package (or fallback to id order) and sets others to false
WITH ranked_popular AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC, created_at DESC) as rn
  FROM packages
  WHERE is_popular = true
)
UPDATE packages
SET is_popular = false
WHERE id IN (SELECT id FROM ranked_popular WHERE rn > 1);

-- 4. Enforce that only one package can be marked as is_popular = true at the database level
DROP INDEX IF EXISTS unique_popular_package;
CREATE UNIQUE INDEX unique_popular_package ON packages (is_popular) WHERE (is_popular = true);
