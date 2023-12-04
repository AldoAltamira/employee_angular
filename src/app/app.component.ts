import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IColumn, IEmployee } from './interfaces/employee.interface';
import { EmployeeFormModule } from './components/employee-form.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmployeeFormModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isModalAddEmployeeOpen: boolean = false;
  isModalEditEmployeeOpen: boolean = false;
  isModalDeleteEmployeeOpen: boolean = false;
  columns: IColumn[] = [
    {
      title: "DNI",
      key: "dni",
    },
    {
      title: "Edad",
      key: "age",
    },
    {
      title: "Nombre",
      key: "name",
    },
    {
      title: "Cargo",
      key: "position",
    },
    {
      title: "Acciones",
      key: "actions",
    },
  ];

  employees: IEmployee[] = [
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "1",
    },
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "2",
    },
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "3",
    },
  ];

  dni: string = "";
  age: string = "";
  name: string = "";
  position: string = "";
  employee: string | undefined;


  ngOnInit(): void {
    // llamar listado de empleados
  }

  resetStates() {
    this.dni = "";
    this.age = "";
    this.name = "";
    this.position = "";
    this.employee = undefined;
  }

  addEmployee() {
    const newEmployee = {
      dni: this.dni,
      age: this.age,
      name: this.name,
      position: this.position,
      id: (this.employees.length + 1).toString()
    };
    this.employees.push(newEmployee);
    this.closeModal();
  }

  openModal() {
    this.resetStates();
    this.isModalAddEmployeeOpen = true;
  }

  closeModal() {
    this.isModalAddEmployeeOpen = false;
    this.isModalEditEmployeeOpen = false;
    this.isModalDeleteEmployeeOpen = false;
  }

  openEditModal(employeeId: string) {
    this.resetStates();
    const findEmployee = this.employees.find(e => e.id === employeeId);
    if (findEmployee) {
      this.employee = findEmployee.id;
      this.dni = findEmployee.dni;
      this.age = findEmployee.age;
      this.name = findEmployee.name;
      this.position = findEmployee.position;
    }
    this.isModalEditEmployeeOpen = true;
  }

  editEmployee() {
    const index = this.employees.findIndex(e => e.id === this.employee);
    if (index !== -1) {
      this.employees[index] = {
        dni: this.dni,
        age: this.age,
        name: this.name,
        position: this.position,
        id: this.employee
      };
    }
    this.isModalEditEmployeeOpen = false;
  }

  openDeleteModal(employeeId: string) {
    const findEmployee = this.employees.find(e => e.id === employeeId);
    if (findEmployee) {
      this.employee = findEmployee.id;
      this.name = findEmployee.name;
    }
    this.isModalDeleteEmployeeOpen = true;
  }

  deleteEmployee() {
    this.employees = this.employees.filter(e => e.id !== this.employee);
    this.isModalDeleteEmployeeOpen = false;
  }

  handleDNIChange(value: string): void {
    this.dni = value;
  }

  handleAgeChange(value: string): void {
    console.log('value', value);
    this.age = value.replace(/[^\d]/g, "").slice(0, 2);
  }

  handleNameChange(value: string): void {
    this.name = value.replace(/[^A-Za-z ]/g, "");
  }

  handlePositionChange(value: string): void {
    this.position = value;
  }

  handleAgeKeyDown(event: any): void {
    if (
      event.key === 'e' ||
      event.key === '.' ||
      event.key === '-' ||
      event.key === '+' ||
      event.key === 'E' ||
      event.key === ','
    ) {
      event.preventDefault();
    }
  }  
}
