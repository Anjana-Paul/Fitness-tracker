import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations:[
    SignupComponent,
    LoginComponent
  ],
  imports:[
    AngularFireAuthModule,
    SharedModule
  ]
})
export class AuthModule {}
