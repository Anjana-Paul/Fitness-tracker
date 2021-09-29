import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading$ = new Observable<boolean>();

  constructor(
       private authService : AuthService,
       private uiService: UIService,
       private store: Store<fromRoot.State>
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
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
}
