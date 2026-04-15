-- ============================================================
-- ShiftProof Migration 003 — Salon vertical support
-- Run AFTER 002_add_business_type.sql
-- Run in Supabase SQL editor at:
-- https://supabase.com/dashboard/project/pmixyehszvattjywllsr/sql
-- ============================================================

-- business_type column was added in migration 002.
-- This migration just extends the CHECK constraint comment
-- and adds the new valid values as documentation.
--
-- Valid business_type values after this migration:
--   bar, nightclub, lounge, brewery
--   restaurant, bar_and_restaurant
--   salon, barbershop, spa, nail_salon
--   other

-- No schema changes needed — business_type is free-text TEXT column.
-- New values are handled purely in application code.

-- Optional: add index on business_type for analytics queries
CREATE INDEX IF NOT EXISTS idx_shiftproof_locations_business_type
  ON shiftproof_locations(business_type);

-- Confirm the column exists (safe no-op if already present from migration 002)
ALTER TABLE shiftproof_locations
  ADD COLUMN IF NOT EXISTS business_type TEXT DEFAULT 'bar';
