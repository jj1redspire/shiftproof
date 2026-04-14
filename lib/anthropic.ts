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

export async function structureVoiceNote(
  zoneName: string,
  transcript: string
): Promise<ZoneConditionResult> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a facility condition documentation assistant for a bar/nightclub.
The user has just recorded a voice observation about the following zone: ${zoneName}.

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
