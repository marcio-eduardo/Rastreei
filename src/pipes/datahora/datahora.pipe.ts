import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/';

@Pipe({
  name: 'datahora'
})
export class DatahoraPipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      return moment(value).format('DD/MM/YYYY - HH:mm:ss');
    } else { return value; }
  }
}
