import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() me: SharedModule) {
    if (me) {
      throw new Error('Shared Module should only be imported once');
    }
  }
}
