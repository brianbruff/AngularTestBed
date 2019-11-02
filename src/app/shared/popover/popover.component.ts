import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
    selector: 'gryphon-popover',
    template: `
        <mat-card @fade [style.height.%]="100">
            <ng-container cdkPortalOutlet></ng-container>
        </mat-card>
    `,
    styles: [`
        :host {
            display: block;
            position: relative;
            width: 100%;

            overflow: auto;
        }
    `],
    animations: [
        trigger('fade', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('.15s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class PopoverComponent extends BasePortalOutlet {
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
        return this.portalOutlet.attachComponentPortal(componentPortal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return this.portalOutlet.attachTemplatePortal(portal);
    }
}
