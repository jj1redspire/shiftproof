-- ============================================================
-- ShiftProof Migration 002 — Add business_type to locations
-- Run in Supabase SQL editor at:
-- https://supabase.com/dashboard/project/pmixyehszvattjywllsr/sql
--
-- NOTE: The correct table name is shiftproof_locations.
-- The build spec referenced sp2_locations — that was a naming
-- discrepancy. The live table uses the shiftproof_ prefix.
-- ============================================================

ALTER TABLE shiftproof_locations
  ADD COLUMN IF NOT EXISTS business_type TEXT DEFAULT 'bar';

-- Backfill from the existing `type` column for any existing rows
UPDATE shiftproof_locations
  SET business_type = type
  WHERE business_type IS NULL AND type IS NOT NULL;

-- Add RLS policies for INSERT / UPDATE / DELETE that were missing
-- from the initial migration (which only had SELECT)

CREATE POLICY IF NOT EXISTS "shiftproof_locations_insert" ON shiftproof_locations
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_locations_update" ON shiftproof_locations
  FOR UPDATE USING (auth.uid()::TEXT = user_id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_locations_delete" ON shiftproof_locations
  FOR DELETE USING (auth.uid()::TEXT = user_id::TEXT);

-- Zones RLS (missing from initial migration)
CREATE POLICY IF NOT EXISTS "shiftproof_zones_select" ON shiftproof_zones
  FOR SELECT USING (
    location_id IN (
      SELECT id FROM shiftproof_locations WHERE auth.uid()::TEXT = user_id::TEXT
    )
  );

CREATE POLICY IF NOT EXISTS "shiftproof_zones_insert" ON shiftproof_zones
  FOR INSERT WITH CHECK (
    location_id IN (
      SELECT id FROM shiftproof_locations WHERE auth.uid()::TEXT = user_id::TEXT
    )
  );

CREATE POLICY IF NOT EXISTS "shiftproof_zones_update" ON shiftproof_zones
  FOR UPDATE USING (
    location_id IN (
      SELECT id FROM shiftproof_locations WHERE auth.uid()::TEXT = user_id::TEXT
    )
  );

-- Reports RLS (missing INSERT/UPDATE from initial migration)
CREATE POLICY IF NOT EXISTS "shiftproof_reports_insert" ON shiftproof_reports
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_reports_update" ON shiftproof_reports
  FOR UPDATE USING (auth.uid()::TEXT = user_id::TEXT);

-- Users RLS (missing INSERT/UPDATE from initial migration)
CREATE POLICY IF NOT EXISTS "shiftproof_users_insert" ON shiftproof_users
  FOR INSERT WITH CHECK (auth.uid()::TEXT = id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_users_update" ON shiftproof_users
  FOR UPDATE USING (auth.uid()::TEXT = id::TEXT);

-- Subscriptions RLS
CREATE POLICY IF NOT EXISTS "shiftproof_subscriptions_select" ON shiftproof_subscriptions
  FOR SELECT USING (auth.uid()::TEXT = user_id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_subscriptions_insert" ON shiftproof_subscriptions
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id::TEXT);

CREATE POLICY IF NOT EXISTS "shiftproof_subscriptions_update" ON shiftproof_subscriptions
  FOR UPDATE USING (auth.uid()::TEXT = user_id::TEXT);
