export interface ZoneTemplate {
  name: string
  category: string
  checkpoints: string[]
  sort_order: number
}

// ─── BAR / NIGHTCLUB ZONES ───────────────────────────────────────────────────

export const BAR_ZONES: ZoneTemplate[] = [
  {
    name: 'Entry / Vestibule',
    category: 'entry',
    sort_order: 1,
    checkpoints: ['Front door condition', 'Windows / glass', 'ID check area', 'Signage', 'Lighting', 'Floor mat', 'Ceiling condition'],
  },
  {
    name: 'Main Bar Area',
    category: 'bar',
    sort_order: 2,
    checkpoints: ['Bar top surface', 'Bar stools', 'Back bar shelving', 'Draft taps', 'Glassware', 'Under-bar refrigeration', 'Bar sink / drains', 'Speed rail', 'Ice machine'],
  },
  {
    name: 'Dance Floor / Stage',
    category: 'entertainment',
    sort_order: 3,
    checkpoints: ['Floor surface condition', 'Stage surface', 'DJ booth', 'Speakers / monitors', 'Lighting rigs', 'Smoke machine', 'Railings / barriers', 'Electrical outlets'],
  },
  {
    name: 'Seating / Lounge Area',
    category: 'seating',
    sort_order: 4,
    checkpoints: ['Booths / benches', 'Tables', 'Chairs / stools', 'Cushions / upholstery', 'Wall surfaces', 'Carpet / flooring', 'Decor / artwork', 'Lighting fixtures'],
  },
  {
    name: "Restrooms — Women's",
    category: 'restroom',
    sort_order: 5,
    checkpoints: ['Toilets / fixtures', 'Sinks / faucets', 'Mirrors', 'Soap / paper dispensers', 'Floor condition', 'Wall tiles / surfaces', 'Stall doors / locks', 'Exhaust fan', 'Lighting'],
  },
  {
    name: "Restrooms — Men's",
    category: 'restroom',
    sort_order: 6,
    checkpoints: ['Toilets / urinals / fixtures', 'Sinks / faucets', 'Mirrors', 'Soap / paper dispensers', 'Floor condition', 'Wall tiles / surfaces', 'Stall doors / locks', 'Exhaust fan', 'Lighting'],
  },
  {
    name: 'Kitchen / Food Prep',
    category: 'kitchen',
    sort_order: 7,
    checkpoints: ['Counter surfaces', 'Cooking equipment', 'Floor condition', 'Hood / ventilation', 'Refrigeration units', 'Sinks / drains', 'Storage shelving', 'Fire suppression system', 'Grease traps'],
  },
  {
    name: 'Patio / Outdoor Area',
    category: 'outdoor',
    sort_order: 8,
    checkpoints: ['Furniture condition', 'Fencing / railing', 'Patio heaters', 'Umbrellas', 'Surface / flooring', 'Lighting', 'Exterior walls', 'Drainage'],
  },
  {
    name: 'Parking Lot / Exterior',
    category: 'exterior',
    sort_order: 9,
    checkpoints: ['Pavement condition', 'Parking lot lighting', 'Signage', 'Dumpster area', 'Landscaping', 'Building exterior', 'Security cameras', 'Handicap access'],
  },
  {
    name: 'Storage / Office',
    category: 'back-of-house',
    sort_order: 10,
    checkpoints: ['Shelving / racks', 'Safe / valuables storage', 'Inventory area', 'Electrical panel', 'HVAC / mechanical', 'Ceiling / walls', 'Fire extinguishers', 'Exit routes'],
  },
]

// ─── RESTAURANT ZONES ────────────────────────────────────────────────────────

export const RESTAURANT_ZONES: ZoneTemplate[] = [
  {
    name: 'Host / Entry / Vestibule',
    category: 'entry',
    sort_order: 1,
    checkpoints: ['Host stand condition', 'Front door / hardware', 'Windows / glass', 'Signage', 'Wait area seating', 'Floor mat / entry surface', 'Lighting', 'Ceiling condition'],
  },
  {
    name: 'Dining Room — Main',
    category: 'dining',
    sort_order: 2,
    checkpoints: ['Tables (surface, stability, wobble)', 'Chairs (legs, cushions, upholstery)', 'Booths (cushions, table mounts, wall backing)', 'Floor condition (stains, damage, trip hazards)', 'Wall surfaces (scuffs, cracks, paint)', 'Lighting fixtures', 'Ceiling (tiles, stains, fixtures)', 'Window coverings / blinds'],
  },
  {
    name: 'Dining Room — Private / Event Space',
    category: 'dining',
    sort_order: 3,
    checkpoints: ['Partition walls / dividers', 'AV equipment (projector, screen, speakers)', 'Tables and chairs', 'Floor condition', 'Lighting / dimmers', 'Electrical outlets', 'HVAC vents'],
  },
  {
    name: 'Bar Area',
    category: 'bar',
    sort_order: 4,
    checkpoints: ['Bar top surface', 'Bar stools', 'Back bar shelving', 'Draft taps', 'Glassware', 'Under-bar refrigeration', 'Bar sink / drains', 'Speed rail', 'Ice machine'],
  },
  {
    name: 'Kitchen',
    category: 'kitchen',
    sort_order: 5,
    checkpoints: [
      'Floor condition (grease, damage, non-slip surface)',
      'Wall surfaces (grease, damage, tile integrity)',
      'Prep surface condition (cutting boards, counters)',
      'Cooking equipment exterior (range, fryer, oven)',
      'Hood / ventilation system',
      'Grease traps (access covers, overflow signs)',
      'Walk-in cooler door seals',
      'Refrigeration unit seals and door closures',
      'Sinks / hand-wash stations',
      'Fire suppression system (nozzles, tags)',
      'Floor drains (clear, no standing water)',
    ],
  },
  {
    name: "Restrooms — Women's",
    category: 'restroom',
    sort_order: 6,
    checkpoints: ['Toilets / fixtures', 'Sinks / faucets', 'Mirrors', 'Soap / paper dispensers', 'Floor condition', 'Wall tiles / surfaces', 'Stall doors / locks', 'Exhaust fan', 'Lighting'],
  },
  {
    name: "Restrooms — Men's",
    category: 'restroom',
    sort_order: 7,
    checkpoints: ['Toilets / urinals / fixtures', 'Sinks / faucets', 'Mirrors', 'Soap / paper dispensers', 'Floor condition', 'Wall tiles / surfaces', 'Stall doors / locks', 'Exhaust fan', 'Lighting'],
  },
  {
    name: 'Patio / Outdoor Dining',
    category: 'outdoor',
    sort_order: 8,
    checkpoints: ['Furniture condition (tables, chairs)', 'Fencing / railing', 'Patio heaters', 'Umbrellas and bases', 'Surface / pavers / decking (trip hazards)', 'String lighting / overhead fixtures', 'Drainage', 'Exterior walls / planters'],
  },
  {
    name: 'Parking Lot / Exterior',
    category: 'exterior',
    sort_order: 9,
    checkpoints: ['Pavement condition (potholes, cracks)', 'Parking lot lighting', 'Signage (directional, hours)', 'Dumpster area / enclosure', 'Landscaping', 'Building exterior', 'Security cameras', 'ADA parking spaces and path-of-travel'],
  },
  {
    name: 'Storage / Office / Break Room',
    category: 'back-of-house',
    sort_order: 10,
    checkpoints: ['Dry storage shelving', 'Inventory area organization', 'Employee lockers / cubbies', 'Electrical panel', 'HVAC / mechanical access', 'Ceiling / walls', 'Fire extinguishers (inspected tags)', 'Exit routes / emergency lighting'],
  },
]

// ─── COMBINED BAR + RESTAURANT ────────────────────────────────────────────────

export const BAR_AND_RESTAURANT_ZONES: ZoneTemplate[] = [
  // Starts with restaurant zones but adds entertainment zones from bar set
  ...RESTAURANT_ZONES,
  {
    name: 'Dance Floor / Stage',
    category: 'entertainment',
    sort_order: 11,
    checkpoints: ['Floor surface condition', 'Stage surface', 'DJ booth', 'Speakers / monitors', 'Lighting rigs', 'Railings / barriers', 'Electrical outlets'],
  },
]

// ─── LEGACY EXPORT (backward compat — used by existing onboarding) ────────────

export const DEFAULT_ZONES = BAR_ZONES

// ─── ZONE RESOLVER ────────────────────────────────────────────────────────────

export function getZonesForBusinessType(type: string): ZoneTemplate[] {
  switch (type) {
    case 'restaurant':
      return RESTAURANT_ZONES
    case 'bar_and_restaurant':
      return BAR_AND_RESTAURANT_ZONES
    case 'bar':
    case 'nightclub':
    case 'lounge':
    case 'brewery':
      return BAR_ZONES
    default:
      // 'other' or unknown: return bar zones as a sensible default
      return BAR_ZONES
  }
}

export const BUSINESS_TYPE_LABELS: Record<string, string> = {
  bar: 'Bar',
  nightclub: 'Nightclub',
  lounge: 'Lounge',
  brewery: 'Brewery Taproom',
  restaurant: 'Restaurant',
  bar_and_restaurant: 'Bar & Restaurant',
  other: 'Other',
}
