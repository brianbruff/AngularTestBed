import {Component, ElementRef, OnInit} from '@angular/core';
import {PopoverService} from '../../shared/popover/popover.service';
import {DashboardPopoverComponent} from './dashboard-popover/dashboard-popover.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private popoverService: PopoverService) { }

  ngOnInit() {
  }

  showPopover(target: EventTarget) {
    const element = target as HTMLElement;
    this.showPopover2(target, element);
  }

  showPopover2(target: EventTarget, element: ElementRef | HTMLElement) {
    this.popoverService.open(DashboardPopoverComponent, element, { });
  }
}
