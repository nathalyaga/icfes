import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionproductosComponent } from './components/gestionproductos/gestionproductos.component';

const routes: Routes = [
  {
    path: '',
    component: GestionproductosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
