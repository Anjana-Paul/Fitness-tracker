import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-data.model";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {


  constructor(private router: Router ,
     private afAuth :AngularFireAuth,
     private trainingService: TrainingService,
     private uiService: UIService,
     private store: Store<fromRoot.State>
     ){}

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
      if( user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData){
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.SendVerificationMail(); // Sending email verification notification, when new user registers
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      // this.afAuth.sendSignInLinkToEmail(formData["email"]);
    })
    .catch(error => {
     // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000)
    });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  login(authData : AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
        this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
    //  this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
      this.uiService.showSnackbar(error.message, null, 3000)
    });
  }

  //Reset Password Function
  // ForgotPassword(passwordResetEmail) {
  //   return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  //   .then(() => {
  //     window.alert('Password reset email sent, check your inbox.');
  //   }).catch((error) => {
  //     window.alert(error);
  //   });
  // }

  logout(){
    this.afAuth.auth.signOut();
  }
}





// time < timestamp.date(2021, 10, 20);
