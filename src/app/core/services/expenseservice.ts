import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseMod } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
   
apiUrl = 'http://localhost:3000/expenses';

constructor(private http:HttpClient){}

getExpenses(){
  return this.http.get<ExpenseMod[]>(this.apiUrl);
}
addExpense(expense:ExpenseMod){
  return this.http.post(this.apiUrl,expense);
}
updateExpense(id:number,expense:ExpenseMod){
  return this.http.put(`${this.apiUrl}/${id}`,expense);
}
deleteExpense(id:number){
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
