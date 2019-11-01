import {Component, OnInit} from '@angular/core';
import {UserService} from './core/user.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestMods';
  user = 'not loaded';

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.$userName.pipe(
     delay(2000)
    ).subscribe(x => this.user = x);
  }
}
