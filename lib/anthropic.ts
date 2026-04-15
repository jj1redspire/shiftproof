import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface ZoneConditionResult {
  condition_items: Array<{
    item: string
    severity: 'normal' | 'attention' | 'urgent'
    is_preexisting: boolean
    notes: string
  }>
  new_damage: Array<{
    description: string
    severity: 'minor' | 'moderate' | 'severe'
    location_within_zone: string
  }>
  maintenance_items: Array<{
    description: string
    priority: 'low' | 'medium' | 'high'
  }>
  overall_rating: 'good' | 'fair' | 'poor'
  summary: string
}

// Returns business-type-specific context injected into the AI prompt.
// This drives vertical-specific severity logic and compliance flags
// without changing the output schema.
function getBusinessTypeContext(businessType: string): string {
  const isSalon = ['salon', 'barbershop', 'spa', 'nail_salon'].includes(businessType)
  const isRestaurant = ['restaurant', 'bar_and_restaurant'].includes(businessType)
  const isRetail = ['retail', 'boutique'].includes(businessType)

  if (isRetail) {
    return `
This is a retail store or boutique facility. Apply these additional rules:

SECURITY / LOSS PREVENTION — Flag as urgent if the user mentions:
- Security cameras not operational (interior or exterior)
- Display cases unlocked or glass damaged
- EAS/security tag system not functioning
- Back door / loading dock not secured or lock damaged
- Safe access compromised

Flag as attention:
- Security camera aimed incorrectly or field of view blocked
- Display case lock stiff or intermittent
- Stockroom door seal worn

ADA / ACCESSIBILITY COMPLIANCE — Flag as attention if the user mentions:
- Entry ramp cracked, uneven, or obstructed
- Accessible parking spaces blocked or markings faded
- Restroom door not fully openable, or grab bars damaged
- Aisles obstructed with displays below 36-inch clear width

SLIP-AND-FALL PRIORITY ZONES:
- Entrance / mat area: wet floor, curled mat, uneven threshold → urgent
- Main sales floor: aisle blockage from display, broken fixture on floor → urgent
- Fitting rooms: broken hook at eye level, poor lighting → attention

INVENTORY / LEASE PROTECTION:
- Note any damage to custom fixtures, display walls, built-in shelving, or specialty lighting
- Flag as attention — these are the surfaces landlords claim at lease end
`
  }

  if (isSalon) {
    return `
This is a salon / barbershop / spa facility. Apply these additional rules:

CHEMICAL STORAGE COMPLIANCE — Flag as urgent if the user mentions:
- Unlocked chemical cabinets or unsecured chemical storage
- Unlabeled containers or missing product labels
- Missing or inaccessible SDS/MSDS binder
- Expired products in active use
- Chemical spills not cleaned up
- Poor or non-functioning ventilation in the color/chemical area
Flag as attention: any staining from chemicals on surfaces that could be evidence of ongoing damage.

STATE COSMETOLOGY BOARD ITEMS — Flag as attention if the user mentions:
- Sanitation logs not posted or not current
- Implements not properly sterilized or sorted (clean vs. dirty)
- Towels / capes not properly stored
- Sterilizer/autoclave not functioning or not logged
- Client intake/consent records disorganized

OSHA BLOODBORNE PATHOGENS (barbershops, nail salons) — Flag as urgent if:
- Sharps disposal container missing, full, or unsealed
- No barrier precaution supplies (gloves, masks) stocked
- No visible spill cleanup kit in chemical or treatment areas

SLIP-AND-FALL PRIORITY ZONES:
- Shampoo bowl area: wet floor, missing anti-slip mats → urgent
- Pedicure area: standing water, drainage issues → urgent
- Color area: chemical spills on floor → attention
`
  }

  if (isRestaurant) {
    return `
This is a restaurant facility. Apply these additional rules:

HEALTH INSPECTION ITEMS — Flag as attention if the user mentions:
- Grease trap access covers displaced or overflow signs
- Hood/ventilation not functioning or grease buildup visible
- Walk-in cooler door seals worn or not sealing
- Floor drains slow or backing up
- Refrigeration units not closing properly
- Fire suppression nozzles disturbed or tags expired

SLIP-AND-FALL PRIORITY:
- Wet floors without signage → urgent
- Uneven pavers or cracked flooring in dining or patio → attention
- Worn or displaced floor mats → attention
`
  }

  // Default: bar/nightclub
  return `This is a bar or nightclub facility.`
}

export async function structureVoiceNote(
  zoneName: string,
  transcript: string,
  businessType = 'bar'
): Promise<ZoneConditionResult> {
  const businessContext = getBusinessTypeContext(businessType)

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a facility condition documentation assistant.
The user has just recorded a voice observation about the following zone: ${zoneName}.

${businessContext}

Voice observation: "${transcript}"

Transcribe and structure their observations into JSON with this exact structure:
{
  "condition_items": [
    { "item": "description of what was observed", "severity": "normal|attention|urgent", "is_preexisting": boolean, "notes": "any extra context" }
  ],
  "new_damage": [
    { "description": "damage description", "severity": "minor|moderate|severe", "location_within_zone": "where in the zone" }
  ],
  "maintenance_items": [
    { "description": "what needs repair/follow-up", "priority": "low|medium|high" }
  ],
  "overall_rating": "good|fair|poor",
  "summary": "1-2 sentence plain English summary of zone condition"
}

Rules:
- Be specific. Use the exact descriptions the user gives.
- Do not add observations they didn't make.
- If they mention something is "pre-existing" or "unchanged," set is_preexisting: true.
- If the observation is vague (e.g. "looks fine"), return overall_rating: "good" with a single normal condition_item.
- Apply the business-type severity rules above when relevant.
- Return ONLY valid JSON, no markdown, no explanation.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  return JSON.parse(content.text) as ZoneConditionResult
}

export async function compareReports(
  locationName: string,
  report1: { date: string; zone_data: Record<string, unknown> },
  report2: { date: string; zone_data: Record<string, unknown> }
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are a facility condition analyst. Compare these two daily condition reports for ${locationName} and highlight what changed.

Report 1 (${report1.date}):
${JSON.stringify(report1.zone_data, null, 2)}

Report 2 (${report2.date}):
${JSON.stringify(report2.zone_data, null, 2)}

Provide a plain English comparison that:
1. Lists new damage that appeared between the two dates
2. Lists damage that was resolved
3. Notes any zones that significantly changed condition (good → poor, etc.)
4. Gives an overall assessment of whether conditions improved, declined, or stayed the same

Keep it concise and factual. This may be used as legal documentation.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')
  return content.text
}
