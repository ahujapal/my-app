import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EMPLOYEES } from '../employeesList';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  /*
  employee: Employee = {
    id: 1,
    name: 'John Doe'
  }
  */
  //employees = EMPLOYEES;

  employees: Employee[] = [];

  // getEmployees(): void{
  //   this.employees = this.employeeService.getEmployees();
  // }

  // selectedEmployee?: Employee;
  // onSelect(employee: Employee): void{
  //   this.selectedEmployee = employee;
  // }


  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees():void{
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeeService.addEmployee({ name } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }

}
