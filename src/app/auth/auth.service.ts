import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-data.model";
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router ,
     private afAuth :AngularFireAuth,
     private trainingService: TrainingService,
     private uiService: UIService,
     private store: Store<{ui: fromApp.State}>
     ){}

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
      if( user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData){
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
    })
    .catch(error => {
     // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
      this.uiService.showSnackbar(error.message, null, 3000)
    });
  }

  login(authData : AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(error => {
    //  this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
      this.uiService.showSnackbar(error.message, null, 3000)
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}





// time < timestamp.date(2021, 10, 20);
