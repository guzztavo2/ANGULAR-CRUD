import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacaoComponent } from './views/informacao/informacao.component';

const routes: Routes = [{path:'', component:InformacaoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
