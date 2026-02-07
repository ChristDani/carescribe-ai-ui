/**
 * Formatea una fecha a un formato legible
 * @param date - La fecha a formatear (Date o string)
 * @param format - Formato deseado (ej: 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD')
 * @returns Fecha formateada como string
 */
export function formatDate(date: Date | string, format: string = 'DD/MM/YYYY hh:mm:ss AM/PM'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
  const hours12 = String(hours % 12 || 12).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  const formatMap: { [key: string]: string } = {
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
    'DD/MM/YYYY HH:mm': `${day}/${month}/${year} ${hours12}:${minutes}`,
    'DD/MM/YYYY HH:mm:ss': `${day}/${month}/${year} ${hours12}:${minutes}:${seconds}`,
    'DD/MM/YYYY hh:mm AM/PM': `${day}/${month}/${year} ${hours12}:${minutes} ${ampm}`,
    'DD/MM/YYYY hh:mm:ss AM/PM': `${day}/${month}/${year} ${hours12}:${minutes}:${seconds} ${ampm}`,
  };

  return formatMap[format] || formatMap['DD/MM/YYYY'];
}
