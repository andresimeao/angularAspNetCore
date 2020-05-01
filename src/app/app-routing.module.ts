import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [

  //route default
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: "login", component: LoginComponent },

  { path: "product", component: ProductComponent, canActivate: [AuthGuardService]},

  {path: "update/:id", component: ProductUpdateComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
