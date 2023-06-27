import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [CoreComponent, MainComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule],
})
export class CoreModule {}
