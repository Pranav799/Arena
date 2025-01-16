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
  
  sucessBookingModal: boolean = false;
  bookVenueModal: boolean = false;

  mementosSelected: boolean = false; 
  laptopsSelected: boolean = false; 
  saplingsSelected: boolean = false; 

  mementos: string = '';
  laptops: string = '';
  saplings: string = '';

  saplingsQuantity: number = 1;
  mementosQuantity: number = 1;
  laptopQuantity: number = 1;


  onMementosChange(): void {
    this.mementos = this.mementosSelected ? 'mementos' : '';
  }

  onLaptopsChange(): void {
    this.laptops = this.laptopsSelected ? 'laptops' : '';
  }

  onSaplingsChange(): void {
    this.saplings = this.saplingsSelected ? 'saplings' : '';
  }

  openSucessBookingModal() {
    this.sucessBookingModal = true;
  }

  closeSucessBookingModal() {
    this.sucessBookingModal = false;
  }

  openbookVenueModal() {
    this.bookVenueModal = true;
  }

  closebookVenueModal() {
    this.bookVenueModal = false;
  }

}
