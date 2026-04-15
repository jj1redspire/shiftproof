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
  ...RESTAURANT_ZONES,
  {
    name: 'Dance Floor / Stage',
    category: 'entertainment',
    sort_order: 11,
    checkpoints: ['Floor surface condition', 'Stage surface', 'DJ booth', 'Speakers / monitors', 'Lighting rigs', 'Railings / barriers', 'Electrical outlets'],
  },
]

// ─── SALON / BARBERSHOP ZONES ─────────────────────────────────────────────────

export const SALON_ZONES: ZoneTemplate[] = [
  {
    name: 'Reception / Waiting Area',
    category: 'reception',
    sort_order: 1,
    checkpoints: [
      'Seating condition (fabric, frame, cushions)',
      'Floor condition (stains, damage, trip hazards)',
      'Front desk / check-in counter',
      'Retail display shelving and product condition',
      'Magazine rack / reading material area',
      'Lighting fixtures',
      'Windows / glass (cleanliness, cracks)',
      'Ceiling (water stains, damage)',
    ],
  },
  {
    name: 'Styling Stations',
    category: 'salon-floor',
    sort_order: 2,
    checkpoints: [
      'Station mirrors (cracks, mounting)',
      'Styling chairs (hydraulics, upholstery tears, base)',
      'Countertops (staining, chemical damage, burns)',
      'Tool storage / drawer condition',
      'Electrical outlets at each station',
      'Floor around stations (chemical staining, damage)',
      'Wall surfaces behind stations',
      'Lighting above stations',
      'Chair mat / anti-fatigue mat condition',
    ],
  },
  {
    name: 'Shampoo / Wash Area',
    category: 'salon-floor',
    sort_order: 3,
    checkpoints: [
      'Shampoo bowls (cracks, staining, hardware)',
      'Plumbing connections (drips, leaks under bowls)',
      'Floor drainage (flow, clogging)',
      'Anti-slip mats (placement, condition)',
      'Ceiling above bowls (water damage, staining)',
      'Wall tile / surfaces (grout, mold)',
      'Towel storage / dispenser',
      'Chair / recline mechanism',
    ],
  },
  {
    name: 'Color Mixing / Chemical Storage',
    category: 'chemical',
    sort_order: 4,
    checkpoints: [
      'Ventilation (fan operation, airflow)',
      'Cabinet locks (secured, functional)',
      'Chemical labeling (all containers properly labeled)',
      'Counter surfaces (staining, chemical damage)',
      'Color staining on walls / floors',
      'SDS / MSDS binder present and accessible',
      'No expired products visible',
      'Spill kit present and stocked',
      'Sink / rinse station condition',
    ],
  },
  {
    name: 'Restrooms',
    category: 'restroom',
    sort_order: 5,
    checkpoints: [
      'Toilets / fixtures',
      'Sinks / faucets',
      'Mirrors',
      'Soap / paper dispensers',
      'Floor condition',
      'Wall tiles / surfaces',
      'Stall doors / locks',
      'Exhaust fan',
      'Lighting',
    ],
  },
  {
    name: 'Break Room / Storage',
    category: 'back-of-house',
    sort_order: 6,
    checkpoints: [
      'Inventory / supply shelving condition',
      'Product storage organization',
      'Employee lockers / cubbies',
      'Electrical panel access',
      'HVAC / mechanical',
      'Ceiling / walls',
      'Fire extinguisher (inspected tag)',
      'Exit route clear',
    ],
  },
  {
    name: 'Exterior / Signage',
    category: 'exterior',
    sort_order: 7,
    checkpoints: [
      'Storefront glass / windows',
      'Front door and hardware',
      'Sidewalk / entry path (trip hazards)',
      'Parking area condition',
      'Exterior signage (illumination, condition)',
      'Signage lighting',
      'Building exterior walls',
      'Accessibility path (ramp, door width)',
    ],
  },
]

// ─── SPA / NAIL SALON ZONES ───────────────────────────────────────────────────

export const SPA_ZONES: ZoneTemplate[] = [
  {
    name: 'Reception / Waiting Area',
    category: 'reception',
    sort_order: 1,
    checkpoints: [
      'Seating condition (fabric, frame, cushions)',
      'Floor condition (stains, damage, trip hazards)',
      'Front desk / check-in counter',
      'Retail display shelving and product condition',
      'Lighting fixtures',
      'Windows / glass (cleanliness, cracks)',
      'Ceiling (water stains, damage)',
    ],
  },
  {
    name: 'Nail Stations',
    category: 'salon-floor',
    sort_order: 2,
    checkpoints: [
      'Station tables (surface condition, chemical staining)',
      'Client chairs (cushions, stability)',
      'Technician seating',
      'Ventilation / nail dust extraction',
      'Electrical outlets at each station',
      'Floor around stations (chemical staining)',
      'Lighting above stations',
    ],
  },
  {
    name: 'Pedicure Area',
    category: 'salon-floor',
    sort_order: 3,
    checkpoints: [
      'Pedicure chairs / tubs (liner condition, jets, plumbing)',
      'Floor drainage',
      'Anti-slip mats',
      'Floor surface (water damage, staining)',
      'Plumbing under chairs (leaks)',
      'Ceiling above area (moisture, staining)',
    ],
  },
  {
    name: 'Treatment Rooms',
    category: 'treatment',
    sort_order: 4,
    checkpoints: [
      'Treatment table / bed condition',
      'Floor condition',
      'Wall surfaces',
      'Lighting / dimmer',
      'Electrical outlets',
      'HVAC vent / air quality',
      'Door / privacy latch',
    ],
  },
  {
    name: 'Chemical / Product Storage',
    category: 'chemical',
    sort_order: 5,
    checkpoints: [
      'Ventilation (fan operation)',
      'Cabinet locks (secured)',
      'Chemical labeling (all containers)',
      'Counter surfaces (staining, damage)',
      'SDS / MSDS binder accessible',
      'No expired products',
      'Spill kit present',
    ],
  },
  {
    name: 'Sterilization / Sanitation Area',
    category: 'sanitation',
    sort_order: 6,
    checkpoints: [
      'Autoclave / UV sterilizer condition',
      'Implement soaking containers',
      'Sharps disposal container (proper, sealed)',
      'Barrier precaution supplies stocked (gloves, masks)',
      'Sanitation log posted and current',
      'Clean vs. dirty implement separation',
    ],
  },
  {
    name: 'Restrooms',
    category: 'restroom',
    sort_order: 7,
    checkpoints: ['Toilets / fixtures', 'Sinks / faucets', 'Mirrors', 'Soap / paper dispensers', 'Floor condition', 'Wall tiles / surfaces', 'Stall doors / locks', 'Exhaust fan', 'Lighting'],
  },
  {
    name: 'Break Room / Storage',
    category: 'back-of-house',
    sort_order: 8,
    checkpoints: ['Inventory / supply shelving', 'Product storage', 'Employee lockers', 'Electrical panel', 'HVAC / mechanical', 'Fire extinguisher', 'Exit route clear'],
  },
  {
    name: 'Exterior / Signage',
    category: 'exterior',
    sort_order: 9,
    checkpoints: ['Storefront glass', 'Front door and hardware', 'Sidewalk / entry path', 'Parking area', 'Exterior signage / lighting', 'Building exterior', 'Accessibility path'],
  },
]

// ─── LEGACY EXPORT (backward compat) ─────────────────────────────────────────

export const DEFAULT_ZONES = BAR_ZONES

// ─── ZONE RESOLVER ────────────────────────────────────────────────────────────

export function getZonesForBusinessType(type: string): ZoneTemplate[] {
  switch (type) {
    case 'restaurant':
      return RESTAURANT_ZONES
    case 'bar_and_restaurant':
      return BAR_AND_RESTAURANT_ZONES
    case 'salon':
    case 'barbershop':
      return SALON_ZONES
    case 'spa':
    case 'nail_salon':
      return SPA_ZONES
    case 'bar':
    case 'nightclub':
    case 'lounge':
    case 'brewery':
      return BAR_ZONES
    default:
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
  salon: 'Salon / Barbershop',
  spa: 'Spa / Nail Salon',
  other: 'Other',
}

// Business types that use salon-specific AI prompts
export const SALON_BUSINESS_TYPES = new Set(['salon', 'barbershop', 'spa', 'nail_salon'])
