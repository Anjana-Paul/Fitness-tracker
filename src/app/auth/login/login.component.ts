import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading$ = new Observable<boolean>();
  private loadingSubs : Subscription;

  constructor(
       private authService : AuthService,
       private uiService: UIService,
       private store: Store<{ui: fromApp.State}>
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.store.subscribe(data => console.log(data));
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    // this.isLoading  = isLoading;
    // })
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password : form.value.password
    });
  }

  ngOnDestroy(){
    if(this.loadingSubs){
    this.loadingSubs.unsubscribe();
    }
  }
}
