import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() me: CoreModule) {
    if (me) {
      throw new Error('Core module should only be imported once');
    }
  }
}
