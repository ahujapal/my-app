import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './employeesList';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'api/employees';

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getEmployees(): Observable<Employee[]> {
  //   const employees = of(EMPLOYEES);
  //   return employees;
  // }

  constructor(
    private http: HttpClient
  ) { }



 
getEmployee(id: number): Observable<Employee> {
  const url = `${this.employeesUrl}/${id}`;
  return this.http.get<Employee>(url).pipe(
    catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  );
}

getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.employeesUrl)
  .pipe(
    catchError(this.handleError<Employee[]>('getEmployees',[]))
  )
}

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
    catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
  const url = `${this.employeesUrl}/${id}`;

  return this.http.delete<Employee>(url, this.httpOptions).pipe(
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}
}
