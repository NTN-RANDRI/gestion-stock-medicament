import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  public toThreeNumbers(value: number | string) {
    const num = typeof value === 'string' ? parseInt(value) : value;
    return isNaN(num) ? '000' : num.toString().padStart(3, '0');
  }

  public toDateTime(value: Date): string {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) return 'Format invalide';

    // Extraction des composants
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  public toText(value: string): string {
    if(!value) return '';

    return value
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

}
