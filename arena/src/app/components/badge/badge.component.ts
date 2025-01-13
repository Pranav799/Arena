import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  // Input property to accept the badge data
  @Input() badges: string[] = [];
  @Input() badgeClass: string = '';
}
