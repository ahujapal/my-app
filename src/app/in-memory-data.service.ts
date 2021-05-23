import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const employees = [
      {id: 1, name:'John'},
      {id: 2, name:'Mark'},
      {id: 3, name:'Rob'},
      {id: 4, name:'Josh'},
      {id: 5, name:'Neil'},
      {id: 6, name:'Robert'},
      {id: 7, name:'Chris'},
      {id: 8, name:'Tom'},
    ];

    return {employees};
  }

  getId(employees: Employee[]):number{
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1: 11;
  }

}
