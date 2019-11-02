import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        MatCardModule
    ],
    declarations: [
        PopoverComponent
    ],
    exports: [],
    entryComponents: [
        PopoverComponent
    ]
})
export class PopoverModule {}
