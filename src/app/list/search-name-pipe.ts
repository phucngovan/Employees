import {Pipe, PipeTransform} from "@angular/core";
import {Employee} from "../model/Employee";
@Pipe({
  name: 'searByName'
})
export class SearchNamePipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!employees || !searchText) {
      return employees;
    } return employees.filter(employee =>
    employee.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
