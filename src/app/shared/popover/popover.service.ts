import { Injectable, InjectionToken, Injector, TemplateRef, ElementRef } from '@angular/core';
import { Overlay, ComponentType, OverlayRef, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, ConnectionPositionPair, OverlayConfig } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ComponentPortal, PortalInjector, TemplatePortal, Portal } from '@angular/cdk/portal';
import { PopoverComponent } from './popover.component';

export interface PopoverConfig<T = any> {
    backdropClass: string;
    data?: T;
    disableClose: boolean;
    panelClass: string | string[];
    arrowOffset?: number;
    arrowSize?: number;
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    height?: number;
    maxHeight?: number;
    minHeight?: number;
};

export class PopoverRef<T = any>{
    private afterClosedSubject = new Subject<T>();
    
    constructor(
        private overlayRef: OverlayRef,
        private positionStrategy: FlexibleConnectedPositionStrategy,
        public config: PopoverConfig
    ) {
        if (!config.disableClose) {
            this.overlayRef.backdropClick().subscribe(() => this.close());
        }

        this.overlayRef.keydownEvents()
            .pipe(
                filter(event => event.key === 'Escape')
            )
            .subscribe(() => {
                this.close();
            });
    }

    close(dialogResult?: T): void {
        this.afterClosedSubject.next(dialogResult);
        this.afterClosedSubject.complete();
        this.overlayRef.dispose();
    }

    afterClosed(): Observable<T> {
        return this.afterClosedSubject.asObservable();
    }

    positionChanges(): Observable<ConnectedOverlayPositionChange> {
        return this.positionStrategy.positionChanges;
    }
}

export const POPOVER_DATA = new InjectionToken('popover.data');

const defaultConfig: PopoverConfig = {
    backdropClass: '',
    disableClose: false,
    panelClass: '',
    arrowOffset: 30,
    arrowSize: 20
};

@Injectable({
    providedIn: 'root'
})
export class PopoverService {
    constructor(private overlay: Overlay, private injector: Injector) {}

    open<D = any>(
        componentOrTemplate: ComponentType<any> | TemplateRef<any>,
        target: ElementRef | HTMLElement,
        config: Partial<PopoverConfig>
    ): PopoverRef<D> {
        const popoverConfig: PopoverConfig = Object.assign({}, defaultConfig, config);

        const arrowSize = popoverConfig.arrowSize;
        const arrowOffset = popoverConfig.arrowOffset;
        const panelOffset = arrowSize / 2;

        const positions: ConnectionPositionPair[] = [
            // top center
            {
                overlayX: 'center',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'center'],
                offsetY: -1 * panelOffset
            },
            // top left
            {
                overlayX: 'start',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'left'],
                offsetX: -1 * arrowOffset,
                offsetY: -1 * panelOffset
            },
            // top right
            {
                overlayX: 'end',
                overlayY: 'bottom', 
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'right'],
                offsetX: arrowOffset,
                offsetY: -1 * panelOffset
            },
            // bottom center
            {
                overlayX: 'center',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'center'],
                offsetY: panelOffset
            },
            // bottom left
            {
                overlayX: 'start',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'left'],
                offsetX: -1 * arrowOffset,
                offsetY: panelOffset
            },
            // bottom right
            {
                overlayX: 'end',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'right'],
                offsetX: arrowOffset,
                offsetY: panelOffset
            }
        ];

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(target)
            .withPush(false)
            .withFlexibleDimensions(false)
            .withPositions(positions);

        const { backdropClass, panelClass, width, maxWidth, minWidth, height, maxHeight, minHeight } = config;

        const finalConfig: OverlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass,
            panelClass,
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width, maxWidth, minWidth,
            height, maxHeight, minHeight
        });

        const overlayRef = this.overlay.create(finalConfig);

        const popoverRef = new PopoverRef(overlayRef, positionStrategy, popoverConfig);
        const componentPortal = new ComponentPortal(
            PopoverComponent,
            null,
            new PortalInjector(
                this.injector,
                new WeakMap<any, any>([
                    [PopoverRef, popoverRef]
                ])
            )
        );

        const popover = overlayRef.attach(componentPortal).instance;

        if (componentOrTemplate instanceof TemplateRef) {
            const innerTemplatePortal = new TemplatePortal(
                componentOrTemplate,
                null,
                {
                    $implicit: config.data,
                    popover: popoverRef
                }
            );
            popover.attachTemplatePortal(innerTemplatePortal);
        } else {
            const innerComponentPortal = new ComponentPortal(
                componentOrTemplate,
                null,
                new PortalInjector(
                    this.injector,
                    new WeakMap<any, any>([
                        [POPOVER_DATA, config.data],
                        [PopoverRef, popoverRef]
                    ])
                )
            );
            popover.attachComponentPortal(innerComponentPortal);
        }

        return popoverRef;
    }
}