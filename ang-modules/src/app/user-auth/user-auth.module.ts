import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';


/**
to generate a module: ng generate module name-of-module
to generate a component in the module: ng generate component name-of-module/name-of-component


 Make sure to add the components you want to use elsewhere into the exports array 

 */ 

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoginComponent
  ]
})
export class UserAuthModule { }
