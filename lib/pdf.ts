import jsPDF from 'jspdf'

interface ZoneData {
  zone_name: string
  overall_rating?: string
  summary?: string
  condition_items?: Array<{ item: string; severity: string; notes?: string }>
  new_damage?: Array<{ description: string; severity: string }>
  maintenance_items?: Array<{ description: string; priority: string }>
}

interface ReportData {
  id: string
  shift_date: string
  report_type: string
  location_name: string
  business_name: string
  zone_data: Record<string, ZoneData>
  ai_summary?: string
  overall_score?: number
  completed_at?: string
}

function getRatingColor(rating: string): [number, number, number] {
  switch (rating) {
    case 'good': return [22, 163, 74]
    case 'fair': return [234, 179, 8]
    case 'poor': return [220, 38, 38]
    default: return [100, 100, 100]
  }
}

export function generateReportPDF(report: ReportData): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 20

  // Header bar
  doc.setFillColor(26, 26, 46)
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setTextColor(240, 165, 0)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('SHIFTPROOF', margin, 18)

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Daily Facility Condition Report', margin, 27)
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 34)

  y = 55

  // Report metadata
  doc.setTextColor(26, 26, 46)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(report.business_name, margin, y)
  y += 7

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 80)
  doc.text(`Location: ${report.location_name}`, margin, y)
  y += 6
  doc.text(`Date: ${report.shift_date}`, margin, y)
  y += 6
  doc.text(`Report Type: ${report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)} Walkthrough`, margin, y)
  if (report.overall_score) {
    y += 6
    doc.text(`Overall Condition Score: ${report.overall_score}/10`, margin, y)
  }
  y += 10

  // Divider
  doc.setDrawColor(200, 200, 220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  // AI Summary
  if (report.ai_summary) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(26, 26, 46)
    doc.text('Executive Summary', margin, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 80)
    const summaryLines = doc.splitTextToSize(report.ai_summary, contentWidth)
    doc.text(summaryLines, margin, y)
    y += summaryLines.length * 5 + 8

    doc.setDrawColor(200, 200, 220)
    doc.line(margin, y, pageWidth - margin, y)
    y += 8
  }

  // Zone reports
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(26, 26, 46)
  doc.text('Zone-by-Zone Condition Report', margin, y)
  y += 8

  const zones = Object.values(report.zone_data)
  for (const zone of zones) {
    if (y > 240) {
      doc.addPage()
      y = 20
    }

    // Zone header
    const [r, g, b] = getRatingColor(zone.overall_rating || 'good')
    doc.setFillColor(r, g, b)
    doc.roundedRect(margin, y - 4, contentWidth, 10, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(zone.zone_name, margin + 3, y + 3)
    doc.text(
      (zone.overall_rating || 'good').toUpperCase(),
      pageWidth - margin - 3,
      y + 3,
      { align: 'right' }
    )
    y += 12

    if (zone.summary) {
      doc.setTextColor(60, 60, 80)
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9)
      const lines = doc.splitTextToSize(zone.summary, contentWidth)
      doc.text(lines, margin + 2, y)
      y += lines.length * 4 + 4
    }

    // Condition items
    if (zone.condition_items && zone.condition_items.length > 0) {
      for (const item of zone.condition_items) {
        if (y > 260) { doc.addPage(); y = 20 }
        const dot = item.severity === 'urgent' ? '⚠' : item.severity === 'attention' ? '→' : '✓'
        doc.setTextColor(60, 60, 80)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        const text = `${dot} ${item.item}${item.notes ? ` — ${item.notes}` : ''}`
        const itemLines = doc.splitTextToSize(text, contentWidth - 4)
        doc.text(itemLines, margin + 4, y)
        y += itemLines.length * 4 + 2
      }
    }

    // New damage
    if (zone.new_damage && zone.new_damage.length > 0) {
      y += 2
      doc.setTextColor(220, 38, 38)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text('NEW DAMAGE:', margin + 2, y)
      y += 4
      for (const dmg of zone.new_damage) {
        if (y > 260) { doc.addPage(); y = 20 }
        doc.setFont('helvetica', 'normal')
        const text = `• ${dmg.description} [${dmg.severity}]`
        const lines = doc.splitTextToSize(text, contentWidth - 6)
        doc.text(lines, margin + 6, y)
        y += lines.length * 4 + 2
      }
    }

    // Maintenance
    if (zone.maintenance_items && zone.maintenance_items.length > 0) {
      y += 2
      doc.setTextColor(234, 179, 8)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text('MAINTENANCE:', margin + 2, y)
      y += 4
      for (const maint of zone.maintenance_items) {
        if (y > 260) { doc.addPage(); y = 20 }
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(60, 60, 80)
        const text = `• ${maint.description} [${maint.priority} priority]`
        const lines = doc.splitTextToSize(text, contentWidth - 6)
        doc.text(lines, margin + 6, y)
        y += lines.length * 4 + 2
      }
    }

    y += 6
  }

  // Footer on last page
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFillColor(26, 26, 46)
    doc.rect(0, doc.internal.pageSize.getHeight() - 15, pageWidth, 15, 'F')
    doc.setTextColor(150, 150, 170)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `This report was generated by ShiftProof daily condition documentation system | shiftproof.io | Report ID: ${report.id}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' }
    )
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 5, { align: 'right' })
  }

  return doc
}
