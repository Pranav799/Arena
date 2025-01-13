import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent {
  @Input() badges: string[] = []; // Accept badges array as input
  @Input() heading: string = '';
  @Input() location: string = '';
  @Input() capacity : Number = 0;
  @Input() acstatus : string ='';
  @Input() imagepath : string = '';
  @Input() address: string = '';


}
