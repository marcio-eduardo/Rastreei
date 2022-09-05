import { DatahoraPipe } from './datahora.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [DatahoraPipe],
  imports: [CommonModule],
  exports: [DatahoraPipe]
})
export class DatahoraPipeModule { }
