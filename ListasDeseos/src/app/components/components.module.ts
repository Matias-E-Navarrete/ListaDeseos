import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { DetalleComponent } from './detalle/detalle.component';
import { FiltroPipe } from '../pipes/filtro.pipe';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [ListasComponent, DetalleComponent],
  exports: [ListasComponent, DetalleComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    
  ]
})
export class ComponentsModule { }
