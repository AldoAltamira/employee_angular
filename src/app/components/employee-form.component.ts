import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  template: `
    <form class="formEmployee" (submit)="onSubmit($event)">
      <input
        id="dni"
        label="DNI"
        (input)="onDNIChange($event)"
        placeholder="12345678"
        [required]="true"
        type="text"
        [value]="dni"
      >
      <input
        id="age"
        label="Edad"
        (input)="onAgeChange($event)"
        (keydown)="onAgeKeyDown($event)"
        placeholder="25"
        [required]="true"
        type="number"
        [value]="age"
      >
      <input
        id="name"
        label="Nombre"
        (input)="onNameChange($event)"
        placeholder="Juan Pérez"
        [required]="true"
        type="text"
        [value]="name"
      >
      <input
        id="position"
        label="Cargo"
        (input)="onPositionChange($event)"
        placeholder="Desarrollador"
        [required]="true"
        type="text"
        [value]="position"
      >

      <button type="submit" class="employeeAddBtn">Guardar</button>
      <button type="button" class="closeModalBtn" (click)="closeModal.emit()">Cancelar</button>
    </form>
  `,
  styles: [],
})
export class EmployeeFormComponent {
  @Input() dni: string = '';
  @Input() age: string = '';
  @Input() name: string = '';
  @Input() position: string = '';

  @Output() handleDNIChange = new EventEmitter<string>();
  @Output() handleAgeChange = new EventEmitter<string>();
  @Output() handleAgeKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() handleNameChange = new EventEmitter<string>();
  @Output() handlePositionChange = new EventEmitter<string>();

  @Output() submitForm = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onDNIChange(event: Event) {
    this.handleDNIChange.emit((event.target as HTMLInputElement).value);
  }

  onAgeChange(event: Event) {
    this.handleAgeChange.emit((event.target as HTMLInputElement).value);
  }

  onAgeKeyDown(event: KeyboardEvent) {
    this.handleAgeKeyDown.emit(event);
  }

  onNameChange(event: Event) {
    this.handleNameChange.emit((event.target as HTMLInputElement).value);
  }

  onPositionChange(event: Event) {
    this.handlePositionChange.emit((event.target as HTMLInputElement).value);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita que la página se recargue
    this.submitForm.emit();
  }
}
