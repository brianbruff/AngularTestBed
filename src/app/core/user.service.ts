import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userName = new BehaviorSubject('Brian');
  public  $userName = this.userName.asObservable();

  constructor() { }
}
