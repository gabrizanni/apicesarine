// ICS file generator for workshop booking confirmation
import { format } from 'date-fns';

interface WorkshopICSData {
  workshopTitle: string;
  organization: string;
  date: Date;
  duration: number; // in minutes
  location?: string;
  description?: string;
  requesterName: string;
  requesterEmail: string;
}

export const generateICSFile = (data: WorkshopICSData): string => {
  const startDate = data.date;
  const endDate = new Date(startDate.getTime() + data.duration * 60000);
  
  // Format dates for ICS (YYYYMMDDTHHMMSSZ format)
  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateFormatted = formatICSDate(startDate);
  const endDateFormatted = formatICSDate(endDate);
  const now = formatICSDate(new Date());
  
  // Generate unique UID
  const uid = `workshop-${Date.now()}@apicoltura-edu.com`;
  
  // ICS content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Apicoltura Educativa//Workshop Booking//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDateFormatted}`,
    `DTEND:${endDateFormatted}`,
    `SUMMARY:Laboratorio ${data.workshopTitle} - ${data.organization}`,
    `DESCRIPTION:Laboratorio di apicoltura educativa\\n\\nTitolo: ${data.workshopTitle}\\nOrganizzazione: ${data.organization}\\nRichiedente: ${data.requesterName}\\n\\n${data.description || 'Laboratorio esperienziale per scoprire il mondo delle api e dell\'apicoltura.'}`,
    `LOCATION:${data.location || data.organization}`,
    `ORGANIZER;CN="Apicoltura Educativa":mailto:info@apicoltura-edu.com`,
    `ATTENDEE;CN="${data.requesterName}";ROLE=REQ-PARTICIPANT:mailto:${data.requesterEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'PRIORITY:5',
    'CLASS:PUBLIC',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Promemoria: Laboratorio di apicoltura domani',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
};

export const downloadICSFile = (data: WorkshopICSData, filename?: string): void => {
  const icsContent = generateICSFile(data);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || `laboratorio-${data.organization.toLowerCase().replace(/\s+/g, '-')}-${format(data.date, 'yyyy-MM-dd')}.ics`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(link.href);
};