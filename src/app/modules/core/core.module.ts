import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
