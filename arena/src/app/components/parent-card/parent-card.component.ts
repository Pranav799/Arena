import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent {
  @Input() heading!: string;
  @Input() location!: string;
  @Input() capacity!: number;
  @Input() acstatus!: string;
  @Input() imagepath!: string;
  @Input() address!: string;
  @Input() module!: string;
  @Input() buttons: string[] = []; 
  @Input() selectedButtons: string[] = []; 
  @Input() selectedDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  @Output() buttonSelect = new EventEmitter<string>();

  onButtonSelect(button: string): void {
    this.buttonSelect.emit(button);  
  }

  isSelected(button: string): boolean {
    return this.selectedButtons.includes(button);
  }
  
  sucessBookingModal: boolean = false;
  bookVenueModal: boolean = false;
  eventName: string = '';
  chiefperson: string = '';
  department: string = '';
  eventKind: string = '';
  error: boolean = false;
  mementosSelected: boolean = false; 
  laptopsSelected: boolean = false; 
  saplingsSelected: boolean = false; 
  mementos: string = '';
  laptops: string = '';
  saplings: string = '';
  saplingsQuantity: number = 1;
  mementosQuantity: number = 1;
  laptopQuantity: number = 1;
  showMessage:boolean = false;

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
    // window.location.reload();
  }

  openbookVenueModal() {
    this.bookVenueModal = true;
  }

  closebookVenueModal() {
    this.bookVenueModal = false;
  }

  toggleSelection(button: string): void {
    const index = this.selectedButtons.indexOf(button);
    if (index === -1) {
      this.selectedButtons.push(button);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

  bookSlot() {
    this.error = false; 
    this.openSucessBookingModal(); 
    this.closebookVenueModal();
  }

  errorBookSlot() {
    this.error = true; 
  }

  closeErrorMessage(){
    this.error=false
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 700; 
  }

  setShowMessage(){
    this.showMessage = true;  
    setTimeout(() => {
      this.showMessage = false; 
    }, 3000); 
  }

  }

  


