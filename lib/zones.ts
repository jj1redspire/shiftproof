export interface ZoneTemplate {
  name: string
  category: string
  checkpoints: string[]
  sort_order: number
}

export const DEFAULT_ZONES: ZoneTemplate[] = [
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

export function getZonesForBusinessType(type: string): ZoneTemplate[] {
  const base = DEFAULT_ZONES.filter(z => z.category !== 'kitchen')
  if (['bar', 'nightclub', 'lounge', 'brewery'].includes(type)) {
    return DEFAULT_ZONES
  }
  return base
}
